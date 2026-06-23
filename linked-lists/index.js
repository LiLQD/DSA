class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const newNode = new Node(value, null);
    if (this.head === null) {
      this.head = newNode;
      return;
    } else {
      let currentNode = this.head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
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
