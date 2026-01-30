import type { AnyAction, Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { MakeStore } from 'next-redux-wrapper';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

export { HYDRATE };

import type { RootState } from './reducers';
import rootReducer from './reducers';

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };

    return nextState;
  }
  return rootReducer(state, action);
};

export const getStore = () => {
  return configureStore({
    reducer,
  });
};

setupListeners(getStore().dispatch);

/**
 * @param initialState The store's initial state (on the client side, the state of the server-side store is passed here)
 */
const makeStore: MakeStore<Store<RootState>> = () => {
  return getStore();
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default makeStore;
