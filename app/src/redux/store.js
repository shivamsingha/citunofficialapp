import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =
  process.env.NODE_ENV === 'development'
    ? createStore(
        persistedReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : createStore(persistedReducer);

export const persistor = persistStore(store);
