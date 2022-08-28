import { RES_STATUS } from "shared/constant/response.constant";


export const setPending = (state: any) => {
  state.status = RES_STATUS.LOADING;
  state.error = "";
};

export const setRejected = (state: any, action: any) => {
  state.status = RES_STATUS.FAILED;
  state.error = action?.payload?.error || action?.error?.message;
};

export const setSucceed = (state: any) => {
  state.status = RES_STATUS.SUCCEEDED;
  state.error = "";
};

export const setRejectValue = (rejectWithValue: any, error: any) =>
  rejectWithValue({
    error: error.response.data.message || error.message,
  });