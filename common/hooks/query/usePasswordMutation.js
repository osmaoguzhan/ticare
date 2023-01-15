import { useMutation } from "@tanstack/react-query";

const updatePassword = async ({ userid, locale, data }) => {
  const response = await (
    await fetch("/api/profile/change-password", {
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

export const usePasswordMutation = ({ onSuccess, onError }) => {
  return useMutation(updatePassword, {
    onSuccess: (data) => {
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
