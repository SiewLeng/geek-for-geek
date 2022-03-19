class Node {
 constructor (prev, key, next) {
   this.prev = prev;
   this.key = key;
   this.next = next;
 }
}

class Link {
  constructor (array) {
    this.array = array;
    this.head = new Node(null, array[0], null);
    this.link = this.createLink2();
  }
  findTailOfLink () {
  let tail = null;
    const recursion = (node) => {
      if (node.next !== null) {
        node = node.next;
        recursion(node);
      } else {
        tail = node;
        return
      }
    }
    recursion(this.head);
    return tail;
  }
  createLink1 () {
    for (let i = 1; i < array.length; i++) {
      const tail = this.findTailOfLink();
      const node = new Node(null, array[i], null);
      tail.next = node;
      node.prev = tail;
    }
    return null;
  }
  createLink2 () {
    this.head = new Node(null, array[array.length - 1], null);
    for (let i = array.length - 2; i >= 0; i--) {
      const node = new Node(null, array[i], null);
      node.next  = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }
  printLinkList () {
    const array = [];
    let node = this.head;
    array.push(node.key);
    node = node.next;
    while (node.next !== null) {
      array.push(node.key);
      node = node.next;
    }
    array.push(node.key);
    console.log(array);
  }
  swapValue(i, j) {
    const keyOfi = i.key;
    i.key = j.key;
    j.key = keyOfi;
  }
  partition(p, r) {
    let i = null;
    let j = p;
    while (j.key !== r.key) {
      if (j.key <= r.key) {
        i = i == null ? p : i.next;
        this.swapValue(i, j);
      }
      j = j.next;
    }
    const q = i == null ? p : i.next;
    this.swapValue(q, r);
    return q;
  }
  quickSort(p, r) {
    if (p.key !== r.key) {
      const q = this.partition(p, r);
      if (q.key == r.key) {
        this.quickSort(p, q.prev);
      } else if (q.key == p.key) {
        this.quickSort(q.next, r);
      } else {
        this.quickSort(p, q.prev);
        this.quickSort(q.next, r);
      }
    }
  }
}

// const array = [2, 8, 7, 1, 3, 5, 6, 4];
// const array = [9, 8, 4, 3, 1, 6, 5, 7, 2];
const array = [97, 50, 64, 79, 11, 58];
const link = new Link(array);
link.quickSort(link.head, link.findTailOfLink());
link.printLinkList();