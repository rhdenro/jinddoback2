import React from 'react';
import "./Layout.css";
import pagehome from './images/pagehome.jpeg';
import Kategorie from './Kategorie';
import everyseat from './images/everyseat.jpg';
import recomendation from './images/recomendation.png';
import time from './images/time.png';
import user from './images/user.png';
import Header from './Header.js';

function Layout(){ 
    return(
        <div className="Layout">
            <Header/>
            <div className="Layoutcontainer">
                <img className="Layoutimage"  src={pagehome} alt="pagehome"/>

                <div className="Layoutrow">
                    <Kategorie info="전체좌석보기" image={everyseat}/>
                    <Kategorie info="추천받기" image={recomendation}/>
                </div>
                
            </div>

        </div>

    );

}
export default Layout;