import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Constants from "@/utils/Constants";
const getCustomers = async (locale, session, companyId = "") => {
  const path =
    session?.user?.role === Constants.ROLES.ADMIN
      ? `/api/customers?companyId=${companyId}`
      : "/api/customers";
  const res = await fetch(path, {
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

export const useCustomer = (
  locale,
  session,
  companyId,
  isCustomersPage = true
) => {
  const { isError, isLoading, data, refetch, isRefetching } = useQuery(
    ["customers"],
    () => getCustomers(locale, session, companyId),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      enabled:
        session?.user?.role === Constants.ROLES.USER ||
        (session?.user?.role === Constants.ROLES.ADMIN && !!companyId) ||
        isCustomersPage,
    }
  );
  const customers = data?.data;
  return {
    isCustomerLoading: isLoading,
    isCustomerError: isError,
    customers,
    customersRefetch: refetch,
    isRefetchingCustomers: isRefetching,
  };
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
  let reformatted = {
    name: data.name.trim(),
    surname: data.surname.trim(),
    phoneNumber: data.phoneNumber.trim(),
    email: data.email.trim(),
    addressLine1: data.addressLine1.trim(),
    addressLine2: data.addressLine2.trim(),
  };
  if (data?.companies) {
    reformatted.companyId = data.companies.key.trim();
  }
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
      body: JSON.stringify(reformatted),
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

const deleteCustomer = async ({ locale, ids }) => {
  const response = await (
    await fetch(`/api/customers/delete`, {
      method: "POST",
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
  ).json();
  if (!response.success) {
    throw new Error(response.message);
  }
  return response;
};

export const useDeleteCustomer = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(deleteCustomer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("customers");
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
