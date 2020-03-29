import { FETCHACTION } from './actionTypes';

export const create = data => ({
  type: FETCHACTION,
  payload: {
    data
  }
});