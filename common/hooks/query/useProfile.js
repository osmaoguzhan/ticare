import { useQuery } from "@tanstack/react-query";

const getProfile = async (userid, locale) => {
  const res = await fetch("/api/profile", {
    headers: {
      userid,
      locale,
    },
  });
  return res.json();
};

export const useProfile = (userid, locale) => {
  const { isLoading, isError, data } = useQuery(
    ["profile"],
    () => getProfile(userid, locale),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const profile = data?.data;
  return { isProfileLoading: isLoading, isProfileError: isError, profile };
};
