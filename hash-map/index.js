import { LinkedList } from '../linked-lists/index.js';
class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array[capacity].fill(null);
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
    return this.buckets.length;
  }
}

const map = new HashMap();
console.log(map.length());
module.exports = { HashMap };
