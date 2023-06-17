const vertices = 5;
let edges = 0;
let adj = []
const marked = []

for (let i = 0; i < vertices; i++) {
    adj.push([])
    marked.push(false)
}

function addEdge(v,w) {
    adj[v].push(w);
    adj[w].push(v);
    edges++;
}

function showGraph() {
    for (let i = 0; i < vertices; ++i) {
        let output = `${i} -> `;
        for (let j = 0; j < vertices; ++j) {
            if (adj[i][j] != undefined)
            output += `${adj[i][j]} `;
        }
        console.log(output);
    }
}

function dfs(v) {
    console.log('Visited v: ', v)
    marked[v] = true
    for (let i = 0; i < adj[v].length; i++) {
        if (!marked[adj[v][i]]) {
            dfs(adj[v][i])
        }
    }
}

addEdge(0,1)
addEdge(0,2)
addEdge(1,3)
addEdge(2,4)
showGraph()
dfs(0)