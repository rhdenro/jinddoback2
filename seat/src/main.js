import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import cbnulibrary from './images/cbnulibrary.jpeg';
import dotenv from 'dotenv';
import {Navigate} from "react-router-dom";
function Main(){
    let isLogined = sessionStorage.getItem('isLogined');
        return(
        <div>
            {isLogined !== undefined && isLogined ? <Navigate to="/home" /> :<Navigate to ="/login" /> }
        </div> 
    )
    
}
export default Main;