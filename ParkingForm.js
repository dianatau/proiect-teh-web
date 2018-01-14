import React, { Component } from 'react';


class ParkingForm extends Component {
   constructor(props)
    {
        super(props)
        this.state={
        parkingCity:'',
        parkingAdress:'',
        parkingCapacity:'',
        parkingDescription:''
        }
        
        this.handleInputChange=(event) =>
        {
          this.setState({
            [event.target.name] : event.target.value
          })
        }
    }

  render() {
    return (
      
       <div>
      <form>
   
      City: <input type="text" placeholder="Enter city" onChange={this.handleInputChange} name="parkingCity"/>&nbsp;&nbsp;
      Adress: <input type="text" placeholder="Enter adress" onChange={this.handleInputChange} name="parkingAdress"/>&nbsp;&nbsp;
      Capacity: <input type="text" placeholder="Enter capacity" onChange={this.handleInputChange} name="parkingCapacity"/>&nbsp;&nbsp;
      Description: <input type="text" placeholder="Enter description" onChange={this.handleInputChange} name="parkingDescription"/>&nbsp;&nbsp;
      <button type="button" class="btn btn-outline-warning" value ="Add" onClick={() => this.props.onAdd({
          city: this.state.parkingCity, adress: this.state.parkingAdress, 
          capacity: this.state.parkingCapacity, description: this.state.parkingDescription})}>Add</button>
      </form>
      </div>
    );
  }
}

export default ParkingForm;
