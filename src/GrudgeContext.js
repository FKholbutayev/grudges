import { GRUDGE_ADD, GRUDGE_FORGIVE } from './constants';
import initialState from './initialState';
import { reducer } from './reducer';
import id from 'uuid/v4';
import React, { useReducer, createContext, useCallback } from 'react';

export const GrudgeContext = createContext();

export const GrudgeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const grudges = state;

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

  const value = { addGrudge, toggleForgiveness, grudges };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};
