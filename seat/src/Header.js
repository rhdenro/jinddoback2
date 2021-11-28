import React from 'react';
import "./Header.css";

const MenuItem = ({ active, children, to }) => (
    <div className="menu-item">{children}</div>
  );
  
  const Header = () => {
    return (
        <div>
      
        <div className="logo">여긴어때</div>
     

        <div className="menu">
          <MenuItem>전체좌석보기</MenuItem>
          <MenuItem>사용가능좌석보기</MenuItem>
          <MenuItem>추천받기</MenuItem>
          <MenuItem>예약하기</MenuItem>
          <MenuItem>연장하기</MenuItem>
        </div>
      </div>
    );
  };
  
  export default Header;