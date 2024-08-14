import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApiServices } from "../services/authService";

export const userSignupAction = createAsyncThunk(
  "userSignupAction",
  async (signupData) => {
    const response = await authApiServices.userSignup(signupData);
    return response;
  }
);

export const userLoginAction = createAsyncThunk(
  "userLoginAction",
  async (loginData) => {
    const response = await authApiServices.userLogin(loginData);
    return response;
  }
);

export const getUserInfoAction = createAsyncThunk(
  "userInfoAction",
  async () => {
    const response = await authApiServices.userInfo();
    return response;
  }
);
