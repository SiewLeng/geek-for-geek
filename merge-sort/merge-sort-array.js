/*
    const array = [3, 5, 2, 4, 1];
    After merge sort the array, the output should be [1, 2, 3, 4, 5];
    Note: If the length of array is odd, then the extra node should go in the first array while splitting.
*/

function merge(A, p, q, r) {
    const leftArray = [];
    const rightArray = [];
    for (let i = p; i <= q; i++) {
        leftArray.push(A[i - 1]);
    }
    leftArray.push(null);
    for (let i = q + 1; i <= r; i++) {
        rightArray.push(A[i - 1]);
    }
    rightArray.push(null);
    let i = 0;
    let j = 0;
    let k = p;
    while (leftArray[i] !== null && rightArray[j] !== null) {
      if (leftArray[i] <=  rightArray[j]) {
          A[k - 1] = leftArray[i];
          i++;
      } else {
          A[k - 1] = rightArray[j];
          j++;
      }
      k++;
    }
    if (leftArray[i] !== null) {
        while(leftArray[i] !== null) {
            A[k - 1] = leftArray[i];
            i++;
            k++;
        }
    } else {
        while(rightArray[j] !== null) {
            A[k - 1] = rightArray[j];
            j++;
            k++;
        }
    }
}

function mergeSort(A, p, r) {
    if (p < r) {
        const lengthOfRigthArray = Math.floor((r - p + 1) / 2);
        const lenghtOfLeftArray = (r - p + 1) - lengthOfRigthArray;
        const q = p + lenghtOfLeftArray - 1;
        mergeSort(A, p, q);
        mergeSort(A, q + 1, r);
        merge(A, p, q, r);
    }
}

const A = [67, 34, 0, 69, 24, 78];
const p = 1;
const r = A.length;
mergeSort(A, p, r);
console.log(A);