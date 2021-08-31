import "babel-polyfill" // this is for babel to work with async/await functions
import './scss/main.scss'
import DepthFirstPaths from './js/algorithms/DepthFirstPaths.js'
import BreadthFirstPaths from './js/algorithms/BreadthFirstPaths.js'
import Graph from './js/Graph.js'
import { 
  initializeTable, 
  listenerForTableResizing,
  callbackToActivateWallButton,
  callbackToActivateStartOrTargetButton,
  resetVisitedCellCSS,
  handleSidebarOpenClosed,
  callbackForEraseButton,
  resetPathFinder
} from './js/domTraversingFuncs.js'
import StateManager from './js/StateManager.js'
import {START_NODE, TARGET_NODE, WALL_NODE, totalColumns, totalRows, DFS, BFS} from './js/settings.js'

export const bodyEl = document.getElementById('body')
export const tableEl = document.getElementById('table')
export const startNodeButton = document.getElementById('start-node')
export const targetNodeButton = document.getElementById('target-node')
export const wallNodeButton = document.getElementById('wall-node')
export const SM = new StateManager()
export const startButton = document.getElementById('start-button')
export const eraseCellButton = document.getElementById('erase-button')
export const resetButton = document.getElementById('reset-button')
export const graph = new Graph(totalRows, totalColumns);
export let pathFinder = null
export const selectAlgorithmEl = document.getElementById('select-algorithm');
export const sidebarEl = document.getElementById('sidebar')

initializeTable(tableEl, bodyEl)
listenerForTableResizing(tableEl)

startNodeButton.addEventListener('click', (e) => {
  callbackToActivateStartOrTargetButton(e, START_NODE, startNodeButton, SM, bodyEl, tableEl, graph)
})

targetNodeButton.addEventListener('click', (e) => {
  callbackToActivateStartOrTargetButton(e, TARGET_NODE, targetNodeButton, SM, bodyEl, tableEl, graph)
})

wallNodeButton.addEventListener('click', (e) => {
  callbackToActivateWallButton(e, WALL_NODE, wallNodeButton, SM, bodyEl, tableEl, graph)
})

eraseCellButton.addEventListener('click', e => callbackForEraseButton(SM, tableEl, bodyEl, graph))

resetButton.addEventListener('click', () => resetPathFinder(SM, graph))

startButton.addEventListener('click', async e => {
  if(SM.state(START_NODE).location && SM.state(TARGET_NODE).location){
    resetVisitedCellCSS()
    if(pathFinder !== null){
      pathFinder.cleanUp()
    }
    SM.lockdown = true
    switch(SM.activeAlgorithm){
      case BFS:
        pathFinder = new BreadthFirstPaths(SM, graph)
        break
      case DFS:
        pathFinder = new DepthFirstPaths(SM, graph)
        break
      default:
        throw new Error('selected algorithm does not exist')
    }
  } else{
    alert('Start and Target nodes are required for the path finder to start!')
  }
})

selectAlgorithmEl.addEventListener('change', e => {
  if(e.target.id !== 'select-algorithm'){
    return
  }
  SM.activeAlgorithm = e.target.value
})

handleSidebarOpenClosed(SM, tableEl)

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