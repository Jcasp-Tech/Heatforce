
import { roofDetails } from '@/redux/services/types';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import type { NextPageContext } from 'next';
import Router from 'next/router';
// import { object } from 'yup';

let axiosInstance: AxiosInstance | null = null;

interface OriginalResponse {
  statusCode: number;
  status: number;
  message: string;
  responseData: {
    id: number;
    combo_name: string;
    combo_desc: string;
    combo_features: string;
    battery_more: any[];
    active: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    solar_panels: any;
    optimisers: any;
    inverters: any;
    battery: any;
    comboImage: any;
    __entity: string;
  };
}

interface TransformedResponse {
  JSON: {
    list: any[];
    count: number;
    hasNextPage: boolean;
    total: number;
  };
}


const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

const API = (force = false): AxiosInstance => {
  if (axiosInstance && !force) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL: process.env.NEXT_API_ENDPOINT || 'https://cessolarshop.com/apibackend',
  });
  console.log('axiosInstance', axiosInstance)
  return axiosInstance;
};

const CryptoJSAesJson = {
  /**
     * Encrypt any value
      @param {} value
     * @param {string} password
     * @return {string}
     */
  encrypt(value: any) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      process.env.PAYLOAD_SECRET_KEY,
      {
        format: CryptoJSAesJson,
      }
    ).toString();
  },
  /**
       * Decrypt a previously encrypted value
       * @param {string} jsonStr
       * @param {string} password
        @return {}
      */
  decrypt(jsonStr: any) {
    let string = jsonStr;
    if (jsonStr instanceof Object) {
      string = JSON.stringify(jsonStr);
    }

    return JSON.parse(
      CryptoJS.AES.decrypt(string, process.env.PAYLOAD_SECRET_KEY, {
        format: CryptoJSAesJson,
      }).toString(CryptoJS.enc.Utf8)
    );
  },
  /**
   * Stringify cryptojs data
   * @param {Object} cipherParams
   * @return {string}
   */
  stringify(cipherParams: any) {
    const j: any = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
    };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j).replace(/\s/g, '');
  },
  /**
       * Parse cryptojs data
       * @param {string} jsonStr
        @return {}
      */
  parse(jsonStr: any) {
    const j = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  },
};

const fetch: (config: AxiosRequestConfig) => Promise<any> = async (
  config: any
) => {
  try {
    const response = await API().request(config);
    let IS_ENABLED_ENCRYPTION = process.env.IS_ENABLED_ENCRYPTION === 'true';
    let res: any = response;
    if (res?.data) {
      if (config?.isNotEncrypt) {
        IS_ENABLED_ENCRYPTION = false;
      }

      res = {
        data: IS_ENABLED_ENCRYPTION
          ? CryptoJSAesJson.decrypt(res.data)
          : res.data,
      };
    }

    if (res?.data?.responseData) {
      res = {
        data: res?.data?.responseData,
      };
    }
    return res?.data?.responseData || res?.data;
  } catch (e: any) {
    if (
      e?.error?.response &&
      e?.error?.response?.data &&
      e?.error?.response?.data?.message
    ) {
      if (
        typeof e.error.response.data.message === 'object' &&
        e.error.response.data.message !== null
      ) {
        const errorMessages = Object.values(e.error.response.data.message);
        const errorMessagesString = errorMessages.join(', ');
        throw new Error(errorMessagesString || 'Bad response from server');
      } else {
        throw new Error(
          e.error.response.data.message || 'Bad response from server'
        );
      }
    } else {
      // eslint-disable-next-line no-console
      return 'Bad response from server';
      // eslint-disable-next-line no-return-await
      // throw new Error(e?.error?.message || 'Bad response from server');
    }
  }
};
const fetchNoEncrypt: (config: AxiosRequestConfig) => Promise<any> = async (
  config
) => {
  try {
    const res = await API().request(config);

    let response: any = res;

    if (response?.data?.responseData) {
      response = {
        data: response?.data?.responseData,
      };
    }

    return response?.data?.responseData || res?.data;
  } catch (e: any) {
    if (
      e?.error?.response &&
      e?.error?.response?.data &&
      e?.error?.response?.data?.message
    ) {
      if (
        typeof e.error.response.data.message === 'object' &&
        e.error.response.data.message !== null
      ) {
        const errorMessages = Object.values(e.error.response.data.message);
        const errorMessagesString = errorMessages.join(', ');
        throw new Error(errorMessagesString || 'Bad response from server');
      } else {
        throw new Error(
          e.error.response.data.message || 'Bad response from server'
        );
      }
    } else {
      // eslint-disable-next-line no-console
      return 'Bad response from server';
      // eslint-disable-next-line no-return-await
      // throw new Error(e?.error?.message || 'Bad response from server');
    }
  }
};

const nextRedirect = ({
  ctx = {},
  location,
}: {
  // eslint-disable-next-line 
  ctx?: NextPageContext | any;
  location: string;
}) => {
  if (typeof window === 'undefined' && ctx?.res) {
    ctx.res.writeHead(301, {
      Location: location,
    });
    ctx.res.end();
  } else {
    Router.replace(location);
  }
};

const shortStr = (string: string, limit = 60) => {
  return string && string.length > limit
    ? `${string.substring(0, limit - 1)}...`
    : string;
};

const getLetterByNumber = (number: number) => {
  const charCodeOffset = 65; // 'A' is ASCII code 65

  // const index = (number - 1) % alphabetLength;
  const charCode = number + charCodeOffset;
  let letter = '';
  if (charCode > 90) {
    const char1 = charCode - 90 + 64;
    // const char2 = (charCode - 90) + 64;
    letter = `${String.fromCharCode(65)}${String.fromCharCode(char1)}`;
    // letter = `${String.fromCharCode(66)}${String.fromCharCode(char2)}`;
  } else {
    letter = String.fromCharCode(charCode);
  }

  return letter;
};

const  getOrdinal=(n)=> {
  let ord = 'th';

  if (n % 10 == 1 && n % 100 != 11)
  {
    ord = 'st';
  }
  else if (n % 10 == 2 && n % 100 != 12)
  {
    ord = 'nd';
  }
  else if (n % 10 == 3 && n % 100 != 13)
  {
    ord = 'rd';
  }

  return ord;
}



const getMinutesOptions = (subfix: string) => {
  const minutes: any = [];
  for (let index = 0; index <= 60; index++) {
    minutes.push({
      label: `${`0${index}`.slice(-2)} ${subfix}`,
      value: `0${index}`.slice(-2),
    });
  }

  return minutes;
};

const generateNameWithHyphen = (words: string | undefined) => {
  if (words) {
    const wordsArray = words.split(' ');
    const initialsArray = wordsArray.map((word) =>
      word.charAt(0).toUpperCase()
    );
    const generatedName = initialsArray.join('-');

    return generatedName;
  }
  return '-';
};

const getSeconds = (hms: string): number => {
  const [minutes, seconds]: any = hms.split(':');
  return Number(+minutes) * 60 + Number(+seconds);
};

const capitalizeString = (string: string) => {
  const words = string ? string.split(' ') : [];
  for (let i = 0; i < words.length; i++) {
    const word: any = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  return words?.join(' ');
};

const convertToCSV = (jsonData: any, fileName: string = 'data') => {
  // Create a header row with column names
  const header = `${Object.keys(jsonData[0]).join(',')}\n`;

  // Create a data row for each object in the JSON array
  const rows = jsonData.map((item: any) => Object.values(item).join(','));

  // Combine the header and data rows into a CSV string
  const csv = header + rows.join('\n');

  // Create a Blob object and generate a download link
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const loadScript = (url: string, callback: any) => {
  const script: any = document.createElement('script'); // create script tag
  script.type = 'text/javascript';
  script.async = 'async';
  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function tmp() {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url; // load by url
  document.getElementsByTagName('head')[0]?.appendChild(script); // append to head
};

const getPanelSuggest = (area: any) => {
  const panel = area / 2.8;
  return Math.ceil(panel);
};

const sleep = (ms: number) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const addCommas = (number: number) => {
  // Convert the number to a string
  let strNumber = number.toString();

  // Reverse the string to make it easier to insert commas from right to left
  strNumber = strNumber.split('').reverse().join('');

  // Use a regular expression to insert commas every three characters
  strNumber = strNumber.replace(/(\d{3})(?=\d)/g, '$1,');

  // Reverse the string back to its original order
  strNumber = strNumber.split('').reverse().join('');

  return strNumber;

};

const getSetroofs = (allRoofs: roofDetails[]) => {
  let allCount = 0;
  allRoofs.map((d: roofDetails) => {
    if (d.draw_points) {
      allCount++;
    }
    return d;
  });
  return allCount;
};

const getProcessingCounter = (): number => {
  return parseInt(localStorage.getItem('pcnt') || '0', 10);
};

const setProcessingCounter = (value: number): void => {
  localStorage.setItem('pcnt', value.toString());
};

const ifProcessingComplete = () => {
  const currentCounter = getProcessingCounter();
  setProcessingCounter(currentCounter + 1);
};
const transformComboResponse= (originalResponse: OriginalResponse): TransformedResponse => {
  const responseData = originalResponse.responseData || originalResponse;
  if (!responseData || !responseData.battery_more) {
    return {
      JSON: {
        list: [],
        count: 0,
        hasNextPage: false,
        total: 0,
      },
    };
  }
  responseData.battery_more  = Object.keys(responseData.battery_more).map((key) => responseData.battery_more[key]);
  const batteryMoreLength = responseData.battery_more.length;

  const transformedList = responseData.battery_more.map((batteryMoreItem) => ({
    id: responseData.id,
    combo_name: responseData.combo_name,
    combo_desc: responseData.combo_desc,
    combo_features: responseData.combo_features,
    battery_more: batteryMoreItem,
    active: responseData.active === 1,
    createdAt: responseData.createdAt,
    updatedAt: responseData.updatedAt,
    deletedAt: responseData.deletedAt,
    solar_panels: responseData.solar_panels,
    optimisers: responseData.optimisers,
    inverters: responseData.inverters,
    battery: responseData.battery,
    combo_image: responseData.comboImage,
    __entity: responseData.__entity,
  }));

  return {
    JSON: {
      list: transformedList,
      count: batteryMoreLength,
      hasNextPage: false,
      total: batteryMoreLength,
    },
  };
}

const zapprChatBotOpen = () => {
  var zappr = window['zappr'] || {open:function(){}}
  if(zappr && typeof zappr === 'object' && zappr.open && typeof zappr.open === "function"){
    zappr.open()
  }
}
export {
  zapprChatBotOpen,
  addCommas,
  API,
  capitalizeString,
  convertToCSV,
  CryptoJSAesJson,
  deepClone,
  fetch,
  fetchNoEncrypt,
  generateNameWithHyphen,
  getLetterByNumber,
  getMinutesOptions,
  getPanelSuggest,
  getSeconds,
  loadScript,
  nextRedirect,
  shortStr,
  sleep,
  getSetroofs,
  ifProcessingComplete,
  getProcessingCounter,
  setProcessingCounter,
  transformComboResponse,
  getOrdinal
};
