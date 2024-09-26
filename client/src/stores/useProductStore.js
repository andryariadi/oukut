import { create } from "zustand";
import axios from "../libs/axios";
import toast from "react-hot-toast";
import { toastStyle } from "../helper/toastStyle";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (product) => {
    set({ loading: true });

    try {
      const res = await axios.post("/products", product);

      console.log(res, "<----diproductStore");

      set((prevState) => ({
        products: [...prevState.products, res.data.product],
        loading: false,
      }));

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

  fetchAllProducts: async () => {
    set({ loading: true });

    try {
      const res = await axios.get("/products");
      console.log(res, "<----difetchProducts");

      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
      toast.error(error.response.data.error || "Something went wrong!", {
        style: toastStyle,
      });
    }
  },
}));
