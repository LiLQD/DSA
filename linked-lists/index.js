class LinkedList {
  constructor() {
    this.headNode = null;
  }
  append(value) {
    const newNode = new Node(value, null);
    if (this.headNode === null) {
      this.prepend(value);
      return;
    } else {
      let currentNode = this.headNode;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
  }
  prepend(value) {
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
  }
  size() {
    let listSize = 0;
    let currentNode = this.headNode;
    while (currentNode !== null) {
      listSize++;
      currentNode = currentNode.nextNode;
    }
    return listSize;
  }
  head() {
    if (this.headNode === null) return;
    return this.headNode.value;
  }
  tail() {
    if (this.headNode === null) return;
    let currentNode = this.headNode;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode.value;
  }
  at(index) {
    if (index < 0) return;
    if (this.headNode === null) return;
    let currentNode = this.headNode;
    for (let i = 0; i < index; i++) {
      if (currentNode.nextNode === null) return;
      currentNode = currentNode.nextNode;
    }
    return currentNode.value;
  }
  pop() {
    if (this.headNode === null) return;
    let headNodeNode = this.headNode;
    this.headNode = this.headNode.nextNode;
    return headNodeNode.value;
  }
  contains(value) {
    if (this.headNode === null) return false;
    let currentNode = this.headNode;
    while (currentNode !== null) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }
  findIndex(value) {
    if (this.headNode === null) return;
    let currentNode = this.headNode;
    let index = 0;
    while (currentNode !== null) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
      index++;
    }
    return;
  }
  toString() {
    let str = '';
    if (this.headNode === null) return str;
    let currentNode = this.headNode;
    while (currentNode !== null) {
      str += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    return (str += 'null');
  }
}
class Node {
  constructor(value = null, node = null) {
    this.value = value;
    this.nextNode = node;
  }
}

module.exports = { LinkedList, Node };
