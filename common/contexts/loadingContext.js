import { createContext, useState } from "react";

export const LoadingContext = createContext({
  loading: true,
  setLoading: null,
});

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
