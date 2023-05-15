import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Constants from "@/utils/Constants";

const getProducts = async (locale, session, companyId = "") => {
  const path =
    session?.user?.role === Constants.ROLES.ADMIN
      ? `/api/products?companyId=${companyId}`
      : "/api/products";
  const res = await fetch(path, {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useProducts = (
  locale,
  session,
  companyId,
  isProductsPage = true
) => {
  const { isError, isLoading, data, refetch, isRefetching } = useQuery(
    ["products"],
    () => getProducts(locale, session, companyId),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      enabled:
        session?.user?.role === Constants.ROLES.USER ||
        (session?.user?.role === Constants.ROLES.ADMIN && !!companyId) ||
        isProductsPage,
    }
  );
  const products = data?.data;
  return {
    isProductLoading: isLoading,
    isProductError: isError,
    products,
    productsRefetch: refetch,
    isRefetchingProducts: isRefetching,
  };
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
  let reformatted = {
    name: data.name.trim(),
    description: data.description.trim(),
    productType: data.productType.trim(),
    purchasePrice:
      typeof data.purchasePrice === "string"
        ? Number(data.purchasePrice.trim())
        : data.purchasePrice,
    salePrice:
      typeof data.salePrice === "string"
        ? Number(data.salePrice.trim())
        : data.salePrice,
  };
  if (data?.companies) {
    reformatted.companyId = data.companies.key.trim();
  }
  let ep = productId ? `/api/products/edit/${productId}` : "/api/products/add";
  let method = productId ? "PUT" : "POST";
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
