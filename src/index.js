import "babel-polyfill" // this is for babel to work with async/await functions
import './scss/main.scss'
import DepthFirstPaths from './js/DepthFirstPaths.js'
import Graph from './js/Graph.js'
import { 
  initializeTable, 
  listenerForTableResizing,
  callbackToActivateWallButton,
  callbackToActivateStartOrTargetButton,
  resetVisitedCSS
} from './js/domTraversingFuncs.js'
import StateManager from './js/StateManager.js'
import {START_NODE, TARGET_NODE, WALL_NODE, totalColumns, totalRows} from './js/settings.js'

const bodyEl = document.getElementById('body')
const tableEl = document.getElementById('table')
const startNodeButton = document.getElementById('start-node')
const targetNodeButton = document.getElementById('target-node')
const wallNodeButton = document.getElementById('wall-node')
const stateManager = new StateManager()
const startButton = document.getElementById('start-button')
const resetButton = document.getElementById('reset-button')

initializeTable(tableEl, bodyEl)
listenerForTableResizing(tableEl)

startNodeButton.addEventListener('click', (e) => callbackToActivateStartOrTargetButton(e, START_NODE, startNodeButton, stateManager, bodyEl, tableEl, graph))

targetNodeButton.addEventListener('click', (e) => callbackToActivateStartOrTargetButton(e, TARGET_NODE, targetNodeButton, stateManager, bodyEl, tableEl, graph))

wallNodeButton.addEventListener('click', (e) => callbackToActivateWallButton(e, WALL_NODE, wallNodeButton, stateManager, bodyEl, tableEl, graph))


bodyEl.addEventListener('dblclick', e => {
  console.log('start node', stateManager.startNode)
  console.log('target node', stateManager.targetNode)
  console.log(graph.vertices)
  console.log(stateManager)
})

let graph = new Graph(totalRows, totalColumns);

startButton.addEventListener('click', e => {
  if(stateManager.state(START_NODE).location && stateManager.state(TARGET_NODE).location){
    resetVisitedCSS()
    let startCoord = stateManager.state(START_NODE).location
    let targetCoord = stateManager.state(TARGET_NODE).location
    let pathFinder = new DepthFirstPaths(graph, startCoord, targetCoord);
  } else{
    alert('Start and Target nodes are required for the path finder to take off!')
  }
})