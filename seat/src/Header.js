import React from 'react';
import "./Header.css";
import mainpagelogo from './images/mainpagelogo.png';

const MenuItem = ({ active, children, to }) => (
    <div className="menu-item">{children}</div>
  );
  
  const Header = () => {
    return (
      <div>     
          <div className="headername">여긴어때</div>
      
            <div className="headerlogo">
              <img src={mainpagelogo} alt='mainpagelogo'/>  
            </div>


        <div className="menu">
          <MenuItem>전체좌석보기</MenuItem>
          <MenuItem>사용가능좌석보기</MenuItem>
          <MenuItem>추천받기</MenuItem>
          <MenuItem>예약하기</MenuItem>
          <MenuItem>연장하기</MenuItem>
          <MenuItem>마이페이지</MenuItem>
        </div>
        
      </div>
    );
  };
  
  export default Header;