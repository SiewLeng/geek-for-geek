const solutions = [];
function generateBinaryCombination(index, array) {
  if (index == array.length) {
    solutions.push(array);
    return;
  }
  array[index] = 0;
  generateBinaryCombination(index + 1, array);
  array[index] = 1;
  generateBinaryCombination(index + 1, array);
}

generateBinaryCombination(0, [null, null, null]);
solutions.forEach((item) => {
  console.log(item);
});