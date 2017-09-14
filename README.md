# xerror
Simple JavaScript wrapper for a dynamic Error.


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