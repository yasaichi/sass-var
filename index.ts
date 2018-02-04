import isPlainObject = require('lodash.isplainobject');

function convertArray(array: any[]): string {
  const elements = array.map(value => toSassValue(value));
  return `(${elements.join(',')})`;
}

function convertPlainObject(object: { [key: string]: any }): string {
  const elements = Object.keys(object).map(key => `${key}:${toSassValue(object[key])}`);
  return `(${elements.join(',')})`;
}

function toSassValue(value: any): string {
  if (typeof value === 'undefined') {
    throw new Error("undefined can't be used");
  } else if (value === null) {
    return 'null';
  } if (Array.isArray(value)) {
    return convertArray(value);
  } else if (isPlainObject(value)) {
    return convertPlainObject(value);
  }
  return value.toString();
}

export function generate(name: string, value: any): string {
  return `$${name}:${toSassValue(value)};`;
}
