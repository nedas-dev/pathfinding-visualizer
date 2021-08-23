export default class Graph {
  constructor(totalRows, totalColumns) {
    this.vertices = [];
    this.totalRows = totalRows; // count of total vertices in the graph
    this.totalColumns = totalColumns
    // this.E = 0; // count of total edges in the graph
    
    this.initializeGraph()
  }

  initializeGraph(){
    for (let i = 0; i < this.totalRows; i++) {
      let row = []
      for(let j = 0; j < this.totalColumns; j++){
        let vertex = []

        let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
          if(this.validateCoordinate(coord[0], coord[1])){
            return true
          }
          return false
        })

        for(let x = 0; x < neighbors.length; x++){
          vertex.push(neighbors[x])
        }
        row.push(vertex)
      }
      this.vertices.push(row)
    }
  }

  validateCoordinate(row, column){
    if(row < 0 || row >= this.totalRows){
      return false
    }
    if(column < 0 || column >= this.totalColumns){
      return false
    }
    return true
  }

  addWall(i,j){ // i - row, j - col
    i = parseInt(i)
    j = parseInt(j)
    let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
      if(this.validateCoordinate(coord[0], coord[1]) && this.vertices[coord[0]][coord[1]] !== null){
        return true
      }
      return false
    }, this)

    this.vertices[i][j] = null

    neighbors.forEach(coord => {
      let [x, y] = coord
      x = parseInt(x)
      y = parseInt(y)
      this.vertices[x][y] = this.vertices[x][y].filter(coord => {
        let [r, c] = coord
        r = parseInt(r)
        c = parseInt(c)
        if(r === i && c === j){
          return false
        }
        return true
      })
    })
  }

  removeWall(i,j){ // i - row, j - column
    i = parseInt(i)
    j = parseInt(j)
    let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
      let [x, y] = coord
      x = parseInt(x)
      y = parseInt(y)
      if(this.validateCoordinate(x, y) && this.vertices[x][y] !== null){
        return true
      }
      return false
    }, this)

    neighbors.forEach(coord => {
      let [x, y] = coord
      x = parseInt(x)
      y = parseInt(y)
      this.vertices[x][y].push([i,j])
    })
    this.vertices[i][j] = neighbors
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
