import {TARGET_NODE, START_NODE} from '../settings'
import {
  activateSpecificButtonCSS, 
  deactivateSpecificButtonCSS,
  resetVisitedCellCSS
} from '../domTraversingFuncs'

export default class DepthFirstPaths {
    constructor(SM, graphObj) {
      this.edgeTo = [];
      this.marked = [];
      this.SM = SM;
      this.graphObj = graphObj;
      this.removeEventListeners = []

      this.initialize();

      (async() => {
        await this.dfs();
        await this.pathTo()
        this.allowRelocateTargetNode()
        this.SM.lockdown = false;
      })();
    }

    cleanUp(){ // method for cleaning up before selecting another algorithm
      for(let i = 0; i < this.removeEventListeners.length; i++){
        this.removeEventListeners[i]()
      }
    }

    // allowing to move target node (fast-forwards and shows the new found path without any animations and extra time)
    allowRelocateTargetNode(){
      let callbackForMouseDown = e => {
        let callbackForMouseMove = e => {
          if(e.target.tagName !== 'TD'){
            return
          }
          if(e.target.matches('.wall-node') || e.target.matches('.start-node')){
            return
          }
          
          let [row, col] = e.target.className.match(/\d+/g)
          let target_location = [parseInt(row), parseInt(col)]
          if(parseInt(row) === this.SM.state(TARGET_NODE).location[0] && parseInt(col) === this.SM.state(TARGET_NODE).location[1]){
            return
          }
          document.querySelector(`td.${TARGET_NODE}`).classList.remove(TARGET_NODE)
          e.target.classList.add(TARGET_NODE)
          this.SM.state(TARGET_NODE).location = target_location
          this.fastDfs()
          this.fastPathTo()
        }
        if(!this.SM.state(START_NODE).location || !this.SM.state(TARGET_NODE).location){
          return
        }

        if(![...e.target.classList].includes(TARGET_NODE)){
          return
        }
        const bodyEl = document.getElementById('body')
        const tableEl = document.getElementById('table')
        const targetNodeButton = document.getElementById(TARGET_NODE)
        activateSpecificButtonCSS(TARGET_NODE, bodyEl, targetNodeButton, tableEl)
        document.addEventListener('mousemove', callbackForMouseMove)
        document.addEventListener('mouseup', e => {
          deactivateSpecificButtonCSS(TARGET_NODE, bodyEl, targetNodeButton, tableEl)
          document.removeEventListener('mousemove', callbackForMouseMove)
        }, {once: true})
      }

      document.addEventListener('mousedown', callbackForMouseDown)
      this.removeEventListeners.push(() => {document.removeEventListener('mousedown', callbackForMouseDown)})
    }

    initialize(){
      this.edgeTo = []
      this.marked = []
      let totalRows = this.SM.totalRows
      let totalColumns = this.SM.totalColumns

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
    }

    async dfs() {
      let start_location = [...this.SM.state(START_NODE).location]
      let target_location = [...this.SM.state(TARGET_NODE).location]

      const dfsInside = async(s) => {
        if(!this.marked[target_location[0]][target_location[1]]){
          await new Promise(resolve => setTimeout(resolve, this.SM.waitTime.inLoop))
          document.querySelector(`td.cell-${s[0]}-${s[1]}`).classList.add('visited')
        }
        this.marked[s[0]][s[1]] = true
        let neighborList = this.graphObj.vertices[s[0]][s[1]]
        for(let i = 0; i < neighborList.length; i++){
          let rowIndex = neighborList[i][0]
          let colIndex = neighborList[i][1]
          if(!this.marked[rowIndex][colIndex]){
            this.edgeTo[rowIndex][colIndex] = [s[0], s[1]]
            await dfsInside(neighborList[i])
          }
      }
      }
      await dfsInside(start_location)
    }

    fastDfs() {
      this.initialize()
      resetVisitedCellCSS()
      let start_location = [...this.SM.state(START_NODE).location]
      let target_location = [...this.SM.state(TARGET_NODE).location]
      
      const dfsInside = async(s) => {
        if(!this.marked[target_location[0]][target_location[1]]){
          document.querySelector(`td.cell-${s[0]}-${s[1]}`).classList.add('visited-no-animation')
        }
        this.marked[s[0]][s[1]] = true
        let neighborList = this.graphObj.vertices[s[0]][s[1]]
        for(let i = 0; i < neighborList.length; i++){
          let rowIndex = neighborList[i][0]
          let colIndex = neighborList[i][1]
          if(!this.marked[rowIndex][colIndex]){
            this.edgeTo[rowIndex][colIndex] = [s[0], s[1]]
            dfsInside(neighborList[i])
          }
        }
      }
      dfsInside(start_location)
    }
  
    async pathTo() {
      let start_location = [...this.SM.state(START_NODE).location]
      let i = [...this.SM.state(TARGET_NODE).location]

      if(this.edgeTo[i[0]][i[1]] === null){
        return
      }

      while(true){
        document.querySelector(`td.cell-${i[0]}-${i[1]}`).classList.add('path-node')
        if(start_location[0] === i[0] && start_location[1] === i[1]){
          break
        }
        i = this.edgeTo[i[0]][i[1]]
        await new Promise(resolve => setTimeout(resolve, this.SM.waitTime.inLoop))
      }
    }

    fastPathTo() {
      let start_location = [...this.SM.state(START_NODE).location]
      let i = [...this.SM.state(TARGET_NODE).location]

      if(this.edgeTo[i[0]][i[1]] === null){
        return
      }
      while(true){
        let cell = document.querySelector(`td.cell-${i[0]}-${i[1]}`)
        cell.classList.add('path-node-no-animation')
        if(start_location[0] === i[0] && start_location[1] === i[1]){
          break
        }
        i = this.edgeTo[i[0]][i[1]]
      }
    }
}