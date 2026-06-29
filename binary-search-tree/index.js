import { mergeSort } from '../recursion/index.js';
export class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) return;
  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};
const removeDuplicates = (array) => {
  if (array.length === 0) return array;
  let writeIndex = 1;
  for (let readIndex = 1; readIndex < array.length; readIndex++) {
    if (array[readIndex] !== array[writeIndex - 1]) {
      array[readIndex] = array[writeIndex];
      writeIndex++;
    }
  }
  array.length = writeIndex;
  return array;
};
export class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.root = null;
  }
}
