#! /usr/bin/env node
const assert = require('assert');
const XError = require('.');

const printEmptyLine = () => console.log('');

let passed = 0;
let failed = 0;
function test(doc, assertion) {
  try {
    assertion.call(null);
    console.log('\x1b[32m%s\x1b[0m', 'PASS:', doc);
    passed++;
  } catch (ignoreMe) {
    console.warn('\x1b[31m%s\x1b[0m', 'FAIL:', doc);
    failed++;
  }
}

printEmptyLine();

test('(typeof) should return the same when checking its type as the native Error', () => {
  const typeOfError = typeof Error;
  const typeOfXError = typeof XError;
  assert.equal(typeOfXError, typeOfError);
});

test('(instanceof) error object should be instanceof XError', () => {
  const xError = new XError();
  assert.ok(xError instanceof XError);
});

test('should have a message property if string is passed on construction', () => {
  const testMessage = 'testMessage';
  const xError = new XError(testMessage);
  assert.ok(xError.message === testMessage);
});

test('should have no other property if string is passed on construction', () => {
  const testMessage = 'testMessage';
  const xErrorKeys = Object.keys(new XError(testMessage));
  assert.equal(xErrorKeys.length, 2);
  assert.ok(xErrorKeys.includes('name'));
  assert.ok(xErrorKeys.includes('message'));
});

test('should have an empty string as default message', () => {
  assert.equal(new XError().message, '');
});

test('should be named XError', () => {
  assert.equal(new XError().name, 'XError');
});

test('should return the correct error stack', () => {
  function testFunction(message) {
    try {
      throw new XError(message);
    } catch (error) {
      return error.stack;
    }
  }
  const errorMessage = 'errorStack';
  const errorStack = testFunction(errorMessage).split('\n');
  // should report an error with the provided message
  assert.ok(errorStack[0].includes(errorMessage));
  // error was thrown in testFunction()
  assert.ok(errorStack[1].includes('testFunction'));
  // testFunction() was called in test
  assert.ok(errorStack[2].includes('test'));
});

test('should have all key/value-pairs of a passed object as property with the respective value', () => {
  const testObject = {
    foo: 'foo',
    bar: 'bar',
  };
  const xError = new XError(testObject);
  // message and name + the ones passed on construction
  assert.ok(Object.keys(xError).length === 2 + Object.keys(testObject).length);
  assert.equal(xError.foo, testObject.foo);
  assert.equal(xError.bar, testObject.bar);
});

printEmptyLine();

const result = `--> ${passed +
  failed} tests completed (${passed} passed, ${failed} failed)`;
if (failed > 0) {
  console.log('\x1b[41m\x1b[37m%s\x1b[0m', 'FAILED', result);
  process.exit(1);
} else if (passed > 0 && failed === 0) {
  console.log('\x1b[42m%s\x1b[0m', 'PASSED', result);
  process.exit(0);
}
