// { Driver Code Starts
//Initial Template for javascript

"use strict";

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
      // console.log(Math.floor(obj.getMedian()));
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

    heapifyFromBottomToTop (index, arr) {
      // index = index of array + 1;
      if (index > 1) {
        const parentIndex = Math.floor(index / 2);
        const parentValue = arr[parentIndex - 1];
        const currentValue = arr[index - 1];
        if (currentValue > parentValue) {
          this.swapArray(parentIndex - 1, index - 1, arr);
          this.heapifyFromBottomToTop(parentIndex, arr);
        }
      }
    }

    heapifyFromTopToBottom (index, stopIndex, arr) {
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
        this.heapifyFromTopToBottom(largestValueIndex, stopIndex, arr);
      }
    }

    insertHeap(x)
    {
        // add your code here
        if (this.maxHeap.length === 0 && this.minHeap.length === 0) {
            this.maxHeap.push(x);
        } else if (this.maxHeap.length === 1 && this.minHeap.length === 0) {
            if (x < this.maxHeap[0]) {
                this.minHeap.push(this.maxHeap[0])
                this.maxHeap[0] = x;
            } else {
                this.minHeap.push(x);
            }
        } else {
            if (x > this.minHeap[0]) {
                this.minHeap.push(x);
                this.heapifyFromBottomToTop(this.minHeap.length, this.minHeap);
                this.balanceHeaps();
            } else {
                this.maxHeap.push(x);
                this.heapifyFromBottomToTop(this.maxHeap.length, this.maxHeap);
                this.balanceHeaps();
            }
        }
    }
    
     // Function to balance Heaps
    balanceHeaps()
    {
       // add your code here
       if (this.minHeap.length - this.maxHeap.length == 2) {
            const minHeapValueToExtract = this.minHeap[0];
            this.swapArray(0, this.minHeap.length - 1, this.minHeap);
            this.minHeap.splice(this.minHeap.length - 1, 1);
            this.heapifyFromTopToBottom(1, this.minHeap.length, this.minHeap);
            this.maxHeap.push(minHeapValueToExtract);
            this.heapifyFromBottomToTop(this.maxHeap.length, this.maxHeap);
       } else if (this.maxHeap.length - this.minHeap.length == 2) {
            const maxHeapValueToExtract = this.maxHeap[0];
            this.swapArray(0, this.maxHeap.length - 1, this.maxHeap);
            this.maxHeap.splice(this.maxHeap.length - 1, 1);
            this.heapifyFromTopToBottom(1, this.maxHeap.length, this.maxHeap);
            this.minHeap.push(maxHeapValueToExtract);
            this.heapifyFromBottomToTop(this.minHeap.length, this.minHeap);
       }
    }

    // function to getMedian
    getMedian()
    {
        // add your code here
    } 
}