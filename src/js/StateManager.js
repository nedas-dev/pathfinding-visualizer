import {START_NODE, TARGET_NODE, WALL_NODE, SIDEBAR, ERASE_BUTTON, WEIGHT_NODE, waitTimeInLoop, totalRows, totalColumns, defaultAlgorithm} from './settings.js'

export default class StateManager{
    constructor(){
        this.startNode = {
            active: false,
            location: null
        }
        this.targetNode = {
            active: false,
            location: null
        }
        this.wallNode = {
            active: false,
            location: new Set()
        }
        this.weightNode = {
            active: false,
            location: new Set()
        }
        this.sidebar = {
            open: false
        }
        this.eraseButton = {
            active: false,
        }
        this.waitTime = {
            inLoop: waitTimeInLoop
        }
        this.totalRows = totalRows
        this.totalColumns = totalColumns
        this.activeAlgorithm = defaultAlgorithm
        this.lockdown = false
        this.weight_node_available = false
    }

    state(name){
        switch(name){
            case START_NODE:
                return this.startNode
            case TARGET_NODE:
                return this.targetNode
            case WALL_NODE:
                return this.wallNode
            case WEIGHT_NODE:
                return this.weightNode
            case SIDEBAR:
                return this.sidebar
            case ERASE_BUTTON:
                return this.eraseButton
            default:
                throw new Error('given name value could not match any given case')
        }
    }

    changeState(name, key, val = null){
        switch(name){
            case START_NODE:
                if(val === null){
                    this.startNode[key] = !this.startNode[key]
                } else{
                    this.startNode[key] = val
                }
                break
            case TARGET_NODE:
                if(val === null){
                    this.targetNode[key] = !this.targetNode[key]
                    
                } else{
                    this.targetNode[key] = val
                }
                break
            case WALL_NODE:
                if(val === null){
                    this.wallNode[key] = !this.wallNode[key]
                } else if (key === 'location'){
                    this.wallNode.location.add(val)
                } else{
                    this.wallNode[key] = val
                }
                break
            case WEIGHT_NODE:
                if(val === null){
                    this.weightNode[key] = !this.weightNode[key]
                } else if (key === 'location'){
                    this.weightNode.location.add(val)
                } else{
                    this.weightNode[key] = val
                }
                break
            case 'weight_node_available':
                this.weight_node_available = key
                if(key){
                    document.querySelector('li#weight-node').classList.remove('disabled')
                } else{
                    document.querySelector('li#weight-node').classList.add('disabled')
                }
                break
            default:
                throw new Error('given name value could not match any given case')
        }
    }

    anyActive(){
        if(this.startNode.active || this.targetNode.active || this.wallNode.active || this.eraseButton.active || this.weightNode.active){
            return true
        }
        return false
    }
  }