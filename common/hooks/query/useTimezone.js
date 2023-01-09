import { useQuery } from "@tanstack/react-query";

const getTimezone = async (locale) => {
  const res = await fetch("/api/config/timezone", {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useTimezone = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["timezone"],
    () => getTimezone(locale),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const timezones = data?.data;
  return { isTimezoneLoading: isLoading, isTimezoneError: isError, timezones };
};
