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
    const togglePopupexit = (event) => {
        /*axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db//users/getMyPrefer',{
        userid: sessionStorage.getItem('userId'),
        },{'Access-Contorl-Allow-Credentials': "true",
        withCredentials: true})
        .then(result => {
        console.log(result);
        setExit(result);
         })*/
        a=2;
        setShowExtend(!(event.target.value));
        setShowPopupExit(event.target.value);
    }

    return(
        <div className="whole">
        {showExtend?(<div className="extendarea">
            <div className="Extend">
                <h1> 연장 하시겠습니까? </h1>
                <button className="open" onClick={togglePopupextend} value = 'false'> 
                연장하기</button>
                {showPopup ? (
                    <div className="popup">
                        <div className="popup_inner">
                            <br/>
                            <h2> 해당 좌석 2시간 연장 완료!! </h2>
                            <button className="close" onClick={togglePopupextend}>
                             메시지 닫기
                            </button>
                        </div>
                        </div>
                ): null}
            </div>
            </div>):null}
            
        {showExit?(<div className="exitarea">
            <div className="Exit">
                <h1> 종료 하시겠습니까? </h1>
                <button className="open" onClick={togglePopupexit} value = 'false'> 
                종료하기</button>
                {showPopupExit ? (
                            <div className="popup">
                                <div className="popup_inner">
                                    <br/>
                                    <h2> 좌석 이용 종료!! </h2>
                                    <Rating/>
                                    <button className="close" onClick={togglePopupexit}>
                                    제출하기
                                    </button>
                                </div>
                                </div>
                        ): null}
                </div>
                </div>):null}
            </div>
    );            
} export default Extend;
