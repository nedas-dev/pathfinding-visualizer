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
        await this.bfs();
        await this.pathTo()
        this.allowRelocateTargetNode()
        this.SM.lockdown = false;
      })();
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
          this.fastBfs()
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

    async bfs() {
      let start_location = [...this.SM.state(START_NODE).location]
      let target_location = [...this.SM.state(TARGET_NODE).location]

      const queue = [[...start_location]]
      this.marked[queue[0][0]][queue[0][1]] = true
      const vertices = this.graphObj.vertices
      let foundTarget = false
      while(queue.length > 0){
        let currentNode = queue.pop()
        let neighborsList = vertices[currentNode[0]][currentNode[1]]
        for(let i = 0; i < neighborsList.length; i++){
          let [x, y] = neighborsList[i]
          if(this.marked[x][y]){
            continue
          }
          if(!foundTarget){
            await new Promise(resolve => setTimeout(resolve, this.SM.waitTime.inLoop))
            document.querySelector(`td.cell-${x}-${y}`).classList.add('visited')
          }
          this.marked[x][y] = true
          this.edgeTo[x][y] = [currentNode[0], currentNode[1]]
          queue.unshift([x, y])
          if(target_location[0] === x && target_location[1] === y){
            foundTarget = true
          }
        }
      }
    }

    fastBfs() {
      this.initialize()
      resetVisitedCellCSS()
      let start_location = [...this.SM.state(START_NODE).location]
      let target_location = [...this.SM.state(TARGET_NODE).location]

      const queue = [[...start_location]]
      this.marked[queue[0][0]][queue[0][1]] = true
      const vertices = this.graphObj.vertices
      let foundTarget = false
      while(queue.length > 0){
        let currentNode = queue.pop()
        let neighborsList = vertices[currentNode[0]][currentNode[1]]
        for(let i = 0; i < neighborsList.length; i++){
          let [x, y] = neighborsList[i]
          if(this.marked[x][y]){
            continue
          }
          if(!foundTarget){
            let cell = document.querySelector(`td.cell-${x}-${y}`)
            cell.classList.add('visited-no-animation')
          }
          this.marked[x][y] = true
          this.edgeTo[x][y] = [currentNode[0], currentNode[1]]
          queue.unshift([x, y])
          if(target_location[0] === x && target_location[1] === y){
            foundTarget = true
          }
        }
      }
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