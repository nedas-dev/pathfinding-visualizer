export default class Graph {
  constructor(totalRows, totalColumns) {
    this.vertices = [];
    this.rowCount = totalRows; // count of total vertices in the graph
    this.colCount = totalColumns
    this.E = 0; // count of total edges in the graph
    
    this.initializeGraph()
  }

  initializeGraph(){
    let validateCoordinate = (row, column) => {
      if(row < 0 || row >= this.rowCount){
        return false
      }
      if(column < 0 || column >= this.colCount){
        return false
      }
      return true
    }

    for (let i = 0; i < totalRows; i++) {
      let row = []
      for(let j = 0; j < totalColumns; j++){
        let vertex = []
        let possibleNeighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]]
        for(let k = 0; k < possibleNeighbors.length; k++){
          if(this.validateCoordinate(possibleNeighbors[k])){
            vertex.push(possibleNeighbors[k])
          }
        }
        row.push(vertex)
      }
      this.vertices.push(row)
    }
  }

  validateCoordinate(row, column){
    if(row < 0 || row >= this.rowCount){
      return false
    }
    if(column < 0 || column >= this.colCount){
      return false
    }
    return true
  }

  addWall(i, j){
    let possibleNeighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
      if(this.validateCoordinate(coord[0], coord[1])){
        return true
      }
      return false
    })

    for(let k = 0; k < possibleNeighbors.length; k++){
      let neighbors = possibleNeighbors[k]
      let [x, y] = neighbors
      let newArray = this.vertices[x][y].filter(coord => {
        if(coord[0] === i && coord[1] === j){
          return false
        }
        return true
      })
      this.vertices[x][y] = newArray
    }
    this.vertices[i][j] = []
  }

  removeWall(i, j) {
    let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
      if(this.validateCoordinate(coord[0], coord[1])){
        return true
      }
      return false
    })

    for(let k = 0; k < neighbors.length; k++){
      let [x, y] = neighbors[k]
      this.vertices[x][y].push([i, j])
    }
    this.vertices[i][j] = neighbors
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