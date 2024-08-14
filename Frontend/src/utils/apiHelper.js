import axios from "axios";
import { jwtDecode } from "jwt-decode";

class ApiHelper {
  static instance;
  client;

  constructor() {
    if (!ApiHelper.instance) {
      this.client = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.client.interceptors.request.use(
        (config) => {
          const accessToken = localStorage.getItem("accessToken");
          if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      this.client.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await this.refreshAccessToken();

            if (newAccessToken) {
              localStorage.setItem("accessToken", newAccessToken);
              this.client.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return this.client(originalRequest);
            }
          }
          return Promise.reject(error);
        }
      );

      ApiHelper.instance = this;
    }

    return ApiHelper.instance;
  }

  static getInstance() {
    if (!ApiHelper.instance) {
      ApiHelper.instance = new ApiHelper();
    }
    return ApiHelper.instance;
  }

  async refreshAccessToken() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token available");
      }
      const decodedToken = jwtDecode(accessToken);
      const userEmail = decodedToken.emailId;

      const refreshToken = await this.getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await this.client.post(
        "http://localhost:3001/auth/refresh",
        {
          refreshToken: refreshToken,
          emailId: userEmail,
        }
      );

      return response.data.data.accessToken;
    } catch (error) {
      throw new Error("Failed to refresh access token");
    }
  }

  getRefreshToken() {
    const name = "refreshToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  get(url, params = {}) {
    return this.client.get(url, { params });
  }

  post(url, data) {
    return this.client.post(url, data);
  }

  put(url, data) {
    return this.client.put(url, data);
  }

  delete(url, data) {
    return this.client.delete(url, { data });
  }
}

const instance = ApiHelper.getInstance();
Object.freeze(instance);

export default instance;
