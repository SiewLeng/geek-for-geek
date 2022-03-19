class Vertice {
  constructor (index, name, color, discoveredTime, finishedTime) {
    this.index = index;
    this.name = name;
    this.color = color;
    this.discoveredTime = discoveredTime;
    this.finishedTime = finishedTime;
  }
}

let time = 0;
const colors = ['white', 'gray', 'black']
const vertices = [];
const AdjacencyMatric = []

function createGraph() {
  const names = ['5', '4', '0', '1', '2', '3'];
  for (let i = 0; i < names.length; i++) {
    vertices.push(new Vertice(i, names[i], colors[0], 0, 0));
  }
  const findVerticesByName = (name) => {
    let vertice = null;
    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i].name == name) {
        vertice = vertices[i];
        break
      }
    }
    return vertice;
  }
  /*AdjacencyMatric[0]*/
  AdjacencyMatric.push([findVerticesByName('2'), findVerticesByName('0')]);
  /*AdjacencyMatric[1]*/
  AdjacencyMatric.push([findVerticesByName('0'), findVerticesByName('1')]);
  /*AdjacencyMatric[2]*/
  AdjacencyMatric.push([]);
  /*AdjacencyMatric[3]*/
  AdjacencyMatric.push([]);
  /* AdjacencyMatric[4]*/
  AdjacencyMatric.push([findVerticesByName('3')]);
  /* AdjacencyMatric[5] */
  AdjacencyMatric.push([findVerticesByName('1')]);
}

function DFSVisit(vertice) {
  vertice.color = colors[1];
  time++;
  vertice.discoveredTime = time;
  for (let i = 0; i < AdjacencyMatric[vertice.index].length; i++) {
    if (AdjacencyMatric[vertice.index][i].color == colors[0]) {
      DFSVisit(AdjacencyMatric[vertice.index][i]);
    }
  }
  time++;
  vertice.finishedTime = time;
  vertice.color = colors[2];
  return;
}

createGraph();
for (let i = 0; i < vertices.length; i++) {
  if (vertices[i].color == colors[0]) {
    DFSVisit(vertices[i]);
  }
}
vertices.sort(function(a, b) {
  return b.finishedTime - a.finishedTime;
});

for (let i = 0; i < vertices.length; i++) {
  console.log({
    index: vertices[i].index,
    name: vertices[i].name,
    color: vertices[i].color,
    discoveredTime: vertices[i].discoveredTime,
    finishedTime: vertices[i].finishedTime
  });
}