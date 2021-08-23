export default class DepthFirstPaths {
    constructor(graphObj, source) {
      this.s = source; /* s - starting vertex point*/
      this.edgeTo = [];
      this.marked = [];
  
      for (let i = 0; i < graphObj.V; i++) {
        this.edgeTo.push(null);
        this.marked.push(false);
      }
  
      this.dfs(graphObj, source);
    }
  
    dfs(graphObj, source) {
      this.marked[source] = true;
      let adjList = graphObj.adj(source);
      for (let i = 0; i < adjList.length; i++) {
        if (!this.marked[adjList[i]]) {
          this.edgeTo[adjList[i]] = source;
          this.dfs(graphObj, adjList[i]);
        }
      }
    }
  
    hasPathTo(v) {
      // is there a path from this.source to v?
      if (v < 0 || v >= this.marked.length) {
        throw new Error("v is not valid (hasPathTo(v))");
      }
      if (this.marked[v]) {
        return true;
      }
      return false;
    }
  
    pathTo(v) {
      if (v < 0 || v >= this.marked.length) {
        throw new Error("v is not valid (pathTo(v))");
      }
      if (!this.marked[v]) {
        return null;
      }
      let path = [];
      for (let i = v; i != this.s; i = this.edgeTo[i]) {
        path.push(i);
      }
      path.push(this.s);
      return path;
    }
}