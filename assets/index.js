import DepthFirstPaths from './js/DepthFirstPaths.js'
import Graph from './js/Graph.js'
import { 
  initializeTable, 
  listenerForTableResizing,
  callbackToActivateWallButton,
  callbackToActivateStartOrTargetButton
} from './js/domTraversingFuncs.js'
import StateManager from './js/StateManager.js'
import {START_NODE, TARGET_NODE, WALL_NODE, totalColumns, totalRows} from './js/settings.js'

const bodyEl = document.getElementById('body')
const tableEl = document.getElementById('table')
const startNodeButton = document.getElementById('start-node')
const targetNodeButton = document.getElementById('target-node')
const wallNodeButton = document.getElementById('wall-node')
const stateManager = new StateManager()

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

let graph = new Graph(totalColumns, totalRows);
// graph.addWall(5,5)
// graph.addEdge(0, 1);
// let pathFinder = new DepthFirstPaths(graph, 6);