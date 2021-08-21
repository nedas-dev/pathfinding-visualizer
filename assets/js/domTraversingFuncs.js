import {START_NODE, TARGET_NODE, WALL_NODE, totalRows, totalColumns} from './settings.js'

export function initializeTable(tableEl, bodyEl){ // creates a table with cells
    for(let i = 0; i < totalRows; i++){
        let tr = document.createElement('tr')
        tr.className = `row row-${i}`
        for(let j = 0; j < totalColumns; j++){
            let td = document.createElement('td')
            td.className = `col ${i}-${j}`
            tr.appendChild(td)
        }
        tableEl.appendChild(tr)
    }
    bodyEl.appendChild(tableEl)
}

export function listenerForTableResizing(tableEl){ // to maintain table's ratio of 16:9 (for the cells to be even size no matter of how wide it is)
    window.onload = () => {
        let width = tableEl.clientWidth
        tableEl.style.height = width * 0.625
      }

    window.addEventListener('resize', () => {
      let width = tableEl.clientWidth
      tableEl.style.height = width * 0.625
    })
  }

export function callbackForActiveButton(event, stateName, buttonEl, stateManager, bodyEl, tableEl){
  stateManager.changeState(stateName, 'active')
  if(stateManager.state(stateName).active){ // 
    bodyEl.style.cursor = 'pointer'
    buttonEl.style.cursor = 'pointer'
    tableEl.className = `${stateName}`
    
    if(stateName === START_NODE || stateName === TARGET_NODE){ // once clicked anywhere on a page - unselects whatever button was clicked before (start node or target node))
      setTimeout(() => { // we use settimeout to not fire this event together with the outer event listener
        bodyEl.addEventListener('click', (e) => {
          callbackForDeactivatedTargetStartButtons(e, stateManager, stateName, buttonEl, tableEl, bodyEl)
        }, {once: true})
      }, 0);
    } else if(stateName === WALL_NODE){
      function handleMouseMove(e){
        if(e.target.tagName !== 'TD'){
          return
        }
        let [col, row] = e.target.className.match(/\d+/g)
        let locationCoordinates = `${row}-${col}`
        if(stateManager.state(WALL_NODE).location.has(locationCoordinates)){
          return
        }
        let targetClassList = e.target.classList.add(WALL_NODE)
        let location = stateManager.state(WALL_NODE)['location']
        location.add(locationCoordinates)
      }
      
      bodyEl.addEventListener('mousedown', (e) => {
        handleMouseMove(e) // bug fixed node activates for when only pressing one node (there is no move movement besides a click)
        bodyEl.addEventListener('mousemove', handleMouseMove)
      }, {once: true})

      bodyEl.addEventListener('mouseup', e =>{
        bodyEl.removeEventListener('mousemove', handleMouseMove)
        stateManager.changeState(WALL_NODE, 'active')
        if(stateManager.anyActive()){
          return
        }
        bodyEl.style.cursor = 'auto'
        tableEl.className = ''
        buttonEl.style.cursor = 'pointer'
      }, {once: true})
    }
  }
}

function callbackForDeactivatedTargetStartButtons(e, stateManager, stateName, buttonEl, tableEl, bodyEl){ // this applies only for Start and Target nodes
  if(e.target.className.includes('col')){
    let [col, row] = e.target.className.match(/\d+/g)

    let lastCell = document.querySelector(`td.${stateName}`)
    if(lastCell){
      lastCell.classList.remove(stateName)
    }
    e.target.classList.add(stateName)
  }
  stateManager.changeState(stateName, 'active')
  if(stateManager.anyActive()){ // checks if any other button's state is activated before this got removed (in that case return, don't execute code below)
    return
  }
  bodyEl.style.cursor = 'auto'
  tableEl.className = ''
  buttonEl.style.cursor = 'pointer'
}

