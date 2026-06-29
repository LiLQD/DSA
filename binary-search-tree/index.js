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
      array[writeIndex] = array[readIndex];
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
  buildTree(array) {
    console.log(array);
    const middle = array.length / 2;
    if (array.length <= 0) return null;
    this.root = new Node(middle);
    this.root.left = this.buildTree(array.slice(0, middle - 1));
    this.root.right = this.buildTree(array.slice(middle + 1, array.length));
    return this.root;
  }
}
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.array);
// tree.buildTree(tree.array);
// prettyPrint(tree.root);
