import perf from '@react-native-firebase/perf';
import crashlytics from '@react-native-firebase/crashlytics';
import { FETCHING, FETCH_ERROR, FETCH_SUCCESS } from './actionTypes';

const apiURL = 'https://unofficialapp.shvm.tech/result.json';
export const fetchData = () => async dispatch => {
  crashlytics().log('fetchData() called');
  try {
    dispatch({
      type: FETCHING
    });

    const metric = await perf().newHttpMetric(apiURL, 'GET');
    await metric.start();

    const response = await fetch(apiURL);

    metric.setHttpResponseCode(response.status);
    metric.setResponseContentType(response.headers.get('Content-Type'));
    metric.setResponsePayloadSize(response.headers.get('Content-Length'));
    await metric.stop();

    if (!response.ok) throw Error(`fetch error ${response.status}`);
    const data = await response.json();

    dispatch({
      type: FETCH_SUCCESS,
      payload: {
        data: data
      }
    });
  } catch (e) {
    crashlytics().recordError(e);
    console.log('fetchData Action error', e);
    dispatch({
      type: FETCH_ERROR,
      payload: {
        fetchError: e
      }
    });
  }
};
