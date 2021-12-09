import React from 'react';
import './Kategorie.css';




function Kategorie({ info, image }){
    const clickMe = () => {
        if (info == "전체좌석보기"){
            document.location.href='/Allseat';
        }
        else if(info == "추천받기"){
            document.location.href='/Recomendationlist';
        }
        else if(info == "연장하기 및 종료하기"){
            document.location.href='/Extend';
        }
        else if (info == "나의 이용기록"){
            document.location.href='/Mypage';
        }
 
    }

   
}
export default Kategorie;


