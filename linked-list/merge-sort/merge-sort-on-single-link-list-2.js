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
    mergeSort(head)
    {
        //your code here
        this.sort(head);
        return head;
    }

    sort(head) {
        if (head.next !== null) {
            const middleNode = this.getMiddleNode(head);
            const head_1 = head;
            const head_2 = middleNode.next;
            middleNode.next = null;
            this.sort(head_1);
            this.sort(head_2);
            this.mergeList(head_1, head_2);
        }
    }

    getMiddleNode(head) {
        let pointer = head;
        let numOfNode = 0;
        while(pointer !== null) {
            numOfNode++;
            pointer = pointer.next;
        }
        const q = numOfNode - Math.floor(numOfNode / 2);
        let middleNode = head;
        for (let i = 2; i <= q; i++) {
           middleNode = middleNode.next;
        }
        return middleNode;
    }

    mergeList(head_1, head_2) {
        let pointer_1 = head_1;
        let pointer_2 = head_2;
        const array = [];
        while(pointer_1 !== null && pointer_2 !== null) {
            if (pointer_1.data <= pointer_2.data) {
                array.push(pointer_1.data);
                pointer_1 = pointer_1.next;
            } else {
                array.push(pointer_2.data);
                pointer_2 = pointer_2.next;
            }
        }
        if (pointer_1 !== null) {
            while (pointer_1 !== null) {
                array.push(pointer_1.data);
                pointer_1 = pointer_1.next;
            }
        } else {
            while (pointer_2 !== null) {
                array.push(pointer_2.data);
                pointer_2 = pointer_2.next;
            }
        }
        pointer_1 = head_1;
        pointer_2 = head_2;
        let index = 0;
        while (pointer_1 !== null) {
            pointer_1.data = array[index];
            pointer_1 = pointer_1.next;
            index++;
        }
        while (pointer_2 !== null) {
            pointer_2.data = array[index];
            pointer_2 = pointer_2.next;
            index++;
        }
        pointer_1 = head_1;
        while(pointer_1.next !== null) {
            pointer_1 = pointer_1.next;
        }
        pointer_1.next = head_2;
    }
}