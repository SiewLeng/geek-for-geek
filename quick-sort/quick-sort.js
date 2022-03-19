function partition(arr, p, r) {
  let i = p - 1;
  for (let j = p; j < r; j++) {
    if (arr[j] <= arr[r]) {
      i++;
      let temp1 = arr[j];
      arr[j] = arr[i];
      arr[i] = temp1;
    }
  }
  let temp2 = arr[i + 1];
  arr[i + 1] = arr[r];
  arr[r] = temp2;
  return(i + 1);
};

function quickSort(arr, p, r) {
  if (p < r) {
    let q = partition(arr, p, r);
    quickSort(arr, p, q - 1);
    quickSort(arr, q + 1, r);
  }
}

const arr = "2 8 7 1 3 5 6 4".split(" ");
for (let i = 0; i < arr.length; i++) {
  arr[i] = parseInt(arr[i]);
}

quickSort(arr, 0, arr.length - 1);
console.log({ arr });