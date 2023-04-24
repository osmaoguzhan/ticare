import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const getSales = async (locale) => {
  const res = await fetch("/api/sales", {
    headers: {
      locale,
    },
  });
  return res.json();
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

// const submitSupplier = async ({ locale, data, supplierId }) => {
//   data = {
//     name: data.name.trim(),
//     surname: data.surname.trim(),
//     phoneNumber: data.phoneNumber.trim(),
//     email: data.email.trim(),
//     addressLine1: data.addressLine1.trim(),
//     addressLine2: data.addressLine2.trim(),
//   };
//   let ep = supplierId
//     ? `/api/suppliers/edit/${supplierId}`
//     : "/api/suppliers/add";
//   let method = supplierId ? "PUT" : "POST";
//   const response = await (
//     await fetch(ep, {
//       method,
//       headers: {
//         locale,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//   ).json();
//   if (!response.success) {
//     throw new Error(response.message);
//   }
//   return response;
// };

// export const useSubmitSupplier = ({ onSuccess, onError }) => {
//   const queryClient = useQueryClient();
//   return useMutation(submitSupplier, {
//     onSuccess: (data) => {
//       queryClient.invalidateQueries("suppliers");
//       onSuccess(data.message);
//     },
//     onError: (error) => {
//       onError(error.message);
//     },
//   });
// };
