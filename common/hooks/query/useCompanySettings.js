import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Constants from "@/utils/Constants";

const submitCompany = async ({ locale, data, companyId }) => {
  let split = data.currency.label.split(" - ");
  data = {
    name: data.name.trim(),
    description: data.description.trim(),
    addressLine1: data.addressLine1.trim(),
    addressLine2: data.addressLine2.trim(),
    phoneNumber: data.phoneNumber.trim(),
    email: data.email.trim(),
    website: data.website.trim(),
    currency: {
      short: split[0],
      symbol: split[1],
    },
  };
  if (companyId) {
    data.id = companyId;
  }
  const response = await (
    await fetch("/api/settings", {
      method: companyId ? "PUT" : "POST",
      headers: {
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

export const useSubmitCompany = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(submitCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("settings");
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};

const getComapny = async (locale) => {
  const res = await fetch("/api/settings", {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useCompany = ({ locale, role = "USER", enabled = true }) => {
  const { isError, isLoading, data } = useQuery(
    ["settings"],
    () => getComapny(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: enabled && role === Constants.ROLES.USER,
    }
  );
  const company = data?.data;
  return {
    isCompanyLoading: isLoading,
    isCompanyError: isError,
    company,
  };
};
