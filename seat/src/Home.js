import React , { Component } from "react";
import "./App.css";

function Home(){
    return(
        <div>
            <h1> Hello! {sessionStorage.getItem('userName')}</h1> 
        </div> 
    );
}
export default Home;