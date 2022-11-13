import { LoadingContext } from "@/contexts/loadingContext";
import { useContext } from "react";

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("Missing provider");
  }
  return context;
};

export default useLoading;
