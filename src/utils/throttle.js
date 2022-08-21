function throttle(func, delay) {
  let pre = 0;
  return function(...rest) {
    const current = Date.now();
    if (current - pre > delay) {
      func.apply(this, rest);
      pre = current;
    }
  };
}

export default throttle;
