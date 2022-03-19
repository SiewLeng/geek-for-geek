/*
Given two sorted arrays arr1[] and arr2[] of sizes n and m in non-decreasing order. Merge them in sorted order without using any extra space. Modify arr1 so that it contains the first N elements and modify arr2 so that it contains the last M elements.
*/

/*
Input:
n = 4, arr1[] = [1 3 5 7]
m = 5, arr2[] = [0 2 6 8 9]
Output:
arr1[] = [0 1 2 3]
arr2[] = [5 6 7 8 9]
Explanation:
After merging the two
non-decreasing arrays, we get,
0 1 2 3 5 6 7 8 9.
*/

const arr1 = [7, 9, 9, 10, 11, 11, 13, 14, 17, 19];
const arr2 = [1, 1, 4, 5, 8, 11, 13, 16, 19, 19];

const insertAfterIndexInArray = (index, i, array) => {
  let newArray = new Array(array.length + 1);
  for (let i = 0; i < index + 1; i++) {
    newArray[i] = array[i];
  }
  newArray[index + 1] = i;
  for (let i = index + 1; i < array.length; i++) {
    newArray[i + 1] = array[i];
  }
  return newArray;
}

function merge (arr1, arr2) {
  let mergedSortedArray = [];
  function searchForIndexToInsertInArr2(indexInArr1, startSearchIndexInArr2) {
    let index = null;
    if (arr1[indexInArr1] == arr2[arr2.length - 1]) {
      index = arr2.length - 1;
    } else if (arr1[indexInArr1] > arr2[arr2.length - 1]) {
      index = arr2.length - 1;
    } else if (arr1[indexInArr1] < arr2[0]) {
      index = -1;
    } else {
      if (arr2[startSearchIndexInArr2] == arr1[indexInArr1]) {
         index = startSearchIndexInArr2;
      } else {
        for (let i = startSearchIndexInArr2 + 1; i < arr2.length; i++) {
          if (arr1[indexInArr1] < arr2[i]) {
            index = i - 1;
            break;
          }
        }
      }
    }
    return index;
  }
  function recursion(indexInArr1, startSearchIndexInArr2) {
    if (indexInArr1 == arr1.length) {
      mergedSortedArray = arr2;
      return;
    } else {
      const indexToInsertInArr2 = searchForIndexToInsertInArr2(indexInArr1, startSearchIndexInArr2);
      arr2 = insertAfterIndexInArray(indexToInsertInArr2, arr1[indexInArr1], arr2);
      indexInArr1++;
      startSearchIndexInArr2 = indexToInsertInArr2 + 1;
      recursion(indexInArr1, startSearchIndexInArr2);
    }

  }
  recursion(0, 0, arr2);
  return mergedSortedArray;
}
console.log(merge(arr1, arr2));