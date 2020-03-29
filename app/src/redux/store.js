import { createStore } from 'redux';
import { persistedReducer } from './persistStore';

export default (process.env.NODE_ENV === 'development'
  ? createStore(
      persistedReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : createStore(persistedReducer));
