import { createSlice } from '@reduxjs/toolkit';


export interface PanelState {
  data?: any;
  isLoading?: boolean;
  error?: string | null;
}

const loginInitialState: Boolean =true

export const resultPageLoader = createSlice({
  name: 'ResultPageLoader',
  initialState: loginInitialState,
  reducers: {
   showLoader: () => {
     return  true
   },

    hideLoader: () => {
      return  false
    },

  },
});

export const { showLoader, hideLoader } =
  resultPageLoader.actions;

export default resultPageLoader.reducer;
