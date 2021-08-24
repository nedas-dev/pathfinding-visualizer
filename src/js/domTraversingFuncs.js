import Graph from './Graph.js'
import {START_NODE, TARGET_NODE, WALL_NODE, totalRows, totalColumns} from './settings.js'

export function initializeTable(tableEl, bodyEl){ // adds table rows and columns (tr, td)
  for(let i = 0; i < totalRows; i++){
      let tr = document.createElement('tr')
      tr.className = `row row-${i}`
      for(let j = 0; j < totalColumns; j++){
          let td = document.createElement('td')
          td.className = `col cell-${i}-${j}`
          tr.appendChild(td)
      }
      tableEl.appendChild(tr)
  }
  bodyEl.appendChild(tableEl)
}

export function listenerForTableResizing(tableEl){ // to maintain table's ratio of 2:1 (for the cells to be equal size no matter of how wide or tall it is)
  window.onload = () => {
      let width = tableEl.clientWidth
      tableEl.style.height = width * 0.50

  window.addEventListener('resize', () => {
    let width = tableEl.clientWidth
    tableEl.style.height = width * 0.50
  })
  }
}
export function callbackToActivateStartOrTargetButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl, graph){
  function callbackToDeactivateStartOrTargetButton(e){
    resetCellIfOccupied(e, stateManager, graph)

    if(e.target.tagName === 'TD'){
      let [row, col] = e.target.className.match(/\d+/g)
      row = parseInt(row)
      col = parseInt(col)
      let lastCell = document.querySelector(`td.${stateName}`)
      if(lastCell){
        lastCell.classList.remove(stateName)
      }
      e.target.classList.add(stateName)

      stateManager.state(stateName).location = [row, col]
    }

    stateManager.changeState(stateName, 'active')
    if(stateManager.anyActive()){ // checks if any other button's state is activated before this got removed (in that case return, don't execute code below)
      return
    }
    bodyEl.style.cursor = 'auto'
    tableEl.className = ''
    buttonEl.style.cursor = 'pointer'
  }

  stateManager.changeState(stateName, 'active')
  if(stateManager.state(stateName).active){ // 
    bodyEl.style.cursor = 'pointer'
    buttonEl.style.cursor = 'pointer'
    tableEl.className = `${stateName}`
    
    setTimeout(() => { // we use settimeout to not fire this event together with the outer event listener (avoiding to get batched together with outer function)
      bodyEl.addEventListener('click', (e) => {
        callbackToDeactivateStartOrTargetButton(e)
      }, {once: true,
        capture: true})
    }, 0)
  }
}

export function callbackToActivateWallButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl, graph){
  function handleMouseMove(e){
    resetCellIfOccupied(e, stateManager, graph)

    if(e.target.tagName !== 'TD'){
      return
    }
    let [row, col] = e.target.className.match(/\d+/g)
    let locationCoordinates = `${row}-${col}`
    if(stateManager.state(stateName).location.has(locationCoordinates)){
      return
    }
    e.target.classList.add(stateName)
    graph.addWall(row, col)
  }

  function callbackToDeactivateWallButton(e){
    bodyEl.removeEventListener('mousemove', handleMouseMove)
    stateManager.changeState(stateName, 'active')
    if(stateManager.anyActive()){
      return
    }
    bodyEl.style.cursor = 'auto'
    tableEl.className = ''
    buttonEl.style.cursor = 'pointer'
  }

  stateManager.changeState(stateName, 'active')
  if(stateManager.state(stateName).active){ // 
    bodyEl.style.cursor = 'pointer'
    buttonEl.style.cursor = 'pointer'
    tableEl.className = `${stateName}`
    
    if(stateName === WALL_NODE){
      bodyEl.addEventListener('mousedown', (e) => {
        handleMouseMove(e) // bug fixed node (triggers to add a wall when clicked only on a single cell (there is no movement)
        bodyEl.addEventListener('mousemove', handleMouseMove) // if mouse moving while it is clicked down - add the wall over the cells the user hovers
      }, {once: true, capture: true})

      bodyEl.addEventListener('mouseup', callbackToDeactivateWallButton, {once: true}) // once mouse left button is released deactivate wall button
    }
  }
}

function resetCellIfOccupied(e, stateManager, graph){
  if(e.target.tagName === 'TD' && e.target.classList.length > 2){
    let classList = [...e.target.classList]
    let [row, col] = e.target.className.match(/\d+/g)

    if(classList[2] === START_NODE){
      stateManager.state(START_NODE).location = null
      e.target.classList.remove(START_NODE)
    } else if(classList[2] === TARGET_NODE){
      stateManager.state(TARGET_NODE).location = null
      e.target.classList.remove(TARGET_NODE)
    } else if(classList[2] === WALL_NODE){
      graph.removeWall(row, col)
      e.target.classList.remove(WALL_NODE)
    }
  }
}

export function resetVisitedCSS(){
  let visitedCells = document.querySelectorAll('td.visited')
  let pathNodeCells = document.querySelectorAll('td.path-node')
  for(let i = 0; i < visitedCells.length; i++){
    visitedCells[i].classList.remove('visited')
  }
  for(let i = 0; i < pathNodeCells.length; i++){
    pathNodeCells[i].classList.remove('path-node')
  }
}