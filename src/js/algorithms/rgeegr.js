import {totalRows, totalColumns} from '../settings'

export default class DepthFirstPaths {
    constructor(stateManager, graphObj, start_location, target_location) {
      this.start_location = start_location; /* starting vertex point*/
      this.target_location = target_location // target vertex point
      this.edgeTo = [];
      this.marked = [];
      this.stateManager = stateManager

      for (let i = 0; i < totalRows; i++) {
        let row1 = []
        let row2 = []
        for(let j = 0; j < totalColumns; j++){
          row1.push(null)
          row2.push(false)
        }
        this.edgeTo.push(row1)
        this.marked.push(row2)
      }
      (async() => {
        await this.dfs(graphObj, start_location);
        await this.pathTo(target_location)
      })()
    }
  
    async dfs(graphObj, s) {
      if(!this.marked[this.target_location[0]][this.target_location[1]]){
        await new Promise(resolve => setTimeout(resolve, this.stateManager.waitTime.inLoop))
        document.querySelector(`td.cell-${s[0]}-${s[1]}`).classList.add('visited')
      }
      this.marked[s[0]][s[1]] = true
      let neighborList = graphObj.vertices[s[0]][s[1]]
      for(let i = 0; i < neighborList.length; i++){
        let rowIndex = neighborList[i][0]
        let colIndex = neighborList[i][1]
        if(!this.marked[rowIndex][colIndex]){
          this.edgeTo[rowIndex][colIndex] = [s[0], s[1]]
          await this.dfs(graphObj, neighborList[i])
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
  
    async pathTo(target_location) {
      let i = target_location
      if(this.edgeTo[i[0]][i[1]] === null){
        return
      }
      while(true){
        document.querySelector(`td.cell-${i[0]}-${i[1]}`).classList.add('path-node')
        if(this.start_location[0] === i[0] && this.start_location[1] === i[1]){
          break
        }
        i = this.edgeTo[i[0]][i[1]]
        await new Promise(resolve => setTimeout(resolve, this.stateManager.waitTime.inLoop))
      }
    }
}