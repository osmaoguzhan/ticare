import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const getSales = async (locale) => {
  const res = await fetch("/api/sales", {
    headers: {
      locale,
    },
  });
  return res.json();
};

const getSaleById = async ({ locale, saleId }) => {
  const res = await fetch(`/api/sales/${saleId}`, {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useSaleById = ({ locale, saleId }) => {
  const { isError, isLoading, data } = useQuery(
    ["saleById"],
    () => getSaleById({ locale, saleId }),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const sale = data?.data;
  return { isSaleLoading: isLoading, isSaleError: isError, sale };
};

export const useSales = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["sales"],
    () => getSales(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const sales = data?.data;
  return { isSaleLoading: isLoading, isSaleError: isError, sales };
};

const submitSale = async ({ locale, data, saleId = undefined }) => {
  let reformatted = {
    customerId: data.customer.key.trim(),
    products: data.products,
    description: data.description.trim(),
    title: data.title.trim(),
    status: data.status,
  };
  if (data?.companies) {
    reformatted.companyId = data.companies.key.trim();
  }
  let ep = saleId ? `/api/sales/edit/${saleId}` : "/api/sales/add";
  let method = saleId ? "PUT" : "POST";
  const response = await (
    await fetch(ep, {
      method,
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reformatted),
    })
  ).json();
  if (!response.success) {
    throw new Error(response.message);
  }
  return response;
};

export const useSubmitSale = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(submitSale, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("sales");
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
