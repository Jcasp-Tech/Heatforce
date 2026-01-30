import { combineReducers } from 'redux';

import { loginSlice, loginUserSlice } from './slices/auth';
import { panelSlice } from './slices/panel';
import resultPageLoader  from './slices/resultPageLoader';
import Pointer from './slices/pointers/pointerReducer';
import sortedComboData from './slices/sortedComboData/sortedComboDataSlice'
const rootReducer = combineReducers({
  login: loginSlice.reducer,
  loginUser: loginUserSlice.reducer,
  panel: panelSlice.reducer,
  resultPageLoader,
  Pointer,
  sortedComboData
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
