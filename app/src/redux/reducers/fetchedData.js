import { FETCHING, FETCH_SUCCESS, FETCH_ERROR } from '../actionTypes';

const initialState = {
  fetchStatus: {
    isFetching: false
  },
  data: {
    notices: [],
    newsevents: [],
    happenings: [],
    topinfo: []
  }
};

export default (state = initialState, { type, payload }) => {
  delete state.fetchStatus;
  switch (type) {
    case FETCHING:
      return {
        ...state,
        fetchStatus: {
          isFetching: true
        }
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        ...payload,
        fetchStatus: {
          isFetching: false
        }
      };
    case FETCH_ERROR:
      return {
        ...state,
        fetchStatus: {
          isFetching: false,
          fetchError: payload.error
        }
      };
    default:
      return {
        ...initialState,
        ...state
      };
  }
};
