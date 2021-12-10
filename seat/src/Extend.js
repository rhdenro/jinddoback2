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
    const [extend, setExtend] = useState();
    const [exit, setExit] = useState();
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    const togglePopupextend = (event) => {
        axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db/seats/reservation_con',{
        userid: sessionStorage.getItem('userId'),
        },{'Access-Contorl-Allow-Credentials': "true",
        withCredentials: true})
        .then(result => {
        console.log(result);
        setExtend(result);
        a=1;
        setShowExit(!(event.target.value));
        setShowPopup(event.target.value);
        })  
    };
    const togglePopupexit = (event) => {
        a=2;
        setShowExtend(!(event.target.value));
        setShowPopupExit(event.target.value);
    };
    function move1(){
        window.location.href = "/home"
      }
    function move2(){
        let rating = clicked.filter(Boolean).length;
        alert(rating);
        axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db/seats/reservation_fin',{
            userid: sessionStorage.getItem('userId'),
            rating: rating
            },{'Access-Contorl-Allow-Credentials': "true",
            withCredentials: true})
            .then(result => {
            console.log(result);
            setExit(result);
            window.location.href = "/home"
            })
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
                            <button className="close" onClick={move1}>
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
                                    <Rating onChange={(event)=>{setClicked(event);}}/>
                                    <button className="close" onClick={move2}>
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
