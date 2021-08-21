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
      setTimeout(() => { // we use settimeout to not fire this event together with the outer event listener (finish current event handling batch first, then execute this add event listener
        bodyEl.addEventListener('click', (e) => {
          callbackForDeactivatedButton(e, stateManager, stateName, buttonEl, tableEl, bodyEl)
        }, {once: true})
      }, 0);
    } else if(stateName === WALL_NODE){
      
    }
  }
}

function callbackForDeactivatedButton(e, stateManager, stateName, buttonEl, tableEl, bodyEl){ // this applies only for Start and Target nodes
  if(e.target.className.includes('col')){
    let [col, row] = e.target.className.match(/\d+/g)

    let lastCell = document.querySelector(`td.${stateName}`)
    if(lastCell){
      lastCell.className = lastCell.className.replace(` ${stateName}`, '')
    }
    e.target.className += ` ${stateName}`
  }
  stateManager.changeState(stateName, 'active')
  if(stateManager.anyActive()){ // checks if any other button's state is activated before this got removed (in that case return, don't execute code below)
    return
  }
  bodyEl.style.cursor = 'auto'
  tableEl.className = ''
  buttonEl.style.cursor = 'pointer'
}