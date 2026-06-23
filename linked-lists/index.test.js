// linkedList.test.js
const { LinkedList } = require("./index");

describe("LinkedList", () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe("append()", () => {
    test("adds a node to an empty list", () => {
      list.append(10);

      expect(list.getHead()).toBe(10);
      expect(list.getTail()).toBe(10);
      expect(list.size()).toBe(1);
    });

    test("adds nodes to the end of the list", () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.getHead()).toBe(10);
      expect(list.getTail()).toBe(30);
      expect(list.size()).toBe(3);
      expect(list.toString()).toBe("( 10 ) -> ( 20 ) -> ( 30 ) -> null");
    });
  });

  describe("prepend()", () => {
    test("adds a node to the beginning of the list", () => {
      list.append(20);
      list.append(30);
      list.prepend(10);

      expect(list.getHead()).toBe(10);
      expect(list.getTail()).toBe(30);
      expect(list.size()).toBe(3);
      expect(list.toString()).toBe("( 10 ) -> ( 20 ) -> ( 30 ) -> null");
    });
  });

  describe("size()", () => {
    test("returns 0 for an empty list", () => {
      expect(list.size()).toBe(0);
    });

    test("returns the correct number of nodes", () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.size()).toBe(3);
    });
  });

  describe("getHead()", () => {
    test("returns undefined for an empty list", () => {
      expect(list.getHead()).toBeUndefined();
    });

    test("returns the first node value", () => {
      list.append(10);
      list.append(20);

      expect(list.getHead()).toBe(10);
    });
  });

  describe("getTail()", () => {
    test("returns undefined for an empty list", () => {
      expect(list.getTail()).toBeUndefined();
    });

    test("returns the last node value", () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.getTail()).toBe(30);
    });
  });

  describe("at()", () => {
    beforeEach(() => {
      list.append(10);
      list.append(20);
      list.append(30);
    });

    test("returns the value at index 0", () => {
      expect(list.at(0)).toBe(10);
    });

    test("returns the value at a middle index", () => {
      expect(list.at(1)).toBe(20);
    });

    test("returns the value at the last index", () => {
      expect(list.at(2)).toBe(30);
    });

    test("returns undefined for an index out of range", () => {
      expect(list.at(3)).toBeUndefined();
    });

    test("returns undefined for a negative index", () => {
      expect(list.at(-1)).toBeUndefined();
    });
  });

  describe("pop()", () => {
    test("returns undefined for an empty list", () => {
      expect(list.pop()).toBeUndefined();
    });

    test("removes and returns the head node with current implementation", () => {
      list.append(10);
      list.append(20);
      list.append(30);

      const removedNode = list.pop();

      expect(removedNode.value).toBe(10);
      expect(list.getHead()).toBe(20);
      expect(list.size()).toBe(2);
      expect(list.toString()).toBe("( 20 ) -> ( 30 ) -> null");
    });
  });

  describe("contains()", () => {
    beforeEach(() => {
      list.append(10);
      list.append(20);
      list.append(30);
    });

    test("returns true if value exists", () => {
      expect(list.contains(20)).toBe(true);
    });

    test("returns false if value does not exist", () => {
      expect(list.contains(999)).toBe(false);
    });

    test("returns false for empty list", () => {
      const emptyList = new LinkedList();

      expect(emptyList.contains(10)).toBe(false);
    });
  });

  describe("findIndex()", () => {
    beforeEach(() => {
      list.append(10);
      list.append(20);
      list.append(30);
    });

    test("returns the index of an existing value", () => {
      expect(list.findIndex(10)).toBe(0);
      expect(list.findIndex(20)).toBe(1);
      expect(list.findIndex(30)).toBe(2);
    });

    test("returns undefined if value does not exist", () => {
      expect(list.findIndex(999)).toBeUndefined();
    });

    test("returns undefined for empty list", () => {
      const emptyList = new LinkedList();

      expect(emptyList.findIndex(10)).toBeUndefined();
    });
  });

  describe("toString()", () => {
    test("returns empty string for an empty list with current implementation", () => {
      expect(list.toString()).toBe("");
    });

    test("returns formatted string for one node", () => {
      list.append(10);

      expect(list.toString()).toBe("( 10 ) -> null");
    });

    test("returns formatted string for multiple nodes", () => {
      list.append(10);
      list.append(20);
      list.append(30);

      expect(list.toString()).toBe("( 10 ) -> ( 20 ) -> ( 30 ) -> null");
    });
  });
});
