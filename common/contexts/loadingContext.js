import { createContext, useState } from "react";
import Loading from "@/components/general/Loading";

export const LoadingContext = createContext({
  isLoading: true,
  setLoading: null,
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const value = { isLoading, setLoading };
  return (
    <LoadingContext.Provider value={value}>
      {isLoading ? <Loading /> : children}
    </LoadingContext.Provider>
  );
};
