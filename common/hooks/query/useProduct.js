import { useQuery } from "@tanstack/react-query";

const getProducts = async (locale) => {
  let products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 100,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      quantity: 100,
    },
  ];
  return products;
};

export const useProducts = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["products"],
    () => getProducts(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: true,
    }
  );
  return { isProductLoading: isLoading, isProductError: isError, data };
};
