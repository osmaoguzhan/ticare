import { useQuery } from "@tanstack/react-query";

const getCurrency = async (locale) => {
  const res = await fetch("/api/config/currency", {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useCurrency = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["currency"],
    () => getCurrency(locale),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const currencies = data?.data;
  return { isCurrencyLoading: isLoading, isCurrencyError: isError, currencies };
};
