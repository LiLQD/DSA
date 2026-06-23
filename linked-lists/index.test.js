// linkedList.test.js
const { LinkedList, Node } = require('./index');

describe('Node', () => {
  test('has value and nextNode set to null by default', () => {
    const node = new Node();

    expect(node.value).toBeNull();
    expect(node.nextNode).toBeNull();
  });

  test('can store a value and nextNode', () => {
    const nextNode = new Node(20);
    const node = new Node(10, nextNode);

    expect(node.value).toBe(10);
    expect(node.nextNode).toBe(nextNode);
  });
});

describe('LinkedList', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('append(value)', () => {
    test('adds a new node containing value to the end of an empty list', () => {
      list.append(10);

      expect(list.size()).toBe(1);
      expect(list.head()).toBe(10);
      expect(list.tail()).toBe(10);
      expect(list.toString()).toBe('( 10 ) -> null');
    });

    test('adds new nodes to the end of the list', () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.size()).toBe(3);
      expect(list.head()).toBe(10);
      expect(list.tail()).toBe(30);
      expect(list.toString()).toBe('( 10 ) -> ( 20 ) -> ( 30 ) -> null');
    });
  });

  describe('prepend(value)', () => {
    test('adds a new node containing value to the start of an empty list', () => {
      list.prepend(10);

      expect(list.size()).toBe(1);
      expect(list.head()).toBe(10);
      expect(list.tail()).toBe(10);
      expect(list.toString()).toBe('( 10 ) -> null');
    });

    test('adds a new node containing value to the start of a non-empty list', () => {
      list.append(20);
      list.append(30);
      list.prepend(10);

      expect(list.size()).toBe(3);
      expect(list.head()).toBe(10);
      expect(list.tail()).toBe(30);
      expect(list.toString()).toBe('( 10 ) -> ( 20 ) -> ( 30 ) -> null');
    });
  });

  describe('size()', () => {
    test('returns 0 for an empty list', () => {
      expect(list.size()).toBe(0);
    });

    test('returns the total number of nodes in the list', () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.size()).toBe(3);
    });
  });

  describe('head()', () => {
    test('returns undefined if the list is empty', () => {
      expect(list.head()).toBeUndefined();
    });

    test('returns the value of the first node in the list', () => {
      list.append(10);
      list.append(20);

      expect(list.head()).toBe(10);
    });
  });

  describe('tail()', () => {
    test('returns undefined if the list is empty', () => {
      expect(list.tail()).toBeUndefined();
    });

    test('returns the value of the final node in the list', () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.tail()).toBe(30);
    });
  });

  describe('at(index)', () => {
    beforeEach(() => {
      list.append(10);
      list.append(20);
      list.append(30);
    });

    test('returns the value of the node at the given index', () => {
      expect(list.at(0)).toBe(10);
      expect(list.at(1)).toBe(20);
      expect(list.at(2)).toBe(30);
    });

    test('returns undefined if there is no node at the given index', () => {
      expect(list.at(3)).toBeUndefined();
      expect(list.at(999)).toBeUndefined();
    });

    test('returns undefined for a negative index', () => {
      expect(list.at(-1)).toBeUndefined();
    });

    test('returns undefined when called on an empty list', () => {
      const emptyList = new LinkedList();

      expect(emptyList.at(0)).toBeUndefined();
    });
  });

  describe('pop()', () => {
    test('returns undefined when used on an empty list', () => {
      expect(list.pop()).toBeUndefined();
    });

    test('removes the head node from the list and returns its value', () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.pop()).toBe(10);
      expect(list.size()).toBe(2);
      expect(list.head()).toBe(20);
      expect(list.toString()).toBe('( 20 ) -> ( 30 ) -> null');
    });

    test('correctly handles popping the only node', () => {
      list.append(10);

      expect(list.pop()).toBe(10);
      expect(list.size()).toBe(0);
      expect(list.head()).toBeUndefined();
      expect(list.tail()).toBeUndefined();
      expect(list.toString()).toBe('');
    });
  });

  describe('contains(value)', () => {
    beforeEach(() => {
      list.append(10);
      list.append(20);
      list.append(30);
    });

    test('returns true if the passed value is in the list', () => {
      expect(list.contains(10)).toBe(true);
      expect(list.contains(20)).toBe(true);
      expect(list.contains(30)).toBe(true);
    });

    test('returns false if the passed value is not in the list', () => {
      expect(list.contains(999)).toBe(false);
    });

    test('returns false for an empty list', () => {
      const emptyList = new LinkedList();

      expect(emptyList.contains(10)).toBe(false);
    });
  });

  describe('findIndex(value)', () => {
    test('returns the index of the node containing the given value', () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.findIndex(10)).toBe(0);
      expect(list.findIndex(20)).toBe(1);
      expect(list.findIndex(30)).toBe(2);
    });

    test('returns -1 if the value cannot be found in the list', () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.findIndex(999)).toBe(-1);
    });

    test('returns -1 for an empty list', () => {
      expect(list.findIndex(10)).toBe(-1);
    });

    test('returns the index of the first matching value if duplicates exist', () => {
      list.append(10);
      list.append(20);
      list.append(20);
      list.append(30);

      expect(list.findIndex(20)).toBe(1);
    });
  });

  describe('toString()', () => {
    test('returns an empty string if the list is empty', () => {
      expect(list.toString()).toBe('');
    });

    test('represents a one-node linked list as a string', () => {
      list.append(10);

      expect(list.toString()).toBe('( 10 ) -> null');
    });

    test('represents a multi-node linked list as a string', () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.toString()).toBe('( 10 ) -> ( 20 ) -> ( 30 ) -> null');
    });
  });

  describe('insertAt(index, ...values)', () => {
    test('inserts one new node at the given index', () => {
      list.append(1);
      list.append(2);
      list.append(3);

      list.insertAt(1, 10);

      expect(list.toString()).toBe('( 1 ) -> ( 10 ) -> ( 2 ) -> ( 3 ) -> null');
      expect(list.size()).toBe(4);
    });

    test('inserts multiple new nodes at the given index', () => {
      list.append(1);
      list.append(2);
      list.append(3);

      list.insertAt(1, 10, 11);

      expect(list.toString()).toBe(
        '( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null'
      );
      expect(list.size()).toBe(5);
    });

    test('inserts values at index 0', () => {
      list.append(2);
      list.append(3);

      list.insertAt(0, 10, 11);

      expect(list.toString()).toBe(
        '( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null'
      );
      expect(list.head()).toBe(10);
    });

    test('inserts values at the end when index equals list size', () => {
      list.append(1);
      list.append(2);
      list.append(3);

      list.insertAt(3, 10, 11);

      expect(list.toString()).toBe(
        '( 1 ) -> ( 2 ) -> ( 3 ) -> ( 10 ) -> ( 11 ) -> null'
      );
      expect(list.tail()).toBe(11);
    });

    test('throws RangeError if index is below 0', () => {
      expect(() => list.insertAt(-1, 10)).toThrow(RangeError);
    });

    test('throws RangeError if index is above the list size', () => {
      list.append(1);
      list.append(2);

      expect(() => list.insertAt(3, 10)).toThrow(RangeError);
    });
  });

  describe('removeAt(index)', () => {
    beforeEach(() => {
      list.append(1);
      list.append(2);
      list.append(3);
    });

    test('removes the node at the given index', () => {
      list.removeAt(1);

      expect(list.toString()).toBe('( 1 ) -> ( 3 ) -> null');
      expect(list.size()).toBe(2);
    });

    test('removes the head node when index is 0', () => {
      list.removeAt(0);

      expect(list.toString()).toBe('( 2 ) -> ( 3 ) -> null');
      expect(list.head()).toBe(2);
      expect(list.size()).toBe(2);
    });

    test('removes the tail node', () => {
      list.removeAt(2);

      expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> null');
      expect(list.tail()).toBe(2);
      expect(list.size()).toBe(2);
    });

    test('throws RangeError if index is below 0', () => {
      expect(() => list.removeAt(-1)).toThrow(RangeError);
    });

    test('throws RangeError if index is greater than or equal to list size', () => {
      expect(() => list.removeAt(3)).toThrow(RangeError);
      expect(() => list.removeAt(999)).toThrow(RangeError);
    });

    test('throws RangeError when removing from an empty list', () => {
      const emptyList = new LinkedList();

      expect(() => emptyList.removeAt(0)).toThrow(RangeError);
    });
  });
});
