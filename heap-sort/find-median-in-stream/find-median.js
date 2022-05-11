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
    array = [];


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
        this.array.push(x);
        this.balanceHeaps();
    }
    
     // Function to balance Heaps
    balanceHeaps()
    {
       // add your code here
       this.heapifyFromBottomToTop(this.array.length, this.array);
    }

    getMedianFromArray(arr) {
      if (arr.length % 2 === 1) {
        const index = (arr.length + 1 ) / 2;
        return arr[index - 1];
      }
      const index = arr.length / 2;
      return ((arr[index - 1] + arr[index]) / 2);
    }

    // function to getMedian
    getMedian()
    {
        // add your code here
        let n = this.array.length;
        const array = [];
        this.array.forEach((item) => {
          array.push(item);
        });
        while (n >= 2) {
          this.swapArray(0, n - 1, array);
          n = n - 1;
          this.heapifyFromTopToBottom(1, n, array);
        }
        console.log(array);
        return this.getMedianFromArray(array);
    } 
}