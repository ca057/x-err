# xerror

> Simple JavaScript module to create an Error with custom properties.


## Usage

```javascript
const XError = require('XError');
const assert = require('assert');

try {
  throw new XError({ foo: 'bar', baz: 42 });
} catch (error) {
  console.log(error.foo); // bar
  console.log(error.baz); // 42
}
```


## Test

Run `npm run test`.


## License

GNU GENERAL PUBLIC LICENSE, see [LICENSE](LICENSE).