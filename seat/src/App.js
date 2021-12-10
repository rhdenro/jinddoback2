import React , { Components } from "react";
import Header from './Header.js';
import Layout from './Layout.js';
import "./App.css";
import Main from "./main.js"
import Login from "./Login.js";
import Logout from "./Logout.js";
import Home from "./Home.js";
import Reservation from "./Reservation.js";
import Register from "./Register.js";
import Recomendationlist from "./Recomendationlist.js";
import Extend from "./Extend.js";
import Mypage from "./Mypage.js";
import Allseat from "./Allseat.js";
import Rating from "./Rating.js";
import { BrowserRouter , Route, Router, Routes } from "react-router-dom";


function App(){
  return(
      <div className = 'App'>
    
         <Routes>
           <Route exact path="/" element={<Main/>}/>
           <Route path = "/home" element={<Layout/>}/>
           <Route path="/header" element={<Header/>}/>
           <Route path="/login" element={<Login />}/>   
           <Route path="/register" element={<Register/>}/>
           <Route path="/logout" element = {<Logout />}/> 
           <Route path="/mypage" element = {<Mypage/>}/>
           <Route path="/recomendationlist" element = {<Recomendationlist/>}/>
           <Route path="/extend" element = {<Extend/>}/>
           <Route path="/allseat" element = {<Allseat/>}/>
           <Route path="/Reservation" element = {<Reservation/>}/>
           <Route path="/Rating" element={<Rating/>}/>
         </Routes>

   
       
      </div>
 
  );
}


export default App;