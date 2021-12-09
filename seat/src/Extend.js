import React, { useState } from 'react';
import './App.css';
import './Extend.css';
import Rating from './Rating.js';
import axios from 'axios';


function Extend(){
    let a=0;
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupExit, setShowPopupExit] = useState(false);
    const [showExtend, setShowExtend] = useState(true);
    const [showExit, setShowExit] = useState(true);
    //const [extend, setExtend] = useState();
    //const [exit, setExit] = useState();

    const togglePopupextend = (event) => {
        /*axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db//users/getMyPrefer',{
        userid: sessionStorage.getItem('userId'),
        },{'Access-Contorl-Allow-Credentials': "true",
        withCredentials: true})
        .then(result => {
        console.log(result);
        setExtend(result);
        }) */
        a=1;
        setShowExit(!(event.target.value));
        setShowPopup(event.target.value);

    };
   
} export default Extend;
