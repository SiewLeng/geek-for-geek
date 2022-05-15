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

    heapifyMaxHeapFromBottomToTop (index) {
      // index = index of array + 1;
      if (index > 1) {
        const parentIndex = Math.floor(index / 2);
        const parentValue = this.maxHeap[parentIndex - 1];
        const currentValue = this.maxHeap[index - 1];
        if (currentValue > parentValue) {
            const temp = this.maxHeap[index - 1];
            this.maxHeap[index - 1] = this.maxHeap[parentIndex - 1];
            this.maxHeap[parentIndex - 1] = temp;
            this.heapifyMaxHeapFromBottomToTop(parentIndex);
        } else {
            return
        }
      }
    }

    heapifyMinHeapFromBottomToTop (index) {
      // index = index of array + 1;
      if (index > 1) {
        const parentIndex = Math.floor(index / 2);
        const parentValue = this.minHeap[parentIndex - 1];
        const currentValue = this.minHeap[index - 1];
        if (currentValue < parentValue) {
          const temp = this.minHeap[index - 1];
          this.minHeap[index - 1] = this.minHeap[parentIndex - 1];
          this.minHeap[parentIndex - 1] = temp;
          this.heapifyMinHeapFromBottomToTop(parentIndex);
        } else {
            return
        }
      }
    }

    heapifyMaxHeapFromTopToBottom (index, stopIndex) {
      // index = index of array + 1;
      const leftChildIndex = 2 * index;
      const rigthChildIndex = 2 * index + 1;
      let largestValueIndex = index;
      let largestValue = this.maxHeap[index - 1];
      if (leftChildIndex <= stopIndex &&
        this.maxHeap[leftChildIndex - 1] > largestValue) {
        largestValue = this.maxHeap[leftChildIndex - 1];
        largestValueIndex = leftChildIndex;
      }
      if (rigthChildIndex <= stopIndex &&
        this.maxHeap[rigthChildIndex - 1] > largestValue) {
        largestValue = this.maxHeap[rigthChildIndex - 1];
        largestValueIndex = rigthChildIndex;
      }
      if (largestValueIndex !== index) {
        const temp = this.maxHeap[index - 1];
        this.maxHeap[index - 1] = this.maxHeap[largestValueIndex - 1];
        this.maxHeap[largestValueIndex - 1] = temp;
        this.heapifyMaxHeapFromTopToBottom(largestValueIndex, stopIndex);
      } else {
          return;
      }
    }

    heapifyMinHeapFromTopToBottom (index, stopIndex) {
      // index = index of array + 1;
      const leftChildIndex = 2 * index;
      const rigthChildIndex = 2 * index + 1;
      let largestValueIndex = index;
      let largestValue = this.minHeap[index - 1];
      if (leftChildIndex <= stopIndex &&
        this.minHeap[leftChildIndex - 1] < largestValue) {
        largestValue = this.minHeap[leftChildIndex - 1];
        largestValueIndex = leftChildIndex;
      }
      if (rigthChildIndex <= stopIndex &&
        this.minHeap[rigthChildIndex - 1] < largestValue) {
        largestValue = this.minHeap[rigthChildIndex - 1];
        largestValueIndex = rigthChildIndex;
      }
      if (largestValueIndex !== index) {
        const temp = this.minHeap[index - 1];
        this.minHeap[index - 1] = this.minHeap[largestValueIndex - 1];
        this.minHeap[largestValueIndex - 1] = temp;
        this.heapifyMinHeapFromTopToBottom(largestValueIndex, stopIndex);
      } else {
          return
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
                    this.heapifyMinHeapFromBottomToTop (this.minHeap.length);
                } else {
                    this.maxHeap.push(x);
                    this.heapifyMaxHeapFromBottomToTop (this.maxHeap.length);
                }
            } else if (this.minHeap.length === this.maxHeap.length + 1) {
                if (x > this.minHeap[0]) {
                    const minHeapValueToExtract = this.minHeap[0];
                    this.minHeap[0] = x;
                    this.heapifyMinHeapFromTopToBottom (1, this.minHeap.length);
                    this.maxHeap.push(minHeapValueToExtract);
                    this.heapifyMaxHeapFromBottomToTop (this.maxHeap.length);
                } else {
                    this.maxHeap.push(x);
                    this.heapifyMaxHeapFromBottomToTop (this.maxHeap.length);
                }
            } else if (this.maxHeap.length === this.minHeap.length + 1) {
                if (x > this.minHeap[0]) {
                    this.minHeap.push(x);
                    this.heapifyMinHeapFromBottomToTop (this.minHeap.length);
                } else {
                    if (x > this.maxHeap[0]) {
                        this.minHeap.push(x);
                        this.heapifyMinHeapFromBottomToTop (this.minHeap.length);
                    } else {
                        const maxHeapValueToExtract = this.maxHeap[0];
                        this.maxHeap[0] = x;
                        this.heapifyMaxHeapFromTopToBottom(1, this.maxHeap.length);
                        this.minHeap.push(maxHeapValueToExtract);
                        this.heapifyMinHeapFromBottomToTop(this.minHeap.length);
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