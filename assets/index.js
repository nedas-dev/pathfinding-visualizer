import DepthFirstPaths from './js/DepthFirstPaths.js'
import Graph from './js/Graph.js'
import { 
  initializeTable, 
  listenerForTableResizing,
  callbackForActiveButton
} from './js/domTraversingFuncs.js'
import StateManager from './js/StateManager.js'
import {START_NODE, TARGET_NODE, WALL_NODE} from './js/settings.js'

const bodyEl = document.getElementById('body')
const tableEl = document.getElementById('table')
const startNode = document.querySelector('.start-node')
const targetNode = document.querySelector('.target-node')
const wallNode = document.querySelector('.wall-node')
const stateManager = new StateManager()

initializeTable(tableEl, bodyEl)
listenerForTableResizing(tableEl)

startNode.addEventListener('click', (e) => callbackForActiveButton(e, START_NODE, startNode, stateManager, bodyEl, tableEl))

targetNode.addEventListener('click', (e) => callbackForActiveButton(e, TARGET_NODE, targetNode, stateManager, bodyEl, tableEl))

wallNode.addEventListener('click', (e) => callbackForActiveButton(e, WALL_NODE, wallNode, stateManager, bodyEl, tableEl))


let graph = new Graph(13);
graph.addEdge(0, 1);
let pathFinder = new DepthFirstPaths(graph, 6);