export class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
export class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }
}
