const _array = require('lodash/array');
const _lang = require('lodash/lang');

function diff(newx, oldx) {
  let diffResult = new Object({});
  for (const property in newx) {
    const diff = _array.differenceWith(
      newx[property],
      oldx[property],
      _lang.isEqual
    );
    if (!_lang.isEmpty(diff)) diffResult[property] = diff;
  }
  return diffResult;
}

module.exports = diff;
