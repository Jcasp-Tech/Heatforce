import { fetch, fetchNoEncrypt } from "@/utils/helpers";
import type { QueryParams } from "./types";
import axios from "axios";

const cacheData: {
  [key: string]: any;
} = {};

// Function to get cached response or fetch new data if cache is expired
const getCachedResponse = async (
  cacheKey: any,
  requestFunction: () => Promise<any>,
  cacheDuration: number, // API-specific cache duration in milliseconds
  useLocalStorage?: any // New parameter to decide where to cache the data
): Promise<any> => {
  const currentTime = Date.now();
  const cacheKeyString = generateSortedCacheKey(cacheKey);

  // Check localStorage if useLocalStorage is true
  if (useLocalStorage) {
    const storedData = localStorage.getItem(cacheKeyString);
    if (storedData) {
      const { data, timestamp } = JSON.parse(storedData);

      // Check if the data in localStorage is still valid
      if (
        timestamp &&
        cacheDuration &&
        currentTime - timestamp < cacheDuration
      ) {
        return data;
      }
    }
  }

  // Initialize cacheData[cacheKeyString] if it does not exist
  if (!cacheData[cacheKeyString]) {
    cacheData[cacheKeyString] = {};
  }

  // Check if data exists in cache
  if (cacheData[cacheKeyString] && useLocalStorage) {
    const data = cacheData[cacheKeyString]?.data;
    const timestamp = cacheData[cacheKeyString]?.timestamp;
    const ongoingPromise = cacheData[cacheKeyString]?.ongoingPromise;

    // Check if the cache is still valid
    if (timestamp && cacheDuration && currentTime - timestamp < cacheDuration) {
      // // console.log("Returning cached data", cacheData[cacheKeyString], timestamp);

      return data;
    }

    // If a request is ongoing, return that promise
    if (ongoingPromise) {
      // // console.log("Request already in progress, returning the ongoing promise", cacheDuration);
      return ongoingPromise;
    }

    // // console.log("Cache expired, fetching new data");
  }

  // Create a promise to fetch new data
  const promise = requestFunction()
    .then((data) => {
      // Store the new data in localStorage or memory based on useLocalStorage
      const cacheEntry = { data, timestamp: currentTime };

      if (useLocalStorage) {
        localStorage.setItem(cacheKeyString, JSON.stringify(cacheEntry));
      } else {
        cacheData[cacheKeyString] = { ...cacheEntry, cacheDuration };
      }
      return data;
    })
    .finally(() => {
      // Clean up ongoingPromise after request is resolved
      if (
        cacheData &&
        cacheData?.[cacheKeyString] &&
        cacheData[cacheKeyString].ongoingPromise
      ) {
        delete cacheData[cacheKeyString].ongoingPromise;
      }
    });

  // Store the ongoing promise in the cache
  cacheData[cacheKeyString] = {
    ...cacheData[cacheKeyString],
    ongoingPromise: promise,
  };
  return promise;
};

// Function to deep sort an object and generate a Base64 encoded cache key
const generateSortedCacheKey = (cacheKeyObject: any): string => {
  const sortObject = (obj: any): any => {
    if (obj !== null && typeof obj === "object") {
      const sortedEntries = Object.entries(obj).sort(([keyA], [keyB]) =>
        keyA.localeCompare(keyB)
      );
      return Object.fromEntries(
        sortedEntries.map(([key, value]) => [key, sortObject(value)])
      );
    }
    return obj;
  };

  const sortedObject = sortObject(cacheKeyObject);
  const jsonString = JSON.stringify(sortedObject);
  const base64Encoded = Buffer.from(jsonString).toString("base64");
  return base64Encoded;
};

// API functions with cache
export const uploadFileAPI = (payload: any) =>
  fetch({
    url: "/files/upload",
    method: "POST",
    data: payload,
  });
export const uploadBase64FileAPI = (payload: any) =>
  fetch({
    url: "/files/upload/base64Image",
    method: "POST",
    data: payload,
  });

export const updateErrorLogs = (payload: any) =>
  fetch({
    url: "/history/saveHistoryLogs",
    method: "POST",
    data: payload,
  });

export const getRoofDetailsAPI = (id: string) =>
  fetch({
    url: `/weblead/getResult?randomString=${id || ''}`,
    method: "GET",
  });

export const saveRoofDetailsAPI = (payload: any) =>
  fetch({
    url: `/roof_webLead`,
    method: "PATCH",
    data: payload,
  });

// export const postcodeSearchAPI = (postalCode: string) => {
//   const cacheKey = { postcodeSearchAPI: postalCode };
//   return getCachedResponse(cacheKey, () => fetchNoEncrypt({
//     url: `https://api.getaddress.io/autocomplete/${postalCode}?api-key=6C3bvGzS7kOuEU7jf2ILiA3849&all=true&top=50`,
//     method: 'GET',
//   }), 24 * 60 * 60 * 1000, true); // Cache for 60 minutes
// };

// New Postal Code Search API: Jcasp developer(Nischay K Gadher) date: 05/11/2025
export const postcodeSearchAPI = (
  postalCode: string,
  containerId?: string,
  fetchNew: boolean = false
) => {
  const cacheKey = { postcodeSearchAPI: postalCode };
  console.log("postalCode:", postalCode, "containerId: ", containerId);
  return getCachedResponse(
    cacheKey,
    () =>
      fetchNoEncrypt({
        url: `https://api.addressy.com/Capture/Interactive/Find/v1.10/json6.ws?Key=PZ71-GD95-MP24-JJ93&Text=${postalCode}&Limit=50${
          containerId ? `&Container=${containerId}` : ""
        }&Country=GB`,
        method: "GET",
      }),
    24 * 60 * 60 * 1000,
    !fetchNew
  ); // Cache for 60 minutes
};

export const retreiveLocationAPI = (id: string) => {
  const cacheKey = { retreiveLocationAPI: id };
  return getCachedResponse(
    cacheKey,
    () =>
      fetchNoEncrypt({
        url: `https://api.addressy.com/Capture/Interactive/Retrieve/v1.00/json3.ws?Key=PZ71-GD95-MP24-JJ93&Id=${id}`,
        method: "GET",
      }),
    24 * 60 * 60 * 1000,
    true
  ); // Cache for 60 minutes
};

// export const getLocationAPI = (id: string) => {
//   const cacheKey = { getLocationAPI: id };
//   return getCachedResponse(
//     cacheKey,
//     () =>
//       fetchNoEncrypt({
//         url: `https://api.getaddress.io/get/${id}/?api-key=6C3bvGzS7kOuEU7jf2ILiA3849&all=true`,
//         method: "GET",
//       }),
//     24 * 60 * 60 * 1000,
//     true
//   ); // Cache for 60 minutes
// };

export const getLocationAPI = (
  address: {
    id: string;
    location: string;
    country: string;
  },
  fetchNew: boolean = false
) => {
  const cacheKey = { getLocationAPI: address.id };
  return getCachedResponse(
    cacheKey,
    () =>
      fetchNoEncrypt({
        url: `https://api.addressy.com/Geocoding/International/Geocode/v1.00/json3.ws?Key=PZ71-GD95-MP24-JJ93&Location=${address.location}&Country=${address.country}`,
        method: "GET",
      }),
    24 * 60 * 60 * 1000,
    !fetchNew
  ); // Cache for 60 minutes
};

export const saveQuoteWebLeadDataAPI = (payload: any) =>
  fetch({
    url: `/weblead/weblead-data/`,
    method: "POST",
    data: payload,
  });

export const updateUserInfoQuoteWebLeadDataAPI = (payload: any) =>
  fetch({
    url: `/weblead/weblead-data/`,
    method: "PATCH",
    data: payload,
  });

export const saveRoofWebLeadDataAPI = (payload: any) =>
  fetch({
    url: `/roof_webLead/create/`,
    method: "POST",
    data: payload,
  });

export const getCombosAPI = (comboType: number) => {
  const cacheKey = { getCombosAPI: comboType };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/combos/active/${comboType}`,
        method: "GET",
      }),
    60 * 60 * 1000,
    false
  ); // Cache for 60 minutes
};

export const getWebLeadResultsDataAPI = (queryParams: QueryParams) => {
  // Strip undefined so we don't get randomString=undefined in the URL
  const params = Object.fromEntries(
    Object.entries(queryParams || {}).filter(
      ([, v]) => v !== undefined && v !== 'undefined'
    )
  ) as QueryParams;
  const cacheKey = { getCombosAPI: params };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/weblead/getResult`,
        method: "GET",
        params,
      }),
    2 * 1000,
    true
  ); // Cache for 2 seconds
};

// export const getWebLeadResultsDataAPI = (queryParams: QueryParams) => fetch({
//   url: `/weblead/getResult`,
//   method: 'GET',
//   params: queryParams,
// });

export const getWebLeadResultsIdDataAPI = (
  id: string,
  queryParams: QueryParams
) =>
  fetch({
    url: `/weblead/${id}`,
    method: "GET",
    params: queryParams,
  });

export const contactUsAPI = (payload: any) => {
  const cacheKey = { contactUsAPI: "contactUsAPI" };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/contact`,
        method: "POST",
        data: payload,
      }),
    60 * 60 * 1000,
    false
  ); // Cache for 60 minutes
};
export const getActivePanelAPI = () => {
  const cacheKey = { getActivePanelAPI: "getActivePanelAPI" };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/solar-panel/active`,
        method: "GET",
      }),
    60 * 60 * 1000,
    false
  ); // Cache for 60 minutes
};

export const getActiveInverterAPI = () => {
  const cacheKey = { getActiveInverterAPI: "getActiveInverterAPI" };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/inverters/active`,
        method: "POST",
      }),
    60 * 60 * 1000,
    false
  ); // Cache for 60 minutes
};

export const getActiveBatteryAPI = () => {
  const cacheKey = { getActiveBatteryAPI: "getActiveBatteryAPI" };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/battery/active`,
        method: "POST",
      }),
    60 * 60 * 1000,
    false
  ); // Cache for 60 minutes
};

export const getRegionDataAPI = (queryParams: any) => {
  const cacheKey = { getRegionDataAPI: queryParams };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/region-postcode`,
        method: "GET",
        params: queryParams,
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 60 minutes
};

export const getRegionAPI = (queryParams: any) => {
  const cacheKey = { getRegionAPI: queryParams };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/regions`,
        method: "GET",
        params: queryParams,
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 60 minutes
};

export const getStandingChargeByRegionIdAPI = (region_id: number) => {
  const cacheKey = { getStandingChargeByRegionIdAPI: region_id };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/standing-charge/${region_id}`,
        method: "GET",
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 1 hour
};

export const getQuarterlyUnitRatesAPI = () => {
  const cacheKey = { getQuarterlyUnitRatesAPI: "getQuarterlyUnitRatesAPI" };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/quarterly-unit-rates`,
        method: "GET",
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 1 hour
};

export const electricityBillCalculationAPI = (payload: any) => {
  const cacheKey = { electricityBillCalculationAPI: payload };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/web-lead-calculation/electricity-bill`,
        method: "POST",
        data: payload,
      }),
    5 * 60 * 1000,
    true
  ); // Cache for 5 minutes
};

export const getWebLeadCalculationAPI = (web_lead_id: number) =>
  fetch({
    url: `/web-lead-calculation/web-lead/${web_lead_id}`,
    method: "GET",
  });

export const getKKFactorRegionIdAPI = (region_id: number) => {
  const cacheKey = { getKKFactorRegionIdAPI: region_id };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/kk_factor/data/${region_id}`,
        method: "GET",
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 1 hour
};

export const getSFFactorByDirectionsAPI = (queryParams: any) => {
  const cacheKey = { getSFFactorByDirectionsAPI: queryParams };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/sf-factor/directions`,
        method: "GET",
        params: queryParams,
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 60 minutes
};

export const getRoofWebLeadIdAPI = (roof_WebLead_id: number) =>
  fetch({
    url: `/roof_webLead/${roof_WebLead_id}`,
    method: "GET",
  });

export const energyGenerationCalculationAPI = (payload: any) => {
  const cacheKey = { energyGenerationCalculationAPI: payload };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/web-lead-calculation/calculate-energy-generation`,
        method: "POST",
        data: payload,
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 60 minutes
};

export const usableEnergyProducedCalculationAPI = (payload: any) => {
  const cacheKey = { usableEnergyProducedCalculationAPI: payload };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/electricity-consumption/usable-energy`,
        method: "POST",
        data: payload,
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 60 minutes
};

export const getYearlyElectricityRateByRegionIdAPI = (region_id: number) => {
  const cacheKey = { getYearlyElectricityRateByRegionIdAPI: region_id };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/yearly-electricity-rate/${region_id}`,
        method: "GET",
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 60 minutes
};

export const getRegionQuarterlyDetailsAPI = (region_id: number) => {
  const cacheKey = { getRegionQuarterlyDetailsAPI: region_id };
  return getCachedResponse(
    cacheKey,
    () =>
      fetch({
        url: `/region-quarterly-details/region/${region_id}`,
        method: "GET",
      }),
    60 * 60 * 1000,
    true
  ); // Cache for 1 hour
};

export const getConfirmWebLeadComboDataAPI = (id: string) =>
  fetch({
    url: `/combos/get/${id}`,
    method: "GET",
  });

export const isImageUrlValid = async (url: string) => {
  const cacheKey = { url };
  const ret = await getCachedResponse(
    cacheKey,
    async () => {
      try {
        const response = await axios.head(url);
        return response.status >= 200 && response.status < 300;
      } catch (error) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          (error as any).response &&
          (error as any).response.status === 405
        ) {
          // Method Not Allowed
          const getResponse = await axios.get(url, { responseType: "stream" });
          return getResponse.status >= 200 && getResponse.status < 300;
        }
        return false;
      }
    },
    24 * 60 * 60 * 1000,
    false
  ); // Cache for 60 minutes
  console.log("Checking image URL validity for:", url, { ret });
  return ret;
};
