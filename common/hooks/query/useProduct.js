import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const getProducts = async (locale) => {
  const res = await fetch("/api/products", {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useProducts = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["products"],
    () => getProducts(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const products = data?.data;
  return { isProductLoading: isLoading, isProductError: isError, products };
};

const getProduct = async ({ locale, productId }) => {
  const res = await fetch(`/api/products/${productId}`, {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useProductById = ({ locale, productId }) => {
  const { isError, isLoading, data, isFetching } = useQuery(
    ["productById"],
    () => getProduct({ locale, productId }),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const product = data?.data;
  return {
    isProductLoading: isLoading,
    isProductError: isError,
    product,
    isFetching,
  };
};

const submitProduct = async ({ locale, data, productId }) => {
  data = {
    name: data.name.trim(),
    description: data.description.trim(),
    productType: data.productType.trim(),
    purchasePrice: Number(data.purchasePrice.trim()),
    salePrice: Number(data.salePrice.trim()),
  };
  let ep = productId ? `/api/products/edit/${productId}` : "/api/products/add";
  let method = productId ? "PUT" : "POST";
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

export const useSubmitProduct = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(submitProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("products");
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
