import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../libs/axios";
import { toastStyle } from "../helper/toastStyle";
// import axios from "axios";

// axios.defaults.withCredentials = true;

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
}));
