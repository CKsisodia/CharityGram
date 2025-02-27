import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoAction, userLoginAction } from "../actions/asyncAuthAction";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutUser(state) {
      state.userData = null;
      localStorage.clear();
      document.cookie = `refreshToken=; Path=/`;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      const response = action.payload;
      localStorage.setItem("accessToken", response?.data?.accessToken);
      const isSecure = window.location.protocol === "https:";
      const secureFlag = isSecure ? "; Secure" : "";
      document.cookie = `refreshToken=${response.data.refreshToken}; Path=/${secureFlag}`;
    });
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      const response = action.payload;
      state.userData = response;
    });
  },
});

export const { logoutUser } = userSlice.actions;

export const selectUserData = (state) => state.user.userData;

export default userSlice.reducer;
