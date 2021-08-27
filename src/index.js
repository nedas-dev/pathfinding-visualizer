import "babel-polyfill" // this is for babel to work with async/await functions
import './scss/main.scss'
import DepthFirstPaths from './js/DepthFirstPaths.js'
import Graph from './js/Graph.js'
import { 
  initializeTable, 
  listenerForTableResizing,
  callbackToActivateWallButton,
  callbackToActivateStartOrTargetButton,
  resetVisitedCellCSS,
  resetCellIfOccupied,
  handleSidebarOpenClosed,
  callbackForEraseButton,
  resetPathFinder
} from './js/domTraversingFuncs.js'
import StateManager from './js/StateManager.js'
import {START_NODE, TARGET_NODE, WALL_NODE, SIDEBAR, ERASE_BUTTON, totalColumns, totalRows} from './js/settings.js'

const bodyEl = document.getElementById('body')
const tableEl = document.getElementById('table')
const startNodeButton = document.getElementById('start-node')
const targetNodeButton = document.getElementById('target-node')
const wallNodeButton = document.getElementById('wall-node')
const SM = new StateManager()
const startButton = document.getElementById('start-button')
const eraseCellButton = document.getElementById('erase-button')
const resetButton = document.getElementById('reset-button')
const graph = new Graph(totalRows, totalColumns);

initializeTable(tableEl, bodyEl)
listenerForTableResizing(tableEl)

startNodeButton.addEventListener('click', (e) => { 
  callbackToActivateStartOrTargetButton(e, START_NODE, startNodeButton, SM, bodyEl, tableEl, graph)
})

targetNodeButton.addEventListener('click', (e) => callbackToActivateStartOrTargetButton(e, TARGET_NODE, targetNodeButton, SM, bodyEl, tableEl, graph))

wallNodeButton.addEventListener('click', (e) => {
  callbackToActivateWallButton(e, WALL_NODE, wallNodeButton, SM, bodyEl, tableEl, graph)
})

eraseCellButton.addEventListener('click', e => callbackForEraseButton(SM, tableEl, bodyEl, graph))

resetButton.addEventListener('click', () => resetPathFinder(SM, graph))

startButton.addEventListener('click', e => {
  if(SM.state(START_NODE).location && SM.state(TARGET_NODE).location){
    resetVisitedCellCSS()
    let startCoord = SM.state(START_NODE).location
    let targetCoord = SM.state(TARGET_NODE).location
    let pathFinder = new DepthFirstPaths(graph, startCoord, targetCoord);
  } else{
    alert('Start and Target nodes are required for the path finder to take off!')
  }
})

handleSidebarOpenClosed(SM, tableEl)
