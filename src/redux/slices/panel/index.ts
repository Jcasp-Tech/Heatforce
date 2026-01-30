import { createSlice } from '@reduxjs/toolkit';

import { getActivePanelAPI } from '@/redux/services/general.api';
import { deepClone } from '@/utils/helpers';

export interface PanelState {
  data?: any;
  isLoading?: boolean;
  error?: string | null;
}

const loginInitialState: PanelState = {
  data: {},
  error: null,
  isLoading: false,
};

export const panelSlice = createSlice({
  name: 'panel',
  initialState: deepClone(loginInitialState),
  reducers: {
    panelStarted: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    panelSuccess: (state, action) => {
      return {
        ...state,
        ...{
          data: action.payload,
          error: null,
          isLoading: false,
        },
      };
    },
    panelFail: (state, action) => {
      return {
        ...state,
        ...{ error: action.payload, isLoading: false },
      };
    },
    panelReset: () => {
      return deepClone(loginInitialState);
    },
  },
});

export const { panelSuccess, panelStarted, panelFail, panelReset } =
  panelSlice.actions;

export const doPanel = () => async (dispatch: any) => {
  dispatch(panelStarted());
  try {
    const panelRes: any = await getActivePanelAPI();

    if (panelRes) {
      dispatch(panelSuccess(panelRes));
    }
  } catch (e: any) {
    dispatch(panelFail(e.message));
  }
};
