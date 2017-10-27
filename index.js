const isArray = require('isarray');
const isPlainObject = require('lodash.isplainobject');

function convertArray(array) {
  const elements = array.map(value => toSassValue(value));
  return `(${elements.join(',')})`
}

function convertPlainObject(object) {
  const elements = Object.keys(object).map(key => `${key}:${toSassValue(object[key])}`);
  return `(${elements.join(',')})`;
}

function toSassValue(value) {
  if (typeof value === 'undefined') {
    throw new Error("undefined can't be used");
  } else if (value === null) {
    return 'null';
  } if (isArray(value)) {
    return convertArray(value);
  } else if (isPlainObject(value)) {
    return convertPlainObject(value);
  }
  return value.toString();
}

exports.generate = function generate(name, val) {
  return `$${name}:${toSassValue(val)};`;
};
