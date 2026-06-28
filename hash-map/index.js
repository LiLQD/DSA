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
  resize(cap) {
    const entriesArr = this.entries();
    this.capacity = cap;
    this.buckets = new Array(cap).fill(null);
    this.count = 0;
    entriesArr.forEach(([key, value]) => {
      this.set(key, value);
    });
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
      if (this.count >= this.capacity * this.loadFactor)
        this.resize(this.capacity * 2);
      return;
    }
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
    if (this.count >= this.capacity * this.loadFactor)
      this.resize(this.capacity * 2);
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
  has(key) {
    const index = this.hash(key);
    this.indexValid(index);
    if (this.buckets[index] === null) return false;
    let currentNode = this.buckets[index].headNode;
    while (currentNode !== null) {
      if (currentNode.value.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }
  remove(key) {
    const index = this.hash(key);
    this.indexValid(index);
    if (this.buckets[index] === null) return false;
    let currentNode = this.buckets[index].headNode;
    let nodeIndex = 0;
    while (currentNode !== null) {
      if (currentNode.value.key === key) {
        this.buckets[index].removeAt(nodeIndex);
        this.count--;
        return true;
      }
      currentNode = currentNode.nextNode;
      nodeIndex++;
    }
    if (this.buckets[index].size() === 0) this.buckets[index] = null;
    return false;
  }
  keys() {
    const arrKey = [];
    this.buckets.forEach((list) => {
      if (list !== null) {
        let currentNode = list.headNode;
        while (currentNode) {
          arrKey.push(currentNode.value.key);
          currentNode = currentNode.nextNode;
        }
      }
    });
    return arrKey;
  }
  values() {
    const arrValue = [];
    this.buckets.forEach((list) => {
      if (list !== null) {
        let currentNode = list.headNode;
        while (currentNode) {
          arrValue.push(currentNode.value.value);
          currentNode = currentNode.nextNode;
        }
      }
    });
    return arrValue;
  }
  entries() {
    const arrNode = [];
    this.buckets.forEach((list) => {
      if (list !== null) {
        let currentNode = list.headNode;
        while (currentNode) {
          arrNode.push([currentNode.value.key, currentNode.value.value]);
          currentNode = currentNode.nextNode;
        }
      }
    });
    return arrNode;
  }
  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
    this.loadFactor = 0.75;
    this.count = 0;
  }
}

const map = new HashMap();
console.log(map.hash('Rama'));
console.log(map.length());

export { HashMap };
