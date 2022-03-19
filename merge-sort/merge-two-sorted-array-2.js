function merge (arr1, arr2) {
  const recursion = (index) => {
    if (index == arr1.length) {
      return;
    } else {
      if (arr1[index] > arr2[0]) {
        const temp = arr1[index];
        arr1[index] = arr2[0];
        arr2[0] = temp;
        let indexToBeInsertInArr2 = 1;
        while (arr2[0] > arr2[indexToBeInsertInArr2] && indexToBeInsertInArr2 < arr2.length) {
          indexToBeInsertInArr2++;
        }
        if (indexToBeInsertInArr2 > 1) {
          const newArray2 = [];
          for (let i = 1; i < indexToBeInsertInArr2; i++) {
            newArray2.push(arr2[i]);
          }
          newArray2.push(arr2[0]);
          for (let i = indexToBeInsertInArr2; i < arr2.length; i++) {
            newArray2.push(arr2[i]);
          }
          arr2 = newArray2;
        }
      }
      index++;
      recursion(index);
    }
  }
  recursion(0);
  const mergeSortedArray = [];
  for (let i = 0; i < arr1.length; i++) {
    mergeSortedArray.push(arr1[i]);
  }
  for (let i = 0; i < arr2.length; i++) {
    mergeSortedArray.push(arr2[i]);
  }
  return mergeSortedArray;
}

const arr1 = "1 36 39 105 146 154 168 170 204 206 217 219 225 227 272 282 293 300 312 323 328 328 334 335 359 370 383 392 395 396 403 413 422 437 443 448 462 463 465 479 492 496".split(" ");
for (let i = 0; i < arr1.length; i++) {
  arr1[i] = parseInt(arr1[i]);
}
const arr2 = "7 22 30 36 38 38 39 41 42 48 49 83 85 102 107 116 119 124 127 130 140 142 145 149 159 163 165 174 174 191 205 212 224 230 242 246 254 257 258 265 279 289 306 307 309 317 324 334 341 343 351 360 369 371 377 387 391 394 430 431 432 440 443 445 447 455 467 478".split(" ");
for (let i = 0; i < arr2.length; i++) {
  arr2[i] = parseInt(arr2[i]);
}
console.log(merge(arr1, arr2));