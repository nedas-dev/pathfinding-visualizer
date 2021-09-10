export default class EdgeWeightedGraph{

    constructor(totalRows, totalColumns, stateManager) {
        this.vertices = [];
        this.totalRows = totalRows; // count of total rows in the table
        this.totalColumns = totalColumns; // count of total columns per row
        this.SM = stateManager;
        this.initializeGraph()
    }
    
    
    initializeGraph(){
        this.vertices = []
        for (let i = 0; i < this.totalRows; i++) {
            let row = []
            for(let j = 0; j < this.totalColumns; j++){
                let vertex = []

                let neighbors = [
                    [i, j - 1],
                    [i, j + 1], 
                    [i - 1, j], 
                    [i + 1, j]].filter(coord => {
                    if(this.validateCoordinate(coord)){
                    return true
                    }
                    return false
                })

                for(let x = 0; x < neighbors.length; x++){
                    let weightedEdgeObj = new WeightedEdge([i,j], neighbors[x], 1.00)
                    vertex.push(weightedEdgeObj)
                }
                row.push(vertex)
            }
            this.vertices.push(row)
        }
    }



    validateCoordinate(coord){ // validating if coordinate is possible (in bound)
        const [row, col] = coord

        if(row < 0 || row >= this.totalRows){
          return false
        }
        if(col < 0 || col >= this.totalColumns){
          return false
        }
        return true
    }
    
    addWall(i, j){ // i - row, j - col
        i = parseInt(i), j = parseInt(j)

        let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
            if(this.validateCoordinate(coord) && this.vertices[coord[0]][coord[1]] !== null){
                return true
            }
            return false
        }, this)

        this.vertices[i][j] = null

        neighbors.forEach(coord => {
            const [x, y] = coord

            this.vertices[x][y] = this.vertices[x][y].filter(weightedEdgeObj => {
                let [row, col] = weightedEdgeObj.to()
                if(row === i && col === j){
                    return false
                }
                return true
            })
        })
    }

    removeWall(i,j){ // i - row, j - column
        i = parseInt(i),  j = parseInt(j)
        
        let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
            let [x, y] = coord
            if(this.validateCoordinate(coord) && this.vertices[x][y] !== null){
                return true
            }
            return false
        }, this)

        neighbors.forEach(coord => {
            let [x, y] = coord
            let weight = null
            if(this.SM.weightNode.location[x][y]){
                weight = 5.00
            } else{
                weight = 1.00
            }
            this.vertices[x][y].push(new WeightedEdge(coord, [i, j], weight))
        })
        this.vertices[i][j] = neighbors.map(toCoord => {
            let weight = null
            if(this.SM.weightNode.location[toCoord[0]][toCoord[1]]){
                weight = 5.00
            } else{
                weight = 1.00
            }
            return new WeightedEdge([i,j], toCoord, weight)
        })
        }

        adj(v) { // v - [rowIndex, colIndex]
            // returns all neighbors of given v (who has an edge with v)
            if (v === null || v === undefined || v[0] < 0 || v[0] >= this.totalRows|| v[1] >= this.totalColumns || v[1] < 0) {
                throw new Error("v is not valid (adj(v))");
            }
        return this.vertices[v[0]][v[1]];
    }

    addWeight(i, j){ // i - row, j - col
        i = parseInt(i), j = parseInt(j)

        if(this.SM.weightNode.location[i][j]){
            return
        } else{
            this.SM.weightNode.location[i][j] = true
        }

        let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
            if(this.validateCoordinate(coord) && this.vertices[coord[0]][coord[1]] !== null){
                return true
            }
            return false
        }, this)

        this.vertices[i][j].forEach(weightedEdgeObj => {
            let [row, col] = weightedEdgeObj.to()
            if(this.SM.weightNode.location[row][col]){
                weightedEdgeObj.weight = 5.00
            } else{
                weightedEdgeObj.weight = 1.00
            }
        })

        neighbors.forEach(coord => {
            const [x, y] = coord

            this.vertices[x][y].forEach(weightedEdgeObj => {
                let vertex1 = weightedEdgeObj.from()
                let vertex2 = weightedEdgeObj.to()
                if(vertex1[0] === i && vertex1[1] === j){
                    weightedEdgeObj.weight = 5.00
                    return
                }
                if(vertex2[0] === i && vertex2[1] === j){
                    weightedEdgeObj.weight = 5.00
                    return
                }
            })
        })
    }

    removeWeight(i, j){ // i - row, j - col
        i = parseInt(i), j = parseInt(j)

        if(!this.SM.weightNode.location[i][j]){
            return
        } else{
            this.SM.weightNode.location[i][j] = false
        }

        let neighbors = [[i, j - 1], [i, j + 1], [i - 1, j], [i + 1, j]].filter(coord => {
            if(this.validateCoordinate(coord) && this.vertices[coord[0]][coord[1]] !== null){
                return true
            }
            return false
        }, this)

        neighbors.forEach(coord => {
            const [x, y] = coord
            this.vertices[x][y].forEach(weightedEdgeObj => {
                let [row, col] = weightedEdgeObj.to()
                if(row === i && col === j){
                    if(this.SM.weightNode.location[row][col]){
                        weightedEdgeObj.weight = 5.00
                    } else{
                        weightedEdgeObj.weight = 1.00
                    }
                    return
                }
            })
        })
    }


}


class WeightedEdge{
    constructor(v, w, weight){
        this.v = v // one coordinate
        this.w = w // another coordinate
        this.weight = weight // that edge's weight
    }

    from(){
        return this.v
    }

    to(){
        return this.w
    }

    // compareTo(that){
    //     if(this.weight < that.weight){
    //         return -1
    //     } else if (this.weight > that.weight){
    //         return 1
    //     } else{
    //         return 0
    //     }
    // }

    getWeight(){
        return this.weight
    }
}