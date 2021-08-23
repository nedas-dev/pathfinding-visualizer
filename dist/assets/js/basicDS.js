export class Node {
  constructor(value, next) {
    this.val = value;
    this.next = next;
  }
}

export class Bag {
  constructor() {
    this.rootNode = null;
    this.lastNode = null;
    this.size = 0;
  }

  add(val) {
    if (val === null || val === undefined) {
      throw new Error("A value for a bag can not be null or undefined");
    }

    if (this.rootNode === null) {
      this.rootNode = new Node(val, null);
      this.lastNode = this.rootNode;
      this.size++;
      return;
    }
    this.lastNode.next = new Node(val, null);
    this.lastNode = this.lastNode.next;
    this.size++;
  }
}