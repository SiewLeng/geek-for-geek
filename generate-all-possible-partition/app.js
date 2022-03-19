/*
Given a String S, Find all possible Palindromic partitions of the given String.
Input:
S = "geeks"
Output:
g e e k s
g ee k s
Explanation:
All possible palindromic partitions are printed.
*/
class SubStrings {
  constructor(indexOfLastSubString, arrayOfSubString) {
    this.indexOfLastSubString = indexOfLastSubString;
    this.arrayOfSubString = arrayOfSubString;
  }
}

function generateAllPossiblePartitions(string) {
  let result = [new SubStrings(0, [string])];
  let n = 0;
  const newResult = [];
  while (n < 2) {
    for (let i = 0; i < result.length; i++) {
      const noSplitResult = new SubStrings(result[i].indexOfLastSubString + 1, result[i].arrayOfSubString);
      const newArrayOfSubString = [];
      for (let j = 0; j < result[i].arrayOfSubString.length - 1; j++) {
        newArrayOfSubString.push(result[i].arrayOfSubString[j]);
      }
      const lastSubStringIndex = result[i].arrayOfSubString.length - 1;
      const lastSubString = result[i].arrayOfSubString[lastSubStringIndex];
      newArrayOfSubString.push(lastSubString.substring(0, result[i].indexOfLastSubString + 1));
      newArrayOfSubString.push(lastSubString.substring(result[i].indexOfLastSubString + 1));
      const splitResult = new SubStrings(0, newArrayOfSubString);
      newResult.push(noSplitResult);
      newResult.push(splitResult);
    }
    result =  newResult;
    result.forEach((item) => {
      console.log(item.arrayOfSubString);
    });
    n = n + 1;
  }
}

// generateAllPossiblePartitions('abcd');
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