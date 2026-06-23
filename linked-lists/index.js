class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const newNode = new Node(value, null);
    if (this.head === null) {
      this.prepend(value);
      return;
    } else {
      let currentNode = this.head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
  }
  prepend(value) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
  }
  size() {
    let listSize = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      listSize++;
      currentNode = currentNode.nextNode;
    }
    return listSize;
  }
  getHead() {
    if (this.head === null) return;
    return this.head.value;
  }
}
class Node {
  value = null;
  nextNode = null;
  constructor(value, node) {
    this.value = value;
    this.nextNode = node;
  }
}
