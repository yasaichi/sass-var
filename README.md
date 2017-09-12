# sass-var
[![npm version](https://badge.fury.io/js/sass-var.svg)](https://badge.fury.io/js/sass-var)
[![Build Status](https://travis-ci.org/yasaichi/sass-var.svg?branch=master)](https://travis-ci.org/yasaichi/sass-var)
[![Code Climate](https://codeclimate.com/github/yasaichi/sass-var/badges/gpa.svg)](https://codeclimate.com/github/yasaichi/sass-var)
[![Test Coverage](https://codeclimate.com/github/yasaichi/sass-var/badges/coverage.svg)](https://codeclimate.com/github/yasaichi/sass-var/coverage)

sass-var provides a Sass variable generator with Node.js.

## Installation
```sh
npm install sass-var
```

## Usage
### Basic

```js
const sassVar = require('sass-var');

sassVar.generate('string', 'foo');          // '$string:foo;'
sassVar.generate('boolean', true);          // '$boolean:true;'
sassVar.generate('number', 46);             // '$number:46;'
sassVar.generate('null', null);             // '$null:null;'
sassVar.generate('array', [1, 2, 3]);       // '$array:(1,2,3);'
sassVar.generate('object', { bar: 'baz' }); // '$object:(bar:baz);'
```

### Advanced
```js
/* variables.json
{
  "string": "foo",
  "number": 46,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {
    "bar": "baz"
  }
}
*/

const sassVar = require('sass-var');
const variables = require('./variables.json');

Object.keys(variables)
  .map(key => sassVar.generate(key, variables[key]))
  .join('')
// '$string:foo;$number:46;$boolean:true;$null:null;$array:(1,2,3);$object:(bar:baz);'
```

## API
### `sassVar.generate(name, value)`
Returns a Sass variable, which of name is `name` and of value is `value`.
Throws an error when `undefined` is specified as `value`.

## Contributing
You should follow the steps below.

1. [Fork the repository](https://help.github.com/articles/fork-a-repo/)
2. Create a feature branch: `git checkout -b add-new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push the branch: `git push origin add-new-feature`
4. [Send us a pull request](https://help.github.com/articles/about-pull-requests/)

## License
The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
