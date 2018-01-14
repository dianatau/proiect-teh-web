import React, {Component} from 'react'

class Parking extends Component{
    constructor(props){
        super(props)
        this.state= {
            isEditing: false,
            parkingCity: this.props.parking.city,
            parkingAdress: this.props.parking.adress,
            parkingCapacity: this.props.parking.capacity,
            parkingDescription: this.props.parking.description
        }
         this.handleInputChange=(event) =>
        {
          this.setState({
            [event.target.name] : event.target.value
          })
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            isEditing: false
            
        })
    }
    render (){
        if(!this.state.isEditing)
        {
        return (
     <table>
  <tr>
    <th class="text-warning"><font size="4">City</font></th> &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; 
    <th class="text-danger"><font size="4">Adress</font></th> &emsp; &emsp;
    <th class="text-success"><font size="4">Capacity</font></th> &emsp; &emsp;
    <th class="text-info"><font size="4">Description</font></th> &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  
    
  </tr>
   <tr>
    <td>{this.props.parking.city}</td>&emsp; &emsp;
    <td>{this.props.parking.adress}</td>&emsp; 
    <td>{this.props.parking.capacity}</td>&emsp; &emsp;
    <td>{this.props.parking.description}</td>&emsp; &emsp;
    <td>  &emsp;  
    
      <button width="10px" type="button" class="btn btn-success" value="Edit" onClick={() =>this.setState({isEditing:true})}>Edit</button>
             &emsp;
           
           <button type="button" class="btn btn-info" value="Delete" onClick={()=>this.props.onDelete(this.props.parking.id)}>Delete</button>
            &emsp;
           <button type="button" class="btn btn-danger" value="Details"  onClick={()=>this.props.onSelect(this.props.parking.id)}>Details</button>
         </td>

  </tr>
  
  </table>
           
 
           
           
            )
            
  
            
        
    }
    else {
        return (
        <div>
        <input type="text" name="parkingCity" onChange={this.handleInputChange}  value={this.state.parkingCity}/>
        <input type="text" name="parkingAdress" onChange={this.handleInputChange} value={this.state.parkingAdress}/>
        <input type="text" name="parkingCapacity" onChange={this.handleInputChange} value={this.state.parkingCapacity}/>
        <input type="text" name="parkingDescription" onChange={this.handleInputChange} value={this.state.parkingDescription}/>
        <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})}/>
        <input type="button" value="save" onClick={() =>
        this.props.onSave(this.props.parking.id, {city:
            this.state.parkingCity , adress:  this.state.parkingAdress,
            capacity: this.state.parkingCapacity, description:  this.state.parkingDescription})}/>
        </div>
        )
    }
    }
    }
export default Parking