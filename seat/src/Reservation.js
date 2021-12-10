import React, {useState} from 'react';
import './App.css';
import './Reservation.css';

export default function Reservation(){
    const [showPopup, setShowPopup ] = useState(false);
    const togglePopup = (event) => {
       
        setShowPopup(event.target.value)
    };
    return (
        
        <div className="Reservation">
            <h1> 좌석 정보 :  </h1>
            <button className="open" onClick={togglePopup} value = 'false'> 
            예약하기</button>

            {showPopup ? (
                <div className="popup">
                    <div className="popup_inner">
                        <br/>
                        <h2> 예약 완료!! </h2>
                        <button className="close" onClick={togglePopup}>
                         메시지 닫기
                        </button>
                    </div>
                    </div>
            ): null}
        </div>
    );
};
