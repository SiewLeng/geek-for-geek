// { Driver Code Starts
//Initial Template for javascript

"use strict";

const { timingSafeEqual } = require("crypto");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString
    .trim()
    .split("\n")
    .map((string) => {
      return string.trim();
    });

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/* Function to print an array */
function printArray(arr, size) {
  let i;
  let s = "";
  for (i = 0; i < size; i++) {
    if(arr[i] == -0)
      arr[i] = 0;
    s += arr[i] + " ";
  }
  console.log(s);
}

function main() {
  let t = parseInt(readLine());
  let i = 0;
  for (; i < t; i++) {
    let n = parseInt(readLine());
    let obj = new Solution();
    for(let j = 0;j<n;j++){
      let x = parseInt(readLine());
      obj.insertHeap(x);
      console.log(Math.floor(obj.getMedian()));
    }
  }
}
// } Driver Code Ends


//User function Template for javascript

/**
 *
 *insertHeap
 * @param {number} x
 *
 *getMedian
 * @return {float}
 */
class Solution
{
    // Function to insert heap
    minHeap = [];
    maxHeap = [];

    swapArray(a, b, arr) {
      const temp = arr[a];
      arr[a] = arr[b];
      arr[b] = temp;
    }

    heapifyMaxHeapFromBottomToTop (index, arr) {
      // index = index of array + 1;
      if (index > 1) {
        const parentIndex = Math.floor(index / 2);
        const parentValue = arr[parentIndex - 1];
        const currentValue = arr[index - 1];
        if (currentValue > parentValue) {
          this.swapArray(parentIndex - 1, index - 1, arr);
          this.heapifyMaxHeapFromBottomToTop(parentIndex, arr);
        }
      }
    }

    heapifyMinHeapFromBottomToTop (index, arr) {
      // index = index of array + 1;
      if (index > 1) {
        const parentIndex = Math.floor(index / 2);
        const parentValue = arr[parentIndex - 1];
        const currentValue = arr[index - 1];
        if (currentValue < parentValue) {
          this.swapArray(parentIndex - 1, index - 1, arr);
          this.heapifyMinHeapFromBottomToTop(parentIndex, arr);
        }
      }
    }

    heapifyMaxHeapFromTopToBottom (index, stopIndex, arr) {
      // index = index of array + 1;
      const leftChildIndex = 2 * index;
      const rigthChildIndex = 2 * index + 1;
      let largestValueIndex = index;
      let largestValue = arr[index - 1];
      if (leftChildIndex <= stopIndex &&
        arr[leftChildIndex - 1] > largestValue) {
        largestValue = arr[leftChildIndex - 1];
        largestValueIndex = leftChildIndex;
      }
      if (rigthChildIndex <= stopIndex &&
        arr[rigthChildIndex - 1] > largestValue) {
        largestValue = arr[rigthChildIndex - 1];
        largestValueIndex = rigthChildIndex;
      }
      if (largestValueIndex !== index) {
        this.swapArray(index - 1, largestValueIndex - 1, arr);
        this.heapifyMaxHeapFromTopToBottom(largestValueIndex, stopIndex, arr);
      }
    }

    heapifyMinHeapFromTopToBottom (index, stopIndex, arr) {
      // index = index of array + 1;
      const leftChildIndex = 2 * index;
      const rigthChildIndex = 2 * index + 1;
      let largestValueIndex = index;
      let largestValue = arr[index - 1];
      if (leftChildIndex <= stopIndex &&
        arr[leftChildIndex - 1] < largestValue) {
        largestValue = arr[leftChildIndex - 1];
        largestValueIndex = leftChildIndex;
      }
      if (rigthChildIndex <= stopIndex &&
        arr[rigthChildIndex - 1] < largestValue) {
        largestValue = arr[rigthChildIndex - 1];
        largestValueIndex = rigthChildIndex;
      }
      if (largestValueIndex !== index) {
        this.swapArray(index - 1, largestValueIndex - 1, arr);
        this.heapifyMinHeapFromTopToBottom(largestValueIndex, stopIndex, arr);
      }
    }

    insertHeap(x)
    {
        // add your code here
        if (this.maxHeap.length === 0 && this.minHeap.length === 0) {
            this.maxHeap.push(x);
        } else if (this.maxHeap.length === 1 && this.minHeap.length === 0) {
            if (x <= this.maxHeap[0]) {
                this.minHeap.push(this.maxHeap[0])
                this.maxHeap[0] = x;
            } else {
                this.minHeap.push(x);
            }
        } else {
            if (this.maxHeap.length === this.minHeap.length) {
                if (x > this.minHeap[0]) {
                    this.minHeap.push(x);
                    this.heapifyMinHeapFromBottomToTop (this.minHeap.length, this.minHeap);
                } else {
                    this.maxHeap.push(x);
                    this.heapifyMaxHeapFromBottomToTop (this.maxHeap.length, this.maxHeap);
                }
            } else if (this.minHeap.length === this.maxHeap.length + 1) {
                if (x > this.minHeap[0]) {
                    const minHeapValueToExtract = this.minHeap[0];
                    this.minHeap[0] = x;
                    this.heapifyMinHeapFromTopToBottom (1, this.minHeap.length, this.minHeap);
                    this.maxHeap.push(minHeapValueToExtract);
                    this.heapifyMaxHeapFromBottomToTop (this.maxHeap.length, this.maxHeap);
                } else {
                    this.maxHeap.push(x);
                    this.heapifyMaxHeapFromBottomToTop (this.maxHeap.length, this.maxHeap);
                }
            } else if (this.maxHeap.length === this.minHeap.length + 1) {
                if (x > this.minHeap[0]) {
                    this.minHeap.push(x);
                    this.heapifyMinHeapFromBottomToTop (this.minHeap.length, this.minHeap);
                } else {
                    if (x > this.maxHeap[0]) {
                        this.minHeap.push(x);
                        this.heapifyMinHeapFromBottomToTop (this.minHeap.length, this.minHeap);
                    } else {
                        const maxHeapValueToExtract = this.maxHeap[0];
                        this.maxHeap[0] = x;
                        this.heapifyMaxHeapFromTopToBottom(1, this.maxHeap.length, this.maxHeap);
                        this.minHeap.push(maxHeapValueToExtract);
                        this.heapifyMinHeapFromBottomToTop(this.minHeap.length, this.minHeap);
                    }
                }
            }
        }
    }
    
     // Function to balance Heaps
    balanceHeaps()
    {
       // add your code here
    }

    // function to getMedian
    getMedian()
    {
        // add your code here
        if (this.minHeap.length === this.maxHeap.length) {
          return ((this.minHeap[0] + this.maxHeap[0]) / 2);
        }
        if (this.minHeap.length - this.maxHeap.length === 1)  {
          return this.minHeap[0];
        }
        if (this.maxHeap.length - this.minHeap.length === 1) {
          return this.maxHeap[0];
        }
        return null;
    } 
}