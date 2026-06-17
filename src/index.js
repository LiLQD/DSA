const fib = function (n) {
  const arr = [0];
  for (let i = 1; i < n; i++) {
    const first = arr[i - 2] || 0;
    const second = arr[i - 1] || 1;
    arr[i] = first + second;
  }
  return arr;
};

const fibsRec = function (n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const arr = fibsRec(n - 1);
  const next = arr[arr.length - 1] + arr[arr.length - 2];
  arr.push(next);
  return arr;
};
console.log(fib(8));
console.log(fibsRec(8));
