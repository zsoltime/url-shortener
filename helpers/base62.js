const base62 = (function base62() {
  let charSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function setCharSet(chars) {
    if (chars.length === 62 && chars.length === [...new Set(chars)].length) {
      charSet = chars;
    } else {
      throw new Error('Your character set must have 62 unique characters.');
    }
  }

  function encode(base10String) {
    let base62String = '';

    if (base10String === 0) {
      return charSet[0];
    }

    while (base10String > 0) {
      base62String = charSet[base10String % 62] + base62String;
      base10String = Math.floor(base10String / 62);
    }

    return base62String;
  }

  function decode(str) {
    const arr = str.split('').reverse();

    return arr.reduce((val, char, idx, base62String) => (
      val + (charSet.indexOf(base62String[idx]) * Math.pow(62, idx))
    ), 0);
  }

  return {
    encode,
    decode,
    setCharSet,
  };
}());

module.exports = base62;
