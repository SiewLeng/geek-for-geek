// { Driver Code Starts
//Initial Template for javascript
'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });

    main();
});

function readLine() {
    return inputString[currentLine++];
}

class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

function printlist(head){
    let current = head;
    let s='';
    while (current !== null)
    {
        s+=current.data+" ";
        current = current.next;
    }
    console.log(s);
}

function main() {
    let t = parseInt(readLine());
    let i = 0;
    for(;i<t;i++)
    {
        let n = parseInt(readLine());
        let input_ar1 = readLine().split(' ').map(x=>parseInt(x));
        let head = new Node(input_ar1[0]);
        let tail = head;
        for(let i = 1; i < n; i++){
            tail.next = new Node(input_ar1[i]);
            tail = tail.next;
        }
        let obj = new Solution();
        head = obj.mergeSort(head);
        printlist(head);
    }
}// } Driver Code Ends


//User function Template for javascript

/**
 * @param {Node} head
 * @returns {Node}
*/

/*
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}
*/

class Solution {
    //Function to sort the given linked list using Merge Sort.
    merge(startNode, q, r) {
        let pointer = startNode;
        const leftLinkHead = new Node(pointer.data);
        let leftLinkTail = leftLinkHead;
        for (let i = 2; i <= q; i++) {
            pointer = pointer.next;
            leftLinkTail.next = new Node(pointer.data);
            leftLinkTail = leftLinkTail.next;
        }
        leftLinkTail.next = new Node(null);
        pointer = pointer.next;
        const rightLinkHead = new Node(pointer.data);
        let rightLinkTail = rightLinkHead;
        for (let i = q + 2; i <= r; i++) {
            pointer = pointer.next;
            rightLinkTail.next = new Node(pointer.data);
            rightLinkTail = rightLinkTail.next;
        }
        rightLinkTail.next = new Node(null);
        let leftLinkPointer = leftLinkHead;
        let rightLinkPointer = rightLinkHead;
        let updateLinkPointer = startNode;
        while (leftLinkPointer.data !== null && rightLinkPointer.data !== null) {
            if (leftLinkPointer.data <= rightLinkPointer.data) {
                updateLinkPointer.data = leftLinkPointer.data;
                leftLinkPointer = leftLinkPointer.next;
                updateLinkPointer = updateLinkPointer.next;
            } else {
                updateLinkPointer.data = rightLinkPointer.data;
                rightLinkPointer = rightLinkPointer.next;
                updateLinkPointer = updateLinkPointer.next;
            }
        }
        if (leftLinkPointer.data !== null) {
            while (leftLinkPointer.data !== null) {
                updateLinkPointer.data = leftLinkPointer.data;
                updateLinkPointer = updateLinkPointer.next;
                leftLinkPointer = leftLinkPointer.next;
            }
        } else {
            while (rightLinkPointer.data !== null) {
                updateLinkPointer.data = rightLinkPointer.data;
                updateLinkPointer = updateLinkPointer.next;
                rightLinkPointer = rightLinkPointer.next;
            }
        }
    }

    sort(startNode, r) {
        if (r > 1) {
            const q = r - Math.floor(r / 2);
            let pointer = startNode;
            for (let i = 2; i <= q + 1; i++) {
                pointer = pointer.next;
            }
            this.sort(startNode, q);
            this.sort(pointer, r - q);
            this.merge(startNode, q, r);
        }
    }

    mergeSort(head)
    {
        //your code here
        let r = 1;
        const startNode = head;
        let currentNode = startNode;
        while (currentNode.next) {
            currentNode = currentNode.next;
            r++;
        }
        this.sort(startNode, r);
        return head;
    }
}