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
function generateAllPossiblePartitions(string) {
  const allPossiblePartitions = [];
  function generatePartitionsAtLastSubString(indexOfLastSubString, subStringsArray) {
    if (indexOfLastSubString == subStringsArray[subStringsArray.length - 1].length - 1) {
      allPossiblePartitions.push(subStringsArray);
      return;
    }
    const splittedSubStringArray = [];
    for (let i = 0; i < subStringsArray.length - 1; i++) {
      splittedSubStringArray.push(subStringsArray[i]);
    }
    splittedSubStringArray.push(
      subStringsArray[subStringsArray.length - 1].substring(0, indexOfLastSubString + 1)
    );
    splittedSubStringArray.push(
      subStringsArray[subStringsArray.length - 1].substring(indexOfLastSubString + 1)
    );
    generatePartitionsAtLastSubString(0, splittedSubStringArray);
    generatePartitionsAtLastSubString(indexOfLastSubString + 1, subStringsArray);
  }

  const subStringsArray = [string];
  const indexOfLastSubString = 0;
  generatePartitionsAtLastSubString(indexOfLastSubString, subStringsArray);
  return  allPossiblePartitions;
}

function isPalindromic(string) {
  let stopIndex = string.length % 2 == 0 ? string.length / 2 - 1 : (string.length - 1) / 2 - 1;
  let answer = false;
  function checkStringisPalindromicAtIndex(i) {
    if (i == stopIndex + 1) {
      answer = true;
      return
    } else {
      if (string.charAt(i) == string.charAt(string.length - 1 - i)) {
        checkStringisPalindromicAtIndex(i + 1);
      } else {
        answer = false;
        return
      }
    }
  }
  checkStringisPalindromicAtIndex(0, string);
  return answer;
}

function filterAllPossiblePalindromicPartitions(allPossiblePartitions) {
  const allPossiblePalindromicPartitions = [];
  allPossiblePartitions.forEach((item) => {
    let isAllPartitionsPalindromic = true;
    for (let i = 0; i < item.length; i++) {
      if (!isPalindromic(item[i])) {
        isAllPartitionsPalindromic = false;
        break;
      }
    }
    if (isAllPartitionsPalindromic) {
      allPossiblePalindromicPartitions.push(item);
    }
  });
  return allPossiblePalindromicPartitions;
}

const string = 'madam';
const allPossiblePartitions = generateAllPossiblePartitions(string);
const allPossiblePalindromicPartitions = filterAllPossiblePalindromicPartitions(allPossiblePartitions);
console.log({ allPossiblePalindromicPartitions });