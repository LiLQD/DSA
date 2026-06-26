import { LinkedList } from '../linked-lists/index.js';
class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null);
    this.count = 0;
  }
  indexValid(index) {
    if (index < 0 || index >= this.capacity)
      throw new Error('Trying to access index out of bounds');
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }
  length() {
    return this.count;
  }
  set(key, value) {
    const index = this.hash(key);
    this.indexValid(index);
    if (this.buckets[index] === null) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append({ key, value });
      this.count++;
    }
    const bucket = this.buckets[index];
    let currentNode = this.buckets[index].headNode;
    while (currentNode !== null) {
      if (currentNode.value.key === key) {
        currentNode.value.value = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }
    this.buckets[index].append({ key, value });
    this.count++;
  }
  get(key) {
    const index = this.hash(key);
    this.indexValid(index);
    if (this.buckets[index] === null) return null;
    let currentNode = this.buckets[index].headNode;
    while (currentNode !== null) {
      if (currentNode.value.key === key) {
        return currentNode.value.value;
      }
      currentNode = currentNode.nextNode;
    }
    return null;
  }
}

const map = new HashMap();
console.log(map.hash('Rama'));
console.log(map.length());

export { HashMap };
