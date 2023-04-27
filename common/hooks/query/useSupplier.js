import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const getSuppliers = async (locale) => {
  const res = await fetch("/api/suppliers", {
    headers: {
      locale,
    },
  });
  return res.json();
};

const getSupplier = async ({ locale, supplierId }) => {
  const res = await fetch(`/api/suppliers/${supplierId}`, {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useSupplierById = ({ locale, supplierId }) => {
  const { isError, isLoading, data, isFetching } = useQuery(
    ["supplierById"],
    () => getSupplier({ locale, supplierId }),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const supplier = data?.data;
  return {
    isSupplierLoading: isLoading,
    isSupplierError: isError,
    supplier,
    isFetching,
  };
};

export const useSupplier = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["suppliers"],
    () => getSuppliers(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );
  const suppliers = data?.data;
  return { isSupplierLoading: isLoading, isSupplierError: isError, suppliers };
};

const submitSupplier = async ({ locale, data, supplierId }) => {
  data = {
    name: data.name.trim(),
    surname: data.surname.trim(),
    phoneNumber: data.phoneNumber.trim(),
    email: data.email.trim(),
    addressLine1: data.addressLine1.trim(),
    addressLine2: data.addressLine2.trim(),
  };
  let ep = supplierId
    ? `/api/suppliers/edit/${supplierId}`
    : "/api/suppliers/add";
  let method = supplierId ? "PUT" : "POST";
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

export const useSubmitSupplier = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation(submitSupplier, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("suppliers");
      onSuccess(data.message);
    },
    onError: (error) => {
      onError(error.message);
    },
  });
};
