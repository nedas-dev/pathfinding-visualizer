import "babel-polyfill" // this is for babel to work with async/await functions
import './scss/main.scss'
import DepthFirstPaths from './js/algorithms/DepthFirstPaths.js'
import BreadthFirstPaths from './js/algorithms/BreadthFirstPaths.js'
import DijkstraPaths from './js/algorithms/DijkstraPaths.js'
import AStarPaths from './js/algorithms/AStarPaths.js'
import Graph from './js/graphs/Graph.js'
import EdgeWeightedGraph from './js/graphs/EdgeWeightedGraph.js'
import { 
  initializeTable, 
  listenerForTableResizing,
  callbackToActivateWallOrWeightButton,
  callbackToActivateStartOrTargetButton,
  resetVisitedCellCSS,
  handleSidebarOpenClosed,
  callbackForEraseButton,
  resetPathFinder,
  handleIntroductionPage
} from './js/domTraversingFuncs.js'
import StateManager from './js/StateManager.js'
import {START_NODE, TARGET_NODE, WALL_NODE, WEIGHT_NODE, ERASE_BUTTON, SIDEBAR, totalColumns, totalRows, DFS, BFS, DIJKSTRA, ASTAR} from './js/settings.js'

const bodyEl = document.getElementById('body')
const tableEl = document.getElementById('table')
const sidebarEl = document.getElementById(SIDEBAR)

const startButton = document.getElementById('start-button')
const startNodeButton = document.getElementById(START_NODE)
const targetNodeButton = document.getElementById(TARGET_NODE)
const wallNodeButton = document.getElementById(WALL_NODE)
const weightNodeButton = document.getElementById(WEIGHT_NODE)
const eraseCellButton = document.getElementById(ERASE_BUTTON)
const resetButton = document.getElementById('reset-button')
const selectAlgorithmEl = document.getElementById('select-algorithm');

const SM = new StateManager()
const graph = new Graph(totalRows, totalColumns)
const graphWeighted = new EdgeWeightedGraph(totalRows, totalColumns)
let pathFinder = null

initializeTable(tableEl, bodyEl)

window.onload = (e) => {
  document.getElementById('cover').style.display = 'none';
  listenerForTableResizing(tableEl)
}


startNodeButton.addEventListener('click', (e) => {
  callbackToActivateStartOrTargetButton(e, START_NODE, startNodeButton, SM, bodyEl, tableEl, graph, graphWeighted)
})

targetNodeButton.addEventListener('click', (e) => {
  callbackToActivateStartOrTargetButton(e, TARGET_NODE, targetNodeButton, SM, bodyEl, tableEl, graph, graphWeighted)
})

wallNodeButton.addEventListener('click', (e) => {
  callbackToActivateWallOrWeightButton(e, WALL_NODE, wallNodeButton, SM, bodyEl, tableEl, graph, graphWeighted)
})

weightNodeButton.addEventListener('click', (e) => {
  callbackToActivateWallOrWeightButton(e, WEIGHT_NODE, weightNodeButton, SM, bodyEl, tableEl, graph, graphWeighted)
})

eraseCellButton.addEventListener('click', e => callbackForEraseButton(SM, tableEl, bodyEl, graph, graphWeighted))

resetButton.addEventListener('click', () => resetPathFinder(SM, graph, graphWeighted))

function handleStartButton(SM, ){
  if(SM.state(START_NODE).location && SM.state(TARGET_NODE).location){
    resetVisitedCellCSS()
    if(pathFinder !== null){
      pathFinder.cleanUp()
    }
    SM.lockdown = true
    switch(SM.activeAlgorithm){
      case BFS:
        pathFinder = new BreadthFirstPaths(SM, graph);
        break
      case DFS:
        pathFinder = new DepthFirstPaths(SM, graph);
        break
      case DIJKSTRA:
        pathFinder = new DijkstraPaths(SM, graphWeighted);
        break
      case ASTAR:
        pathFinder = new AStarPaths(SM, graphWeighted);
        break
      default:
        throw new Error('selected algorithm does not exist')
    }
  } else{
    alert('Start and Target nodes are required for the pathfinder to start!')
  }
}

startButton.addEventListener('click', async e => {
  if(SM.state(START_NODE).location && SM.state(TARGET_NODE).location){
    resetVisitedCellCSS()
    if(pathFinder !== null){
      pathFinder.cleanUp()
    }
    SM.lockdown = true
    switch(SM.activeAlgorithm){
      case BFS:
        pathFinder = new BreadthFirstPaths(SM, graph);
        break
      case DFS:
        pathFinder = new DepthFirstPaths(SM, graph);
        break
      case DIJKSTRA:
        pathFinder = new DijkstraPaths(SM, graphWeighted);
        break
      case ASTAR:
        pathFinder = new AStarPaths(SM, graphWeighted);
        break
      default:
        throw new Error('selected algorithm does not exist')
    }
  } else{
    alert('Start and Target nodes are required for the pathfinder to start!')
  }
})

selectAlgorithmEl.addEventListener('change', e => {
  if(e.target.id !== 'select-algorithm'){
    return
  }
  let previousAlgo = SM.activeAlgorithm

  switch(previousAlgo){
    case DFS:
      document.querySelector('div.dfs').style.display = 'none'
      break
    case BFS:
      document.querySelector('div.bfs').style.display = 'none'
      break
    case DIJKSTRA:
      document.querySelector('div.dijkstra').style.display = 'none'
      break
    case ASTAR:
      document.querySelector('div.a-star').style.display = 'none'
      break
  }


  SM.activeAlgorithm = e.target.value

  switch(SM.activeAlgorithm){
    case DFS:
      document.querySelector('div.dfs').style.display = 'block'
      break
    case BFS:
      document.querySelector('div.bfs').style.display = 'block'
      break
    case DIJKSTRA:
      document.querySelector('div.dijkstra').style.display = 'block'
      break
    case ASTAR:
      document.querySelector('div.a-star').style.display = 'block'
      break
  }

  if(SM.activeAlgorithm === DFS || SM.activeAlgorithm === BFS){
    SM.changeState('weight_node_available', false)
  } else{
    SM.changeState('weight_node_available', true)
  }

  if((previousAlgo === DIJKSTRA || previousAlgo === ASTAR) && (SM.activeAlgorithm === BFS || SM.activeAlgorithm === DFS)){
    let weightCells = document.querySelectorAll('td.weight-node')
    for(let i = 0; i < weightCells.length; i++){
      let [row, col] = weightCells[i].className.match(/\d+/g)
      graphWeighted.removeWeight(parseInt(row), parseInt(col))
      weightCells[i].classList.remove('weight-node')
    }
  }
})

handleSidebarOpenClosed(SM, tableEl)

handleIntroductionPage()

// prevents pressing on any menu button while the pathfinder is in progress
sidebarEl.addEventListener('click', e => {
  if(e.target.tagName === 'INPUT' || e.target.matches('#arrow-img')){
    return
  }
  if(SM.lockdown){
    e.stopPropagation()
  }
}, true)

// adjusting speed for pathfinder
document.getElementById('speed-input').addEventListener('change', e => {
  if(e.target.tagName !== 'INPUT'){
    return
  }
  let waitTimeInMS = 260 - parseInt(e.target.value)
  SM.waitTime.inLoop = waitTimeInMS
})