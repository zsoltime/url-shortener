module.exports.url = function(url) {
  return new Promise((resolve, reject) => {
    if (/^(https?):\/\/[^\s\/$.?#].[^\s]*$/i.test(url)) {
      resolve(url);
    }
    else {
      reject('Invalid URL');
    }
  });
}
