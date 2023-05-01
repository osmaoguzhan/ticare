import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const getPurchases = async (locale) => {
  const res = await fetch("/api/purchases", {
    headers: {
      locale,
    },
  });
  return res.json();
};

const getPurchaseById = async ({ locale, purchaseId }) => {
  const res = await fetch(`/api/purchases/${purchaseId}`, {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const usePurchaseById = ({ locale, purchaseId }) => {
  const { isError, isLoading, data } = useQuery(
    ["purchaseById"],
    () => getPurchaseById({ locale, purchaseId }),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const purchase = data?.data;
  return { isPurchaseLoading: isLoading, isPurchaseError: isError, purchase };
};

export const usePurchases = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["purchases"],
    () => getPurchases(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const purchases = data?.data;
  return { isPurchaseLoading: isLoading, isPurchaseError: isError, purchases };
};

const submitPurchase = async ({ locale, data, purchaseId = undefined }) => {
  let ep = purchaseId
    ? `/api/purchases/edit/${purchaseId}`
    : "/api/purchases/add";
  let method = purchaseId ? "PUT" : "POST";
  const response = await (
    await fetch(ep, {
      method,
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

export const useSubmitPurchase = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(submitPurchase, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("purchases");
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
