const base62 = (function() {
  let charSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function setCharSet(chars) {
    if (chars.length === 62 && chars.length === [...new Set(chars)].length) {
      charSet = chars;
    }
    else {
      throw new Error("Your character set must have 62 unique characters.");
    }
  }

  function encode(base10) {
    let base62 = '';

    if (base10 === 0) {
      return charSet[0];
    }

    while (base10 > 0) {
      base62 = charSet[base10 % 62] + base62;
      base10 = Math.floor(base10 / 62);
    }

    return base62;
  }

  function decode(base62) {
    base62 = base62.split('').reverse();

    return base62.reduce((val, char, idx, base62) => {
      return val + charSet.indexOf(base62[idx]) * Math.pow(62, idx);
    }, 0);
  }

  return {
    encode: encode,
    decode: decode,
    setCharSet: setCharSet
  }
})();

module.exports = base62;
