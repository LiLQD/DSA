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

const mergeSort = function (arr) {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const leftArr = mergeSort(arr.slice(0, middle));
  const rightArr = mergeSort(arr.slice(middle));
  const result = [];
  while (leftArr.length > 0 && rightArr.length > 0) {
    const left = leftArr[0];
    const right = rightArr[0];
    left < right ? result.push(leftArr.shift()) : result.push(rightArr.shift());
  }
  return result.concat(leftArr, rightArr);
};
console.log(fib(8));
console.log(fibsRec(8));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 10, 1]));
