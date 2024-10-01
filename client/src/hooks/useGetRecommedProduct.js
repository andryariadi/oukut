import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { toastStyle } from "../helper/toastStyle";
import axios from "../libs/axios";

const useGetRecommedProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommedations, setRecommedations] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/products/recommendations");
        console.log(res, "<---digetRecommedantionsHook");

        setRecommedations(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          style: toastStyle,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getRecommendations();
  }, []);

  return { isLoading, recommedations, setIsLoading, setRecommedations };
};

export default useGetRecommedProduct;
