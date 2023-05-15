import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Constants from "@/utils/Constants";

const getSuppliers = async (locale, session, companyId) => {
  const path =
    session?.user?.role === Constants.ROLES.ADMIN
      ? `/api/suppliers?companyId=${companyId}`
      : "/api/suppliers";
  const res = await fetch(path, {
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

export const useSupplier = (
  locale,
  session,
  companyId,
  isSuppliersPage = true
) => {
  const { isError, isLoading, data, refetch, isRefetching } = useQuery(
    ["suppliers"],
    () => getSuppliers(locale, session, companyId),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      enabled:
        session?.user?.role === Constants.ROLES.USER ||
        (session?.user?.role === Constants.ROLES.ADMIN && !!companyId) ||
        isSuppliersPage,
    }
  );
  const suppliers = data?.data;
  return {
    isSupplierLoading: isLoading,
    isSupplierError: isError,
    suppliers,
    supplierRefectch: refetch,
    isRefetchingSupplier: isRefetching,
  };
};

const submitSupplier = async ({ locale, data, supplierId }) => {
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
      body: JSON.stringify(reformatted),
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
