import { toast } from "react-toastify";
import ApiHelper from "../../utils/apiHelper"

class AuthApiServices {
  static getInstance() {
    return new AuthApiServices();
  }

  userSignup = async (signupData) => {
    try {
      const response = await ApiHelper.post("/auth/signup", signupData);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  userLogin = async (loginData) => {
    try {
      const response = await ApiHelper.post("/auth/login", loginData);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  userInfo = async () => {
    try {
      const response = await ApiHelper.get("/auth/get-info");
      return response?.data;
    } catch (error) {
      throw error;
    }
  };
}

export const authApiServices = AuthApiServices.getInstance();
