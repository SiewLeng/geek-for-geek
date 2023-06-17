class Graph {
    constructor (vertices) {
        this.vertices = vertices;
        this.edges = 0;
        this.adj = []
        this.marked = []
        for (let i = 0; i < this.vertices; i++) {
            this.adj.push([])
            this.marked.push(false)
        }
    }

    addEdge(v,w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    }
    
    showGraph() {
        for (let i = 0; i < this.vertices; ++i) {
            let output = `${i} -> `;
            for (let j = 0; j < this.vertices; ++j) {
                if (this.adj[i][j] != undefined)
                output += `${this.adj[i][j]} `;
            }
            console.log(output);
        }
    }
    
    dfs(v) {
        console.log('Visited v: ', v)
        this.marked[v] = true
        for (let i = 0; i < this.adj[v].length; i++) {
            if (!this.marked[this.adj[v][i]]) {
                this.dfs(this.adj[v][i])
            }
        }
    }

    bfs(s) {
        const queue = []
        queue.push(s)
        this.marked[s] = true
        while(queue.length > 0) {
            const v = queue.shift()
            console.log('Visited v: ', v)
            for (let i = 0; i < this.adj[v].length; i++) {
                const w = this.adj[v][i]
                if (!this.marked[w]) {
                    queue.push(w)
                    this.marked[w] = true
                }
            }
        }

    }
}

g = new Graph(5);
g.addEdge(0,1)
g.addEdge(0,2)
g.addEdge(1,3)
g.addEdge(2,4)
g.showGraph()
// g.dfs(0)
g.bfs(0)