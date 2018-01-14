import React, { Component } from 'react'
import {EventEmitter} from 'fbemitter'
import ParkingOp from './storage/ParkingOp'
//import Parking from './Parking'
import ParkingForm from './ParkingForm'
import ParkedCars from './ParkedCars'

const emitter=new EventEmitter()
const storage=new ParkingOp(emitter)
const addParking=(parking) =>{
    storage.addOne(parking)
}

class ParkingList extends Component {
    constructor(props)
    {
        super(props)
        this.state={
        parkings:[],
        selected:{},
        details: -1
        }
        
        this.selectedParking=(id) => {
            
            storage.getOne(id)
            emitter.addListener('Get_single_parking',() => {
                this.setState({
                    selected: storage.selected,
                    details: id 
                })
            })
        }
        this.unselect= () => {
            this.setState({
                details: -1
            })
        }
    }
    
    componentDidMount()
    {
        storage.getAll()
        emitter.addListener('PARKING LIST LOADING..' , () => {
            this.setState({
                parkings: storage.content
                
            })
        })
    }
    
    
  render() {
        if(this.state.details === -1)
        {
   
    return (
    
      <div>
     
      <div>
   <ParkingForm onAdd={addParking}/>
      </div>
      
     
      </div>
   
   
    )
  }
  else {
      return (<div> <ParkedCars parking={this.state.selected} onUnselect={this.unselect}/></div>)
      
  }

}
}

export default ParkingList
