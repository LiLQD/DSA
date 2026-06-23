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
  getTail() {
    if (this.head === null) return;
    let currentNode = this.head;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode.value;
  }
  at(index) {
    if (index < 0) return;
    if (this.head === null) return;
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      if (currentNode.nextNode === null) return;
      currentNode = currentNode.nextNode;
    }
    return currentNode.value;
  }
  pop() {
    if (this.head === null) return;
    let headNode = this.head;
    this.head = this.head.nextNode;
    return headNode;
  }
  contains(value) {
    if (this.head === null) return false;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }
  findIndex(value) {
    if (this.head === null) return;
    let currentNode = this.head;
    let index = 0;
    while (currentNode !== null) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
      index++;
    }
    return;
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
