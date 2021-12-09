import React, {useState} from 'react';
import './App.css';
import './Reservation.css';

export default function Reservation(){
    const [showPopup, setShowPopup ] = useState(false);
    const togglePopup = (event) => {
       
        setShowPopup(event.target.value)
    };
   
};
