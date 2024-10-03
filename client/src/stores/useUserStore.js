import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../libs/axios";
import { toastStyle } from "../helper/toastStyle";
import { get } from "mongoose";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ username, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match!", {
        style: toastStyle,
      });
    }

    try {
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });

      set({ user: res.data.user, loading: false });

      toast.success(res.data.message, {
        style: toastStyle,
      });
    } catch (error) {
      set({ loading: false });
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      set({ user: res.data.user, loading: false });

      toast.success(res.data.message, {
        style: toastStyle,
      });
    } catch (error) {
      set({ loading: false });
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },

  logout: async () => {
    try {
      const res = await axios.post("/auth/logout");

      set({ user: null });

      toast.success(res.data.message, {
        style: toastStyle,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ user: null, checkingAuth: false });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const res = await axios.post("/auth/refresh-token");
      console.log(res, "<---direfreshTokenStore");

      set({ checkingAuth: false });

      return res.data;
    } catch (error) {
      console.log(error);
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error, "<---diaxiosInterceptor");

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log(refreshPromise, "<---direfreshTokenStore1");

        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        console.log(refreshPromise, "<---direfreshTokenStore2");

        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (error) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
