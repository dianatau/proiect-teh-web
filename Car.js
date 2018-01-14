import React, {Component} from 'react'

class Car extends Component{
    constructor(props){
        super(props)
        this.state= {
            isEditing: false,
            carNo: this.props.car.car_no,
            carTime: this.props.car.time,
            pId:this.props.car.parkingId
           
          
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
            <div>
            {this.props.car.car_no}&nbsp;&nbsp;&nbsp;
            {this.props.car.time}&nbsp;&nbsp;&nbsp;
            <br></br>
           <button type="button" class="btn btn-success" value="Edit" onClick={() =>this.setState({isEditing:true})}>Edit</button>&nbsp;&nbsp;&nbsp;
           <button type="button" class="btn btn-warning" value="Delete" onClick={()=>this.props.onDelete(this.props.car.id)}>Delete</button>
          
            </div>
            )
        }
             else {
        return (
        <div>
        <input type="text" name="carNo" onChange={this.handleInputChange}  value={this.state.carNo}/>
        <input type="text" name="carTime" onChange={this.handleInputChange} value={this.state.carTime}/>
       
        <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})}/>
        <input type="button" value="save" onClick={() =>
        this.props.onSave(this.props.car.id, {car_no:
            this.state.carNo , time:  this.state.carTime})}/>
        </div>
        )
             }
            
        
    

    }
    }
export default Car