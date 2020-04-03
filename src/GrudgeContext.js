import { GRUDGE_ADD, GRUDGE_FORGIVE, REDO, UNDO } from './constants';
import initialState from './initialState';
import { reducer } from './reducer';
import id from 'uuid/v4';
import React, { useReducer, createContext, useCallback } from 'react';

export const GrudgeContext = createContext();

const useTimeTravelReducer = (reducer, initialState) => {
  const timeTravelState = {
    past: [],
    present: initialState,
    future: []
  };

  const timeTravelReducer = (state, action) => {
    const newPresent = reducer(state.present, action);

    if (action.type === UNDO) {
      const [newPresent, ...newPast] = state.past;
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      };
    }

    if (action.type === REDO) {
      const [newPresent, ...newFuture] = state.future;
      return {
        past: [state.present, ...state.past],
        present: newPresent,
        future: newFuture
      };
    }

    return {
      past: [state.present, ...state.past],
      present: newPresent,
      future: []
    };
  };

  return useReducer(timeTravelReducer, timeTravelState);
};

export const GrudgeProvider = ({ children }) => {
  const [state, dispatch] = useTimeTravelReducer(reducer, initialState);
  const grudges = state.present;

  const isPast = !!state.past.length;
  const isFuture = !!state.future.length;

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          id: id(),
          reason,
          person
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    id => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: { id }
      });
    },
    [dispatch]
  );

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, [dispatch]);

  const value = {
    addGrudge,
    isPast,
    isFuture,
    toggleForgiveness,
    grudges,
    undo,
    redo
  };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
