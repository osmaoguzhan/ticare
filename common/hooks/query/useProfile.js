import { useQuery } from "@tanstack/react-query";

const getProfile = async (locale, userid) => {
  const res = await fetch("/api/profile", {
    headers: {
      userid,
      locale,
    },
  });
  return res.json();
};

export const useProfile = (locale, userid) => {
  return useQuery(["profile"], getProfile(locale, userid), {
    refetchOnMount: false,
  });
};
