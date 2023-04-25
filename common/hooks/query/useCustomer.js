import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const getCustomers = async (locale) => {
  const res = await fetch("/api/customers", {
    headers: {
      locale,
    },
  });
  return res.json();
};

const getCustomer = async ({ locale, customerId }) => {
  const res = await fetch(`/api/customers/${customerId}`, {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useCustomer = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["customers"],
    () => getCustomers(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const customers = data?.data;
  return { isCustomerLoading: isLoading, isCustomerError: isError, customers };
};

export const useCustomerById = ({ locale, customerId }) => {
  const { isError, isLoading, data, isFetching } = useQuery(
    ["customerById"],
    () => getCustomer({ locale, customerId }),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const customer = data?.data;
  return {
    isCustomerLoading: isLoading,
    isCustomerError: isError,
    customer,
    isFetching,
  };
};

const submitCustomer = async ({ locale, data, customerId }) => {
  data = {
    name: data.name.trim(),
    surname: data.surname.trim(),
    phoneNumber: data.phoneNumber.trim(),
    email: data.email.trim(),
    addressLine1: data.addressLine1.trim(),
    addressLine2: data.addressLine2.trim(),
  };
  let ep = customerId
    ? `/api/customers/edit/${customerId}`
    : "/api/customers/add";
  let method = customerId ? "PUT" : "POST";
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

export const useSubmitCustomer = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(submitCustomer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("customers");
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
