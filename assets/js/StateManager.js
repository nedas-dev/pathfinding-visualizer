import {START_NODE, TARGET_NODE, WALL_NODE} from './settings.js'

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
        location: []
    }
    }

    state(name){
        switch(name){
            case START_NODE:
                return this.startNode
            case TARGET_NODE:
                return this.targetNode
            case WALL_NODE:
                return this.wallNode
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
                    this.wallNode.location.push(val)
                } else{
                    this.wallNode[key] = val
                }
                break
            default:
                throw new Error('given name value could not match any given case')
        }
    }

    anyActive(){
        if(this.startNode.active || this.targetNode.active || this.wallNode.active){
            return true
        }
        return false
    }
  }