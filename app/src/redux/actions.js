import { FETCHING, FETCH_SUCCESS, FETCH_ERROR } from './actionTypes';

const apiEndpoint =
  process.env.APIENDPOINT || 'https://unofficialapp.shvm.tech/result.json';

export const fetchData = (url = apiEndpoint) => async dispatch => {
  try {
    dispatch({
      type: FETCHING
    });
    const response = await fetch('https://unofficialapp.shvm.tech/result.json');
    if (!response.ok) throw Error(`fetch error ${response.status}`);
    const data = await response.json();
    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        data: data
      }
    });
  } catch (e) {
    dispatch({
      type: FETCH_ERROR,
      payload: {
        fetchError: e
      }
    });
  }
};
