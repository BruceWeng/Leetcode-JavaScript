/**
 * Implementing Promise
 */
class Promise {
  constructor(fn) {
  // 1. State Machine

  // Enum states
    this.states = {
      PENDING: 0,
      FULFILLED: 1,
      REJECTED: 2
    };
      
    // Store current state in Promise
    this.state = this.states.PENDING;
      
    // Store value or error once FULLFILLED or REJECTED
    this.value = null;

    // Store sucess & failure handlers attached by calling .then or .done
    this.handlers = [];

    // 5. Constructing resolving the promise
    /**
     * As you can see, we re-use doResolve because we have another 
     * untrusted resolver. The fn is allowed to call both resolve 
     * and reject multiple times, and even throw exceptions. It is 
     * up to us to ensure that the promise is only resolved or 
     * rejected once, and then never transitions into a different state ever again.
     */
    // MUST bind(this) to any functions that are passed as this.function
    // Otherwise, TypeError: cannot read property 'function' of undefined
    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);
    this._doResolve(fn, this._resolve, this._reject);
  }

  // 2. Transitions: fulfilling and rejecting
  _fulfill(result) {
    this.state = this.states.FULFILLED;
    this.value = result;
    // 6. Observing the promise: .done(onFulfilled, onRejected)
    this.handlers.forEach(this._handle);
    this.handlers = null;
  }

  _reject(error) {
    this.state = this.states.REJECTED;
    this.value = error;
    // 6. Observing the promise: .done(onFulfilled, onRejected)
    this.handlers.forEach(this._handle);
    this.handlers = null;
  }


  // 3. Higher level transition: resolve
  /**
   * 
   * @param {Promise|Any} result 
   * @return {void}
   */
  _resolve(result) {
    try {
      let then = this._getThen(result);
      if (then !== null) {
        this._doResolve(then.bind(result, this._resolve, this._reject));
        return;
      }

      this._fulfill(result);
    } catch (e) {
      this._reject(e);
    }
  }

  // 4. Helper methods for _resolve(): getThen() and doResolve()
  /**
   * Note how resolve accepts either a promise or a plain value 
   * and if it's a promise, waits for it to complete. A promise 
   * must never be fulfilled with another promise, so it is this 
   * resolve function that we will expose, rather than the internal 
   * fulfill. We've used a couple of helper methods, so lets define those:
   */
  /**
   * Check if a value is a Promise and, if it is,
   * return the `then` method of that promise.
   * @param {Promise|Any} value 
   * @return {Function|Null}
   */
  _getThen(value) {
    let type = typeof value;
    if (value !== null && (type === 'object' || type === 'function')) {
      let then = value.then;
      if (typeof then === 'function') {
        return then;
      }
    }

    return null;
  }

  _doResolve(fn, onFulfilled, onRejected) {
    // check if the promise is resolved before
    let done = false;
    try {
      fn(
        (value) => {
          if (done === true) return;
          done = true;
          onFulfilled(value);
        },
        (reason) => {
          if (done === true) return;
          done = true;
          onRejected(reason);
        }
      );
    } catch (ex) {
      if (done === true) return;
      done = true;
      onRejected(ex);
    }
  }

  // 6. Observing the promise: .done(onFulfilled, onRejected)
  /**
   * a. only one of onFulfilled or onRejected is called
   * b. it is only called once
   * c. it is never called until the next tick (i.e. after the .done method has returned)
   * d. it is called regardless of whether the promise is resolved before or after we call .done
   */

  /**
   * Helper function for _fulfill and _reject
   * @param {Promise} handler
   * @return {void}
   */
  _handle(handler) {
    if (this.state === this.states.PENDING) {
      this.handlers.push(handler);
    } else {
      if (this.state === this.states.FULFILLED &&
          typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(this.value);
      }

      if (this.state === this.states.REJECTED &&
          typeof handler.onRejected === 'function') {
        handler.onRejected(this.value);
      }
    }
  }

  done(onFulfilled, onRejected) {
    // ensure we are always asynchronous
    setTimeout(
      () => this._handle({ onFulfilled, onRejected }),
      0
    );
  }

  // 7. Observing the promise: .then(onFulfilled, onRejected)
  /**
   * Now that we have .done implemented, we can easily 
   * implement .then to just do the same thing, but construct 
   * a new Promise in the process.
   */
  then(onFulfilled, onRejected) {
    let self = this;
    return new Promise(function(_resolve, _reject) {
      return self.done(
        // onFulfilled function
        function(result) {
          if (typeof onFulfilled === 'function') {
            try {
              return _resolve(onFulfilled(result));
            } catch (ex) {
              return _reject(ex);
            }
          } else {
            return _resolve(result);
          }
        },
        // onRejected function
        function(error) {
          if (typeof onRejected === 'function') {
            try {
              return _resolve(onRejected(error));
            } catch (ex) {
              return _reject(ex);
            }
          } else {
            return _reject(error);
          }
        }
      );
    });
  }
}

// Testing
var promise1 = new Promise(function(_resolve, _reject) {
  _resolve('Success!');
});

console.log(`+++Promise1 is constructed+++`);
promise1.then(function(value) {
  console.log(value); // expected output: "Success!"
});

var promise2 = new Promise(function(_resolve, _reject) {
  throw 'Uh-oh!';
});

console.log(`+++Promise2 is constructed+++`);
promise2.then(
  function(value) {
    console.log(value); 
  },
  function(error) {
    console.log(error); // expected output: "Uh-oh!"
  }
);
