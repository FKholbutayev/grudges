import id from 'uuid/v4';
import { GRUDGE_ADD, GRUDGE_FORGIVE } from './constants';

export const reducer = (state = [], action) => {
  console.log('reducer catching', action);
  if (action.type === GRUDGE_ADD) {
    return [
      {
        id: id(),
        ...action.payload
      },
      ...state
    ];
  }

  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      if (grudge.id === action.payload.id) {
        return { ...grudge, forgiven: !grudge.forgiven };
      }
      return grudge;
    });
  }

  return state;
};
