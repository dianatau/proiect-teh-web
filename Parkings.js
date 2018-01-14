import React, { Component } from "react";
import {EventEmitter} from 'fbemitter'
import ParkingOp from './storage/ParkingOp'
import Parking from './Parking'
//import ParkingForm from './ParkingForm'
import ParkedCars from './ParkedCars'

const emitter=new EventEmitter()
const storage=new ParkingOp(emitter)

const deleteParking=(id) =>{
    storage.deleteOne(id)
}
const saveParking=(id,parking) =>{
    storage.saveOne(id,parking)
}

 class Stuff extends Component {
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
  
      </div>
      
      
       {
      this.state.parkings.map((p) =>
     // <li>{e.city +' ' + e.adress + ' ' + e.capacity + ' '+ e.description } </li>
     <Parking parking={p} key={p.id} onDelete={deleteParking} onSave={saveParking}
     onSelect={this.selectedParking}/>
     
      )}
      </div>
   
   
    )
  }
  else {
      return (<div> <ParkedCars parking={this.state.selected} onUnselect={this.unselect}/></div>)
      
  }

}
}


 
export default Stuff;