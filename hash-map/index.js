class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
  }
  indexValid(index) {
    if (index < 0 || index >= buckets.length)
      throw new Error('Trying to access index out of bounds');
  }
}
module.exports = { HashMap };
