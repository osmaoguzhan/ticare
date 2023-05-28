import { useQuery } from "@tanstack/react-query";
import Constants from "@/utils/Constants";

const getCompanies = async (locale) => {
  const res = await fetch("/api/companies", {
    headers: {
      locale,
    },
  });
  return res.json();
};

export const useCompanies = (locale, role = Constants.ROLES.USER) => {
  const { isError, isLoading, data } = useQuery(
    ["companies"],
    () => getCompanies(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      enabled: role === Constants.ROLES.ADMIN,
    }
  );
  const companies = data?.data;
  return {
    isCompaniesLoading: isLoading,
    isCompaniesError: isError,
    companies,
  };
};
