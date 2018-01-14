import React, { Component } from 'react'
import './App.css'
import ParkingList from './ParkingList'


 import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Parkings from "./Parkings";
import Details from "./Details";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Parking administration</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/parkings">Parking lot</NavLink></li>
            <li><NavLink to="/details">Details</NavLink></li>
           
            
         </ul>
          <div className="content">
           <Route exact path="/" component={ParkingList}/>
  <Route path="/parkings" component={Parkings}/>
  <Route path="/details" component={Details}/>
  

             
          </div>
        </div>
        </HashRouter>

    );
  }
}
 
export default App;

