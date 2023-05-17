import { useMutation } from "@tanstack/react-query";

const changePassword = async ({ userid, locale, password, token }) => {
  const response = await (
    await fetch(`/api/auth/reset-password`, {
      method: "POST",
      headers: {
        userid,
        locale,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    })
  ).json();

  if (!response.success) {
    return Promise.reject(response.message);
  }
  return response;
};

export const useForgotPassword = ({ onSuccess, onError }) => {
  return useMutation(changePassword, {
    onSuccess: (data) => onSuccess(data.message),
    onError: (error) => onError(error),
  });
};
