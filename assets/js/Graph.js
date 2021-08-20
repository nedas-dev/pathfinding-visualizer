export default class Graph {
  constructor(totalVertices) {
    this.vertices = [];
    this.V = totalVertices; // count of total vertices in the graph
    this.E = 0; // count of total edges in the graph
    for (let i = 0; i < totalVertices; i++) {
      this.vertices.push([]);
    }
  }

  addEdge(a, b) {
    if (a < 0 || b < 0 || a >= this.V || b >= this.V) {
      throw new Error("a or b is not valid");
    }
    this.vertices[a].push(b);
    this.vertices[b].push(a);
    this.E++;
  }

  adj(v) {
    // returns all adjacent vertices to v (who has an edge with v)
    if (v === null || v === undefined || v < 0 || v >= this.V) {
      throw new Error("v is not valid (adj(v))");
    }
    return this.vertices[v];
  }

  toString() {
    for (let i = 0; i < this.V; i++) {
      for (let j = 0; j < this.vertices[i].length; j++) {
        console.log(`${i} --> ${this.vertices[i][j]}`);
      }
    }
  }
}