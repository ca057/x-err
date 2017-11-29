# x-err

> Simple JavaScript module to create an Error with custom properties.

[![npm](https://img.shields.io/npm/v/x-err.svg)](https://www.npmjs.com/package/x-err)
[![npm](https://img.shields.io/npm/l/x-err.svg)](https://www.npmjs.com/package/x-err)


## Installation

Install it via npm and save it as dependency: `npm install --save x-err`.


## Usage

On construction, either provide an object, where all keys will be used as properties, or provide a string to provide a simple error message.

```javascript
const XError = require('x-err');

try {
  throw new XError({ message: 'My error message.', foo: 'bar', baz: 42 });
} catch (error) {
  console.log(error.name); // 'XError
  console.log(error.message); // 'My error message.'
  console.log(error.foo); // 'bar'
  console.log(error.baz); // '42'
}

try {
  throw new XError('My error message.');
} catch (error) {
  console.log(error.name); // 'XError
  console.log(error.message); // 'My error message.'
}
```


## Test

Run `npm run test`.


## Resources

Based partly on:

- [What's a good way to extend Error in JavaScript?](https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript)
- [Error](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Error)

## License

GNU GENERAL PUBLIC LICENSE, see [LICENSE](LICENSE).
