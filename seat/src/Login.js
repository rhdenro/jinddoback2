import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cbnulibrary from './images/cbnulibrary.jpeg';

 
function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/user_inform/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh', flexDirection: 'column', fontFamily: "ugro",
            backgroundColor: "#FBF5EF"
        }}>
            <h2 style={{
                marginBottom : "30px",
                fontSize: "5rem",
                color: "#F15F5F"

            }}>여긴어때</h2>
            
            <div>
                <img src={cbnulibrary} alt='cbnulibrary'/>
            </div>
            <br />
            <div>
                <label htmlFor='input_id'>USER ID : </label>
                <input type='text' name='input_id' placeholder="학번" value={inputId} onChange={handleInputId} />
            </div>
            <br />
            <div>
                <label htmlForGG='input_pw'>PASSWORD : </label>
                <input type='password' name='input_pw' placeholder="비밀번호" value={inputPw} onChange={handleInputPw} />
            </div>
            <br />
            <div>
                <button
                 style={{
                    background: "#F15F5F",
                    width: "250px",
                    height: "30px",
                    borderRadius: "10px",
                    fontSize: "22px",
                    color: "#ffffff"
                }}
                 onClick={onClickLogin}>Login</button>
            </div>
        </div>
        
    )
}

export default Login;