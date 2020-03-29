import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers';
import { store } from './store';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const persistor = persistStore(store);
