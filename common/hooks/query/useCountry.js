import { useQuery } from "@tanstack/react-query";

const getCountry = async (locale) => {
  const res = await fetch("/api/config/countries", {
    headers: {
      locale,
    },
  });
  return res.json();
};

const getCountryConfigs = async (locale, countryId) => {
  const res = await fetch(`/api/config/countries?countryId=${countryId}`, {
    headers: {
      locale,
    },
  });
  return res.json();
};

const getCitiesByState = async (locale, stateId, countryId) => {
  const res = await fetch(
    `/api/config/countries?countryId=${countryId}&stateId=${stateId}`,
    {
      headers: {
        locale,
      },
    }
  );
  return res.json();
};

export const useCountries = (locale) => {
  const { isError, isLoading, data } = useQuery(
    ["countries"],
    () => getCountry(locale),
    {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const countries = data?.data;
  return {
    isCountryLoading: isLoading,
    isCountryError: isError,
    countries,
  };
};

export const useCountryData = (locale, countryId) => {
  const { isError, isLoading, data, refetch, isFetching } = useQuery(
    ["countryData"],
    () => getCountryConfigs(locale, countryId),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  const countryData = data?.data;
  return {
    isCountryDataLoading: isLoading,
    isCountryDataError: isError,
    countryData,
    refetchCountryData: refetch,
    isCountryDataFetching: isFetching,
  };
};

export const useCitiesByState = (locale, stateId, countryId) => {
  const { isError, isLoading, data, refetch, isFetching } = useQuery(
    ["cities"],
    () => getCitiesByState(locale, stateId, countryId),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  const cities = data?.data;
  return {
    isCitiesLoading: isLoading,
    isCitiesError: isError,
    cities,
    refetchCities: refetch,
    isCitiesFetching: isFetching,
  };
};
