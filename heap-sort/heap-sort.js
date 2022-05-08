// { Driver Code Starts
//Initial Template for javascript

"use strict";

const { throws } = require("assert");

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
    if(arr[i] === -0)
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
    let arr = new Array(n);
    let input_line = readLine().split(" ").map((x) => parseInt(x));
    for(let j = 0;j<n;j++) arr[j] = input_line[j];
    console.log({ input_line: input_line });
    let obj = new Solution();
    obj.heapSort(arr,n);
    printArray(arr,arr.length);
  }
}// } Driver Code Ends


//User function Template for javascript

/**
 *
 * heapify
 * @param {number[]} arr
 * @param {number} n
 * @param {number} i
 *
 * buildHeap
 * @param {number[]} arr
 * @param {number} n 
 * 
 * heapSort
 * @param {number[]} arr
 * @param {number} n
 */
class Solution
{
    //Heapify function to maintain heap property.
    heapify(arr,n,i) {
      let index = i;
      let largest = arr[i - 1];
      if (2 * i <= n && arr[2 * i - 1] > largest) {
        largest =  arr[2 * i - 1];
        index = 2 * i;
      }
      if (2 * i <= n - 1 && arr[2 * i] > largest) {
        largest = arr[2 * i];
        index = 2 * i + 1;
      }
      if (index !== i) {
        arr[index - 1] = arr[i - 1];
        arr[i - 1] = largest;
        this.heapify(arr, n, index);
      }
    }
    
    //Function to build a Heap from array.
    buildHeap(arr,n)
    {
    //code here
      for (let i = Math.floor(n/2); i >=1 ; i--) this.heapify(arr,n,i);
    }
    
    //Function to sort an array using Heap Sort.
    heapSort(arr,n)
    {
    //code here
      let totalLength = n;
      while (totalLength >= 2) {
        this.buildHeap(arr, totalLength);
        const largest = arr[0];
        arr[0] = arr[totalLength - 1];
        arr[totalLength - 1] = largest
        totalLength--;
      }
    }
}