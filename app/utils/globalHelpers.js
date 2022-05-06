import { useEffect, useRef } from 'react';
import moment from 'moment';

export const converDataUrlToBlob = dataUrl => {
  const array = dataUrl.split(',');
  const mime = array[0].match(/:(.*?);/)[1];
  const blob = atob(array[1]);
  let n = blob.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = blob.charCodeAt(n);
  }
  return { blob: new Blob([u8arr], { type: mime }), mime };
};

export const convertFileToDataUrl = async file => {
  const { type } = file;
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  if (!dataUrl) return 'data:';
  const base64Data = dataUrl.split(',')[1];
  return `data:${type};base64,${base64Data}`;
};

export const formatDollarAmount = (value, noDecimals = false) => {
  const numOfDecimals = noDecimals ? 0 : 2;
  const valueWithDecimals = parseFloat(value).toFixed(numOfDecimals);

  if (valueWithDecimals > 5) {
    return `$${valueWithDecimals
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  return `$${valueWithDecimals}`;
};

export const formatLabel = string => {
  const splitString = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  return splitString[0].toUpperCase() + splitString.slice(1);
};

export const formatPaypalTotal = value =>
  (Number(value) * 1.03 + 0.3).toFixed(2);

export const formatToSnakeCase = string => {
  const strArray = string.split(' ');
  const formattedArray = strArray.map(str => str.toLowerCase());
  return formattedArray.join('_');
};

export const formatUrlLinks = value => {
  const { githubLink, personalLink, stackoverflowLink } = value;
  if (githubLink) {
    const formattedLink = githubLink.split('/').pop();
    return formattedLink;
  }
  if (personalLink) {
    const formattedLink = personalLink
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
      .split('/')[0];
    return formattedLink;
  }
  if (stackoverflowLink) {
    const formattedLink = stackoverflowLink.split('/').pop();
    return formattedLink;
  }
  return value;
};

export const formatPercentage = value => `${(value * 100).toFixed(0)}%`;

export const formatWordString = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const generateColor = percentage => {
  if (percentage < 50) return '#e93e43';
  if (percentage >= 50 && percentage < 70) return '#f5a942';
  if (percentage >= 70 && percentage < 90) return '#8ec63f';
  return '#4ebc7a';
};

export const generatePostedDate = date => {
  const createdDate = moment(date);
  const currDate = moment();
  const minDiff = currDate.diff(createdDate, 'minutes');

  // Return short date (ex: 30m, 2d, 6mo)
  if (minDiff < 60) return `${minDiff}m`;
  if (minDiff / 60 < 24) return `${Math.floor(minDiff / 30)}h`;
  if (minDiff / 60 / 24 < 30) return `${Math.floor(minDiff / 60 / 24)}d`;
  return `${Math.floor(minDiff / 60 / 24 / 30)}mo`;
};

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const getCookie = cookie => {
  // eslint-disable-next-line no-useless-escape
  const regexStr = new RegExp(
    `(?:(?:^|.*;\\s*)${cookie}\\s*\\=\\s*([^;]*).*$)|^.*$`,
    'g',
  );
  const cookieValue = document.cookie.replace(regexStr, '$1');
  if (cookieValue) return cookieValue;
  return '';
};

export const getQuestion = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question = urlParams.get('question');
  return Number(question);
};

export const getParameterByName = (name, url = window.location.href) => {
  // eslint-disable-next-line no-param-reassign
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#?]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const getPaymentMethod = url => {
  const hostDictionary = {
    github: 'Github Sponsors',
    opencollective: 'Open Collective',
    paypal: 'Paypal',
  };
  if (url) {
    const { host } = new URL(url);
    const urlArray = host.split('.');

    let domain = '';
    if (urlArray.length === 2) [domain] = urlArray;
    if (urlArray.length === 3) [, domain] = urlArray;
    return hostDictionary[domain];
  }
  return 'Payment Methods';
};

export const handleZipChange = (event, newZip, setZipValue) => {
  const formattedZip = newZip.replace(/[^0-9]/g, '');
  setZipValue(formattedZip);
};

export const interpolate = (string, values) =>
  string.replace(/{{(.*?)}}/gm, (match, key) => values[key] || match);

export const navHelper = (e, handleNav, route) => {
  if (!e.ctrlKey) {
    e.preventDefault();
    handleNav(route);
  }
};

export const removeCookie = cookie => {
  document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const setCookie = (name, value, options = {}) => {
  const baseCookie = `${name}=${JSON.stringify(value)}`;
  const cookieWithOptions = Object.keys(options).reduce((acc, option) => {
    const cookieOption = `; ${option}=${options[option]}`;
    return acc + cookieOption;
  }, baseCookie);
  document.cookie = `${cookieWithOptions};`;
};

export const snakeToCamel = str =>
  str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

export const useDidUpdateEffect = (effect, inputList = []) => {
  const didMountRef = useRef(false);
  const effectRef = useRef();

  effectRef.current = effect;

  useEffect(() => {
    if (didMountRef.current) effectRef.current();
    else didMountRef.current = true;
  }, inputList);
};

export const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
