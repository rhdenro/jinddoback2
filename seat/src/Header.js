import React from 'react';
import "./Header.css";
import mainpagelogo from './images/mainpagelogo.png';
import {Route, Link} from 'react-router-dom';

  function Header()  {
    return (
      <div className="Head">
        <div className="Head-left">
          <img src={mainpagelogo} className="logo" alt='mainpagelogo'/>
        </div>
        <div>
          <div className="Headername"> 여긴어때 </div>
        </div>
        <div class="Head-right">
          <div> 환영합니다<br />{sessionStorage.userName}님</div>
          {sessionStorage.isLogined && <div><Link to="/logout">로그아웃<br/> 하러가기!</Link></div>} {!sessionStorage.isLogined && <div><Link to="/login">로그인<br /> 하러가기!</Link></div>}
        
        </div>
    
      </div>

    );
  };
  
  export default Header;