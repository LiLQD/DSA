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
export class Tree {
  constructor(array) {
    this.array = mergeSort(array);
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
// const tree = new Tree([1, 23, 8, 4, 3, 5, 7, 9, 67, 6345, 324]);
// tree.buildTree(tree.array);
// tree.prettyPrint();
