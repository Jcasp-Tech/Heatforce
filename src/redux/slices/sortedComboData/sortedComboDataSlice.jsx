import { createSlice } from '@reduxjs/toolkit';



const loginInitialState=[{}]

export const resultPageLoader = createSlice({
  name: 'sortedComboData',
  initialState: loginInitialState,
  reducers: {
   updateSortedData: (state,action) => {
    return action.payload

   },
  },
});

export const { updateSortedData, } =
  resultPageLoader.actions;

export default resultPageLoader.reducer;
