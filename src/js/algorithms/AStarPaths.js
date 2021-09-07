import {START_NODE, TARGET_NODE} from '../settings';
import {
    activateSpecificButtonCSS, 
    deactivateSpecificButtonCSS,
    resetVisitedCellCSS
  } from '../domTraversingFuncs'

export default class DijkstraPaths{
    constructor(stateManager, edgeWeightedGraph){
        this.edgeTo = [];
        this.distTo = [];
        this.marked = [];
        this.pq = new MinPQ()
        this.edgesGraph = edgeWeightedGraph;
        this.SM = stateManager;
        this.removeEventListeners = [];

        (async () => {
            this.initialize()
            await this.djikstra()
            await this.pathTo()
            this.SM.lockdown = false
            this.allowRelocateTargetNode()
        })()
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
            if(e.target.matches('.wall-node') || e.target.matches('.start-node') || e.target.matches('.weight-node')){
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
            this.fastDjikstra()
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
        this.distTo = []
        this.marked = []
        this.pq = new MinPQ()

        let totalRows = this.SM.totalRows
        let totalColumns = this.SM.totalColumns
  
        for (let i = 0; i < totalRows; i++) {
          let row1 = []
          let row2 = []
          let row3 = []
          for(let j = 0; j < totalColumns; j++){
            row1.push(null)
            row2.push(Number.MAX_SAFE_INTEGER)
            row3.push(false)
          }

          this.edgeTo.push(row1)
          this.distTo.push(row2)
          this.marked.push(row3)
        }
    }

    hDistance(current_coord, target_coord){ // distance from curr to target (heuristic)
        let xDiff = Math.abs(target_coord[0] - current_coord[0])
        let yDiff = Math.abs(target_coord[1] - current_coord[1])
        return xDiff + yDiff
    }

    relaxEdge(edgeObj){
        let target_coord = this.SM.state(TARGET_NODE).location
        let fromCoord = edgeObj.from()
        let toCoord = edgeObj.to()
        if(this.distTo[toCoord[0]][toCoord[1]] > this.distTo[fromCoord[0]][fromCoord[1]] + edgeObj.getWeight()){
            this.distTo[toCoord[0]][toCoord[1]] = this.distTo[fromCoord[0]][fromCoord[1]] + edgeObj.getWeight()
            this.edgeTo[toCoord[0]][toCoord[1]] = edgeObj
            if(this.pq.contains(toCoord)){
                this.pq.decreaseKey(toCoord, this.distTo[fromCoord[0]][fromCoord[1]] + edgeObj.getWeight() + this.hDistance(toCoord, target_coord))
            } else{
                this.pq.insert(this.distTo[fromCoord[0]][fromCoord[1]] + edgeObj.getWeight() + this.hDistance(toCoord, target_coord), toCoord)
            }
        }
    }
    
    async djikstra(){
        let start_coord = this.SM.state(START_NODE).location
        let target_coord = this.SM.state(TARGET_NODE).location
        this.pq.insert(0.0 + this.hDistance(start_coord, target_coord), start_coord)
        this.distTo[start_coord[0]][start_coord[1]] = 0.0
        while(this.pq.size() > 0){
            let minVertex = this.pq.delMin()
            if(!this.marked[target_coord[0]][target_coord[1]]){
                await new Promise(resolve => setTimeout(resolve, this.SM.waitTime.inLoop))
                document.querySelector(`td.cell-${minVertex[0]}-${minVertex[1]}`).classList.add('visited')
            }
            this.marked[minVertex[0]][minVertex[1]] = true
            let edges = this.edgesGraph.vertices[minVertex[0]][minVertex[1]]
            for (let i = 0; i < edges.length; i++){
                this.relaxEdge(edges[i])
            }
        }
    }

    fastDjikstra(){
        this.initialize()
        resetVisitedCellCSS()
        let start_coord = this.SM.state(START_NODE).location
        let target_coord = this.SM.state(TARGET_NODE).location
        this.pq.insert(0.0 + this.hDistance(start_coord, target_coord), start_coord)
        this.distTo[start_coord[0]][start_coord[1]] = 0.0
        while(this.pq.size() > 0){
            let minVertex = this.pq.delMin()
            if(!this.marked[target_coord[0]][target_coord[1]]){
                document.querySelector(`td.cell-${minVertex[0]}-${minVertex[1]}`).classList.add('visited-no-animation')
            } else{
                break
            }
            this.marked[minVertex[0]][minVertex[1]] = true
            let edges = this.edgesGraph.vertices[minVertex[0]][minVertex[1]]
            for (let i = 0; i < edges.length; i++){
                this.relaxEdge(edges[i])
            }
        }
    }

    async pathTo(){
        let start_coord = this.SM.state(START_NODE).location
        let target_coord = this.SM.state(TARGET_NODE).location
        let currentCoord = target_coord
        
        if(this.edgeTo[target_coord[0]][target_coord[1]] === null){
            return
        }

        while(currentCoord !== null){
            if(this.edgeTo[currentCoord[0]][currentCoord[1]] === null){
                break
            }
            await new Promise(resolve => setTimeout(resolve, this.SM.waitTime.inLoop))
            document.querySelector(`td.cell-${currentCoord[0]}-${currentCoord[1]}`).classList.add('path-node')
            currentCoord = this.edgeTo[currentCoord[0]][currentCoord[1]].from()
        }
        document.querySelector(`td.cell-${start_coord[0]}-${currentCoord[1]}`).classList.add('path-node')
    }

    fastPathTo(){
        let start_coord = this.SM.state(START_NODE).location
        let target_coord = this.SM.state(TARGET_NODE).location
        let currentCoord = target_coord
        
        if(this.edgeTo[target_coord[0]][target_coord[1]] === null){
            return
        }

        while(currentCoord !== null){
            if(this.edgeTo[currentCoord[0]][currentCoord[1]] === null){
                break
            }
            document.querySelector(`td.cell-${currentCoord[0]}-${currentCoord[1]}`).classList.add('path-node-no-animation')
            currentCoord = this.edgeTo[currentCoord[0]][currentCoord[1]].from()
        }
        document.querySelector(`td.cell-${start_coord[0]}-${currentCoord[1]}`).classList.add('path-node-no-animation')
    }
}

class MinPQ{
    constructor(){
      this.pq = [null]
    }
  
    insert(dist, coord){
        this.pq.push([dist, coord])
        this._swim(this.pq.length - 1)
    }
  
    delMin(){
      if(this.pq.length === 1){
        return null
      }
      this._exchange(1, this.pq.length - 1)
      const min = this.pq.pop()[1]
      this._sink(1)
      return min
    }
  
    _sink(k){ // k - index of the item
      while(2 * k < this.pq.length){
        let j = 2 * k
        if(j < this.pq.length-1 && this.pq[j][0] > this.pq[j+1][0]){
          j++
        }
        if(this.pq[k][0] < this.pq[j][0]){
          break
        }
        this._exchange(k, j)
        k = j
      }
    }
  
    _swim(k){ // k - index
      while(k > 1 && this.pq[k][0] <= this.pq[Math.floor(k/2)][0]){
        this._exchange(k, Math.floor(k/2))
        k = Math.floor(k/2)
      }
    }
  
    _exchange(i, j){
      let temp = this.pq[i]
      this.pq[i] = this.pq[j]
      this.pq[j] = temp
    }
    
    size(){
        return this.pq.length - 1
    }

    contains(coord){
        for(let i = 1; i < this.pq.length; i++){
            let from = this.pq[i][1]
            if(from[0] === coord[0] && from[1] === coord[1]){
                return true
            }
        }
        return false
    }

    decreaseKey(coord, dist){
        for(let i = 1; i < this.pq.length; i++){
            let currentCoordinate = this.pq[i][1]
            if(currentCoordinate[0] === coord[0] && currentCoordinate[1] === coord[1]){
                if(this.pq[i][0] > dist){
                    this.pq[i][0] = dist
                    this._swim(i)
                }
                return
            }
        }
        throw new Error('decreaseKey couldnt find the key')
    }
}