class Vertice {
  constructor (indexOfAjacencyMatrix, name, color, discoveredTime, finishedTime) {
    this.indexOfAjacencyMatrix = indexOfAjacencyMatrix;
    this.name = name;
    this.color = color;
    this.discoveredTime = discoveredTime;
    this.finishedTime = finishedTime;
  }
}

// initialize values
let time = 0;
let vertices = [];
let adjacencyMatrix = null;
let colors = ['white', 'gray', 'black'];

// compare 2 adjacent words
const findFirstDistinctLetterIndex = (word1, word2) => {
  let index = 0;
  let stopIndex = null;
  const maxIndex = word1.length <= word2.length ? word1.length : word2.length;
  const recursionCheck = (index) => {
    if (index == maxIndex) {
      stopIndex = -1
      return;
    } else {
      if (word1.charAt(index) !== word2.charAt(index)) {
        stopIndex = index;
        return;
      } else {
        index++;
        recursionCheck(index);
      }
    }
  }
  recursionCheck(0);
  return stopIndex;
}

// check if vertice with the name is found in vertices array
const isVerticeFound = (name) => {
  let answer = false;
  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i]['name'] == name) {
      answer = true;
      break;
    }
  }
  return answer;
}

const findVertice = (name) => {
  let vertice = null;
  for (let i = 0; i < vertices.length; i++) {
    if (vertices[i]['name'] == name) {
      vertice = vertices[i];
      break;
    }
  }
  return vertice;
}

function createGraph(dict) {
  // construct all the vertices
  for (let i = 0; i < dict.length - 1; i++) {
    // compare 2 adjacent words
    const firstDistinctLetterIndex = findFirstDistinctLetterIndex(dict[i], dict[i+1]);
    if (firstDistinctLetterIndex !== -1) {
      if (!isVerticeFound(dict[i].charAt(firstDistinctLetterIndex))) {
        vertices.push(new Vertice(vertices.length, dict[i].charAt(firstDistinctLetterIndex), colors[0], 0, 0));
      }
      if (!isVerticeFound(dict[i+1].charAt(firstDistinctLetterIndex))) {
        vertices.push(new Vertice(vertices.length, dict[i+1].charAt(firstDistinctLetterIndex), colors[0], 0, 0));
      }
    }
  }

  // construct djacencyMatrix
  adjacencyMatrix = new Array(vertices.length);
  for (let i = 0; i < adjacencyMatrix.length; i++) {
    adjacencyMatrix[i] = [];
  }
  for (let i = 0; i < dict.length - 1; i++) {
    const firstWord = dict[i];
    const secondWord = dict[i+1];
    const firstDistinctLetterIndex = findFirstDistinctLetterIndex(dict[i], dict[i+1]);
    if (firstDistinctLetterIndex !== -1) {
      const firstLetter = dict[i].charAt(firstDistinctLetterIndex);
      const secondLetter = dict[i+1].charAt(firstDistinctLetterIndex);
      const verticeFromFirstLetter = findVertice(firstLetter);
      const verticeFromSecondLetter = findVertice(secondLetter);
      adjacencyMatrix[verticeFromFirstLetter.indexOfAjacencyMatrix].push(verticeFromSecondLetter);
    }
  }
}

function firstVisit(vertice) {
  vertice.color = colors[1];
  time++;
  vertice.discoveredTime = time;
  for (let i = 0; i < adjacencyMatrix[vertice.indexOfAjacencyMatrix].length; i++) {
    if (adjacencyMatrix[vertice.indexOfAjacencyMatrix][i].color == colors[0]) {
      firstVisit(adjacencyMatrix[vertice.indexOfAjacencyMatrix][i]);
    }
  }
  time++;
  vertice.finishedTime = time++;
  vertice.color = colors[2];
  return;
}

const dict = ["baa","abcd","abca","cab","cad"];
// const dict = ["caa","aaa","aab"];
createGraph(dict);
for (let i = 0; i < vertices.length; i++) {
  if (vertices[i].color == colors[0]) {
    firstVisit(vertices[i]);
  }
}
vertices.sort(function (b, a) {
  if (a.finishedTime < b.finishedTime) {
    return -1;
  }
  return a.finishedTime > b.finishedTime ? 1 : 0;
});
const alphabetOrder = [];
vertices.forEach((vertice) => {
  alphabetOrder.push(vertice.name);
})

console.log({ alphabetOrder });