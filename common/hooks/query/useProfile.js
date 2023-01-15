import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProfile = async (userid, locale) => {
  const res = await fetch("/api/profile", {
    headers: {
      userid,
      locale,
    },
  });
  return res.json();
};
const updateProfile = async ({ userid, locale, data }) => {
  const response = await (
    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        userid,
        locale,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  ).json();
  if (!response.success) {
    throw new Error(response.message);
  }
  return response;
};
export const useProfile = (userid, locale) => {
  const { isLoading, isError, data } = useQuery(
    ["profile"],
    () => getProfile(userid, locale),
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const profile = data?.data;
  return { isProfileLoading: isLoading, isProfileError: isError, profile };
};

export const useUpdateProfile = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("profile");
      onSuccess(data.lang, data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
