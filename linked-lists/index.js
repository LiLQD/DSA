class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const newNode = new Node(value, null);
    if (this.head === null) {
      prepend(value);
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
  }
  size() {
    let listSize = 0;
    let currentNode = this.head;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
      listSize++;
    }
    return listSize;
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
