// see https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

function XError(props) {
  this.name = 'XError';
  this.message = '';

  if (props && typeof props === 'string') {
    this.message = props;
  } else if (props && Object.keys(props).length > 0) {
    Object.keys(props).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        // TODO test
        writable: false,
        value: props[key],
      });
    });
  }

  if (Error.hasOwnProperty('captureStackTrace')) {
    Error.captureStackTrace(this, XError);
  } else {
    Object.defineProperty(this, 'stack', {
      enumerable: false,
      writable: false,
      value: new Error(this.message).stack,
    });
  }
}

XError.prototype = Object.create(Error.prototype);
XError.prototype.constructor = XError;

module.exports = XError;
