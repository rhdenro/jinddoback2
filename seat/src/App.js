//import Login from './Login.js';
import React , { Component } from "react";
import Header from './Header.js';
import "./App.css";
import Main from "./main.js"
import Login from "./Login.js";
import Home from "./Home.js";
import Register from "./Register.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/*class App extends Component {
  render() {
      return (
          <div>
              <Header/>
              {this.props.children}
          </div>
      );
  }
}*/

function App(){
  return(
    <div className = 'App'>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route path = "/home" element={<Home/>}/>
        <Route path="/header" element={<Header/>} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/Register" element={<Register />} />  
      </Routes>   
    </div>
  );
}

export default App;