import { useQuery } from "@tanstack/react-query";

const getAnalyticsData = async (locale) => {
  const res = await fetch("/api/analytics", {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useAnalytics = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["analytics"],
    () => getAnalyticsData(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const analytics = data?.data;
  return { isAnalyticLoading: isLoading, isAnalyticError: isError, analytics };
};
