const { HashMap } = require('./index.js');

describe('HashMap', () => {
  let map;

  beforeEach(() => {
    map = new HashMap();
  });

  describe('initial state', () => {
    test('starts with capacity 16 and load factor 0.75', () => {
      expect(map.capacity).toBe(16);
      expect(map.loadFactor).toBe(0.75);
    });

    test('starts empty', () => {
      expect(map.length()).toBe(0);
      expect(map.keys()).toEqual([]);
      expect(map.values()).toEqual([]);
      expect(map.entries()).toEqual([]);
    });
  });

  describe('hash(key)', () => {
    test('returns a valid bucket index', () => {
      const hashCode = map.hash('Carlos');

      expect(Number.isInteger(hashCode)).toBe(true);
      expect(hashCode).toBeGreaterThanOrEqual(0);
      expect(hashCode).toBeLessThan(map.capacity);
    });

    test('same key always produces the same hash code', () => {
      expect(map.hash('Carlos')).toBe(map.hash('Carlos'));
    });

    test('handles very long keys without producing an out-of-range index', () => {
      const longKey = 'a'.repeat(10000);
      const hashCode = map.hash(longKey);

      expect(Number.isInteger(hashCode)).toBe(true);
      expect(hashCode).toBeGreaterThanOrEqual(0);
      expect(hashCode).toBeLessThan(map.capacity);
    });
  });

  describe('set(key, value)', () => {
    test('stores a key-value pair', () => {
      map.set('Carlos', 'I am Carlos');

      expect(map.get('Carlos')).toBe('I am Carlos');
      expect(map.length()).toBe(1);
    });

    test('updates the value if the key already exists', () => {
      map.set('Carlos', 'I am the old value.');
      map.set('Carlos', 'I am the new value.');

      expect(map.get('Carlos')).toBe('I am the new value.');
      expect(map.length()).toBe(1);
    });

    test('stores multiple key-value pairs', () => {
      map.set('Carlos', 'first');
      map.set('Rama', 'second');
      map.set('Sita', 'third');

      expect(map.get('Carlos')).toBe('first');
      expect(map.get('Rama')).toBe('second');
      expect(map.get('Sita')).toBe('third');
      expect(map.length()).toBe(3);
    });

    test('handles collisions without overwriting different keys', () => {
      // With capacity 16 and the 31-prime hash, "a" and "q" collide.
      expect(map.hash('a')).toBe(map.hash('q'));

      map.set('a', 'value for a');
      map.set('q', 'value for q');

      expect(map.get('a')).toBe('value for a');
      expect(map.get('q')).toBe('value for q');
      expect(map.length()).toBe(2);
    });

    test('updates one key inside a collision bucket without changing the other key', () => {
      map.set('a', 'old a');
      map.set('q', 'value q');
      map.set('a', 'new a');

      expect(map.get('a')).toBe('new a');
      expect(map.get('q')).toBe('value q');
      expect(map.length()).toBe(2);
    });
  });

  describe('get(key)', () => {
    test('returns the value assigned to a key', () => {
      map.set('name', 'HashMap');

      expect(map.get('name')).toBe('HashMap');
    });

    test('returns null if the key is not found', () => {
      expect(map.get('missing')).toBeNull();
    });

    test('returns null after key is removed', () => {
      map.set('name', 'HashMap');
      map.remove('name');

      expect(map.get('name')).toBeNull();
    });
  });

  describe('has(key)', () => {
    test('returns true if the key exists', () => {
      map.set('Carlos', 'developer');

      expect(map.has('Carlos')).toBe(true);
    });

    test('returns false if the key does not exist', () => {
      expect(map.has('Carlos')).toBe(false);
    });

    test('returns false after the key is removed', () => {
      map.set('Carlos', 'developer');
      map.remove('Carlos');

      expect(map.has('Carlos')).toBe(false);
    });
  });

  describe('remove(key)', () => {
    test('removes an existing key and returns true', () => {
      map.set('Carlos', 'developer');

      expect(map.remove('Carlos')).toBe(true);
      expect(map.get('Carlos')).toBeNull();
      expect(map.has('Carlos')).toBe(false);
      expect(map.length()).toBe(0);
    });

    test('returns false if the key does not exist', () => {
      expect(map.remove('missing')).toBe(false);
      expect(map.length()).toBe(0);
    });

    test('removes only the matching key from a collision bucket', () => {
      map.set('a', 'value for a');
      map.set('q', 'value for q');

      expect(map.remove('a')).toBe(true);

      expect(map.get('a')).toBeNull();
      expect(map.get('q')).toBe('value for q');
      expect(map.length()).toBe(1);
    });

    test('can remove the second key from a collision bucket', () => {
      map.set('a', 'value for a');
      map.set('q', 'value for q');

      expect(map.remove('q')).toBe(true);

      expect(map.get('a')).toBe('value for a');
      expect(map.get('q')).toBeNull();
      expect(map.length()).toBe(1);
    });
  });

  describe('length()', () => {
    test('returns the number of stored keys', () => {
      expect(map.length()).toBe(0);

      map.set('one', 1);
      map.set('two', 2);
      map.set('three', 3);

      expect(map.length()).toBe(3);
    });

    test('does not increase when updating an existing key', () => {
      map.set('one', 1);
      map.set('one', 111);

      expect(map.length()).toBe(1);
    });

    test('decreases after removing a key', () => {
      map.set('one', 1);
      map.set('two', 2);

      map.remove('one');

      expect(map.length()).toBe(1);
    });
  });

  describe('clear()', () => {
    test('removes all entries from the hash map', () => {
      map.set('one', 1);
      map.set('two', 2);
      map.set('three', 3);

      map.clear();

      expect(map.length()).toBe(0);
      expect(map.get('one')).toBeNull();
      expect(map.get('two')).toBeNull();
      expect(map.get('three')).toBeNull();
      expect(map.keys()).toEqual([]);
      expect(map.values()).toEqual([]);
      expect(map.entries()).toEqual([]);
    });

    test('can be used on an already empty hash map', () => {
      map.clear();

      expect(map.length()).toBe(0);
      expect(map.keys()).toEqual([]);
      expect(map.values()).toEqual([]);
      expect(map.entries()).toEqual([]);
    });
  });

  describe('keys()', () => {
    test('returns an array containing all keys', () => {
      map.set('first', 1);
      map.set('second', 2);
      map.set('third', 3);

      expect(map.keys()).toHaveLength(3);
      expect(map.keys()).toEqual(
        expect.arrayContaining(['first', 'second', 'third'])
      );
    });

    test('returns keys from collision buckets', () => {
      map.set('a', 'value for a');
      map.set('q', 'value for q');

      expect(map.keys()).toEqual(expect.arrayContaining(['a', 'q']));
      expect(map.keys()).toHaveLength(2);
    });
  });

  describe('values()', () => {
    test('returns an array containing all values', () => {
      map.set('first', 1);
      map.set('second', 2);
      map.set('third', 3);

      expect(map.values()).toHaveLength(3);
      expect(map.values()).toEqual(expect.arrayContaining([1, 2, 3]));
    });

    test('returns updated values, not old overwritten values', () => {
      map.set('Carlos', 'old value');
      map.set('Carlos', 'new value');

      expect(map.values()).toEqual(['new value']);
      expect(map.values()).not.toContain('old value');
    });
  });

  describe('entries()', () => {
    test('returns an array containing all key-value pairs', () => {
      map.set('first', 1);
      map.set('second', 2);
      map.set('third', 3);

      expect(map.entries()).toHaveLength(3);
      expect(map.entries()).toEqual(
        expect.arrayContaining([
          ['first', 1],
          ['second', 2],
          ['third', 3],
        ])
      );
    });

    test('returns entries from collision buckets', () => {
      map.set('a', 'value for a');
      map.set('q', 'value for q');

      expect(map.entries()).toEqual(
        expect.arrayContaining([
          ['a', 'value for a'],
          ['q', 'value for q'],
        ])
      );
    });
  });

  describe('growth / resizing', () => {
    test('doubles capacity when load factor is reached', () => {
      for (let i = 0; i < 13; i++) {
        map.set(`key${i}`, `value${i}`);
      }

      expect(map.capacity).toBe(32);
      expect(map.length()).toBe(13);
    });

    test('preserves all existing entries after resizing', () => {
      for (let i = 0; i < 13; i++) {
        map.set(`key${i}`, `value${i}`);
      }

      for (let i = 0; i < 13; i++) {
        expect(map.get(`key${i}`)).toBe(`value${i}`);
      }

      expect(map.keys()).toHaveLength(13);
      expect(map.values()).toHaveLength(13);
      expect(map.entries()).toHaveLength(13);
    });

    test('still allows updates after resizing', () => {
      for (let i = 0; i < 13; i++) {
        map.set(`key${i}`, `value${i}`);
      }

      map.set('key5', 'updated value');

      expect(map.get('key5')).toBe('updated value');
      expect(map.length()).toBe(13);
    });

    test('still handles removals after resizing', () => {
      for (let i = 0; i < 13; i++) {
        map.set(`key${i}`, `value${i}`);
      }

      expect(map.remove('key5')).toBe(true);

      expect(map.get('key5')).toBeNull();
      expect(map.has('key5')).toBe(false);
      expect(map.length()).toBe(12);
    });
  });
});
