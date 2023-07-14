const paramsToQueryString = (params) => {
  // Remove params that are null.
  const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, val]) => val !== null));
  const searchParams = new URLSearchParams(filteredParams);
  const paramString = searchParams.toString();
  return paramString === '' ? paramString : `?${paramString}`;
};

const uniqueArray = (array) => array.filter((value, index, arr) => arr.indexOf(value) === index);

export {
  paramsToQueryString,
  uniqueArray,
};
