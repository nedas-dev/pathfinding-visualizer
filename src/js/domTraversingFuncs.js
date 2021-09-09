import StateManager from '../../gh-pages/src/js/StateManager.js'
import {START_NODE, TARGET_NODE, WALL_NODE, SIDEBAR, ERASE_BUTTON, WEIGHT_NODE, totalRows, totalColumns} from './settings.js'

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
}

export function listenerForTableResizing(tableEl){ // to maintain table's ratio of 2:1 (for the cells to be equal size no matter of how wide or tall it is)
    let width = tableEl.clientWidth
    tableEl.style.height = width * 0.50

  window.addEventListener('resize', () => {
    let width = tableEl.clientWidth
    tableEl.style.height = width * 0.50
  })
}

export function callbackToActivateStartOrTargetButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl, graph, graphWeighted){
  function callbackToDeactivateStartOrTargetButton(e){
    resetCellIfOccupied(e, stateManager, graph, graphWeighted)

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
    deactivateSpecificButtonCSS(stateName, bodyEl, buttonEl, tableEl)
  }

  stateManager.changeState(stateName, 'active')
  if(stateManager.state(stateName).active){ // 
    activateSpecificButtonCSS(stateName, bodyEl, buttonEl, tableEl)
    
    setTimeout(() => { // we use settimeout to not fire this event together with the outer event listener (avoiding to get batched together with outer function)
      bodyEl.addEventListener('click', (e) => {
        callbackToDeactivateStartOrTargetButton(e)
      }, {once: true,
        capture: true})
    }, 0)
  }
}

export function callbackToActivateWallOrWeightButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl, graph, graphWeighted){
  if(!stateManager.weight_node_available && stateName === WEIGHT_NODE){
    return
  }
  function handleMouseMove(e){
    resetCellIfOccupied(e, stateManager, graph, graphWeighted)

    if(e.target.tagName !== 'TD'){
      return
    }
    let [row, col] = e.target.className.match(/\d+/g)
    let locationCoordinates = `${row}-${col}`
    if(stateManager.state(stateName).location.has(locationCoordinates)){
      return
    }
    e.target.classList.add(stateName)

    if(stateName === WALL_NODE){
      graph.addWall(row, col)
      graphWeighted.addWall(row, col)
    } else if (stateName === WEIGHT_NODE){
      graphWeighted.addWeight(row, col)
    }

  }

  function deactivateIfClickedOutsideTableEl(e){
    if(['TD', 'TR', 'TABLE'].includes(e.target.tagName)){
      stateManager.changeState(stateName, 'active')
      callbackToActivateWallOrWeightButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl, graph, graphWeighted)
      return
    }
    callbackToDeactivateWallOrWeightButton()
  }

  function callbackToDeactivateWallOrWeightButton(){
    stateManager.changeState(stateName, 'active')
    if(stateManager.anyActive()){
      return
    }
    deactivateSpecificButtonCSS(stateName, bodyEl, buttonEl, tableEl)
  }
  // INSIDE FUNCTIONS ENDS HERE

  if(stateManager.state(stateName).active === true){
    return // if wall node is active return
  }

  stateManager.changeState(stateName, 'active')
  
  if(stateManager.state(stateName).active){ // 
    activateSpecificButtonCSS(stateName, bodyEl, buttonEl, tableEl)
    
    // code below takes care of "drawing" wall nodes on the grid and deactivating it when needed
    bodyEl.addEventListener('mousedown', (e) => {
      handleMouseMove(e) // bug fixed node (triggers to add a wall when clicked only on a single cell (there is no movement)
      bodyEl.addEventListener('mousemove', handleMouseMove) // if mouse moving while it is clicked down - add the wall over the cells the user hovers
    }, {once: true, capture: true})

    bodyEl.addEventListener('mouseup', () => {
      bodyEl.removeEventListener('mousemove', handleMouseMove)
    }, {once: true}) // once mouse left button is released deactivate wall button

    setTimeout(() => bodyEl.addEventListener('click', deactivateIfClickedOutsideTableEl, {once: true}), 0)
  }
}

export function callbackForEraseButton(SM, tableEl, bodyEl, graph, graphWeighted){
  if(SM.state(ERASE_BUTTON).active){
    return
  }

  function handleTableClick(e){
    e.stopPropagation()
    resetCellIfOccupied(e, SM, graph, graphWeighted)
  }

  bodyEl.style.cursor = "url(/src/images/eraser-2.png) 1 16, pointer"
  SM.state(ERASE_BUTTON).active = true
  tableEl.className = ''
  tableEl.addEventListener('click', handleTableClick)

  setTimeout(() => { // not to be batched together with eraseCellButton click event
    bodyEl.addEventListener('click', e => {
    tableEl.removeEventListener('click', handleTableClick)
    SM.state(ERASE_BUTTON).active = false
    if(SM.anyActive()){
      return
    }
    bodyEl.style.cursor = "auto" // reset the cursor to auto
  }, {once: true})}, 0)
}

export function resetPathFinder(SM, graph, graphWeighted){ // resets table's css, graph (everything)
  resetVisitedCellCSS()

  let wallNodeCellsList = document.querySelectorAll(`td.${WALL_NODE}`)
  let weightNodeCellsList = document.querySelectorAll(`td.${WEIGHT_NODE}`)

  for(let i = 0; i < wallNodeCellsList.length; i++){
    wallNodeCellsList[i].classList.remove(WALL_NODE)
  }

  for(let i = 0; i < weightNodeCellsList.length; i++){
    weightNodeCellsList[i].classList.remove(WEIGHT_NODE)
  }

  graph.initializeGraph()
  graphWeighted.initializeGraph()

  SM.state(WALL_NODE).location = new Set()
  SM.state(WEIGHT_NODE).location = new Set()
}

export function handleSidebarOpenClosed(SM, tableEl){
  document.getElementById('arrow-img').addEventListener('click', (e) => {
    document.getElementById('sidebar').classList.toggle('active')
    document.getElementById('logo').classList.toggle('open')
    SM.state(SIDEBAR).open = !SM.state(SIDEBAR).open
    
    function resizeTableAfterCertainTime(ms){
      setTimeout(() => {
        let width = tableEl.clientWidth
        tableEl.style.height = width * 0.50
      }, ms)
    }
    resizeTableAfterCertainTime(150)
    resizeTableAfterCertainTime(300)
    resizeTableAfterCertainTime(600)
  })
}

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------SUB FUNCTIONS-----------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------

export function activateSpecificButtonCSS(stateName, bodyEl, buttonEl, tableEl){
  bodyEl.style.cursor = 'pointer'
  buttonEl.style.cursor = 'pointer'
  tableEl.className = `${stateName}`
}

export function deactivateSpecificButtonCSS(stateName, bodyEl, buttonEl, tableEl){
  bodyEl.style.cursor = 'auto'
  buttonEl.style.cursor = 'pointer'
  tableEl.className = ''
}

export function resetVisitedCellCSS(){
  let visitedCells = document.querySelectorAll('td.visited')
  let pathNodeCells = document.querySelectorAll('td.path-node')
  let pathNodeCellsNoAnimation = document.querySelectorAll('td.path-node-no-animation')
  let visitedCellsNoAnimation = document.querySelectorAll('td.visited-no-animation')

  for(let i = 0; i < visitedCells.length; i++){
    visitedCells[i].classList.remove('visited')
  }
  for(let i = 0; i < pathNodeCells.length; i++){
    pathNodeCells[i].classList.remove('path-node')
  }
  for(let i = 0; i < pathNodeCellsNoAnimation.length; i++){
    pathNodeCellsNoAnimation[i].classList.remove('path-node-no-animation')
  }
  for(let i = 0; i < visitedCellsNoAnimation.length; i++){
    visitedCellsNoAnimation[i].classList.remove('visited-no-animation')
  }
}

export function resetCellIfOccupied(e, stateManager, graph, graphWeighted){
  if(e.target.tagName === 'TD' && e.target.classList.length > 2){
    let classList = [...e.target.classList]
    let [row, col] = e.target.className.match(/\d+/g)

    switch(classList[2]){
      case START_NODE:
        stateManager.state(START_NODE).location = null
        e.target.classList.remove(START_NODE)
        break
      case TARGET_NODE:
        stateManager.state(TARGET_NODE).location = null
        e.target.classList.remove(TARGET_NODE)
        break
      case WALL_NODE:
        graph.removeWall(row, col)
        graphWeighted.removeWall(row, col)
        e.target.classList.remove(WALL_NODE)
      case WEIGHT_NODE:
        graphWeighted.removeWeight(row, col)
        e.target.classList.remove(WEIGHT_NODE)
      case 'visited':
        e.target.classList.remove('visited')
      case 'path-node':
        e.target.classList.remove('path-node')
      case 'visited-no-animation':
        e.target.classList.remove('visited-no-animation')
      case 'path-node-no-animation':
        e.target.classList.remove('path-node-no-animation')
      // default:
      //   throw new Error(`resetCellIfOccupied func - there was an error in switch statement no such a name as: ${classList[2]}`)
    }
  }
}

export function handleIntroductionPage(){
  let closeIntroButton = document.getElementById('close-intro')
  let showIntroButton = document.getElementById('show-intro')
  let showIntroWrapperDiv = document.querySelector('div.blur-container')

  closeIntroButton.addEventListener('click', e => {
    showIntroWrapperDiv.style.display = "none";
  }, {once: true})
  
  showIntroButton.addEventListener('click', e => {
    showIntroWrapperDiv.style.display = "block";
    
    // scrolling to the top of introduction div / page
    document.querySelector('div#introduction').scrollTop = '0'

    closeIntroButton.addEventListener('click', e => {
      showIntroWrapperDiv.style.display = "none";
    }, {once: true})
  })
}