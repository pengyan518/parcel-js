//极简的实现+链式调用+延迟机制+状态
class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        if (this.state === 'pending') {//在resolve之前，跟之前逻辑一样，添加到callbacks中
            this.callbacks.push(onFulfilled);
        } else {//在resolve之后，直接执行回调，返回结果了
            onFulfilled(this.value);
        }
        return this;
    }
    _resolve(value) {
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(fn => fn(value));
    }
}

class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
      fn(this._resolve.bind(this), this._reject.bind(this));
    }
    then(onFulfilled, onRejected) {
      return new Promise((resolve, reject) => {
        this._handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve: resolve,
          reject: reject
        });
      });
    }
    catch(onError) {
      return this.then(null, onError);
    }
    finally(onDone) {
      if (typeof onDone !== 'function') return this.then();
  
      let Promise = this.constructor;
      return this.then(
        value => Promise.resolve(onDone()).then(() => value),
        reason => Promise.resolve(onDone()).then(() => { throw reason })
      );
    }
    _handle(callback) {
      if (this.state === 'pending') {
        this.callbacks.push(callback);
        return;
      }
  
      let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
  
      if (!cb) {//如果then中没有传递任何东西
        cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
        cb(this.value);
        return;
      }
  
      let ret;
  
      try {
        ret = cb(this.value);
        cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
      } catch (error) {
        ret = error;
        cb = callback.reject
      } finally {
        cb(ret);
      }
  
    }
    _resolve(value) {
  
      if (value && (typeof value === 'object' || typeof value === 'function')) {
        var then = value.then;
        if (typeof then === 'function') {
          then.call(value, this._resolve.bind(this), this._reject.bind(this));
          return;
        }
      }
  
      this.state = 'fulfilled';//改变状态
      this.value = value;//保存结果
      this.callbacks.forEach(callback => this._handle(callback));
    }
    _reject(error) {
      this.state = 'rejected';
      this.value = error;
      this.callbacks.forEach(callback => this._handle(callback));
    }
  }
  