'use strict';

module.exports.isUrl = function isUrl(url) {
  return new Promise((resolve, reject) => {
    if (/^(https?):\/\/[^\s\/$.?#].[^\s]*$/i.test(url)) {
      resolve(url);
    } else {
      reject('Invalid URL');
    }
  });
};

module.exports.isEncoded = function isEncoded(str) {
  try {
    decodeURIComponent(str);
  } catch (e) {
    return false;
  }
  return decodeURIComponent(str) !== str;
};
