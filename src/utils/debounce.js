// let reduceEvent;

function debounce(func, wait, imme) {
  let timer;
  return function(...rest) {
    if (imme && !timer) {
      func.apply(this, rest);
    }
    timer && clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, rest), wait);
  };
}

// setTimeout(() => debounce(() => console.log(1), 2000), 1000); // 打印: 1 执行啦！！
// setTimeout(() => debounce(() => console.log(2), 2000), 2000);
// setTimeout(() => debounce(() => console.log(3), 2000), 2000);
// setTimeout(() => debounce(() => console.log(4), 2000), 4000);

export default debounce;
