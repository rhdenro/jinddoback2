import './App.css';
import './Register.css';
import React, {useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
    let navigate = useNavigate();
    const [studentNo, setStudentNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const onStudentNoHandler = (event) => {
        setStudentNo(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onSubmit = (event) =>{
        event.preventDefault()
        if(password !== confirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db/register',{
            username: name,
            student_no: studentNo,
            password: password
        }).then(result => {
            if(result.data.success == 1){
                alert('회원가입 성공');
                navigate('/');
            }
        })
    }
    return(
        <div className="Register">
            <form>
                <h1>회원가입</h1>
                <br/>
                <div>
                    <input type="text" name="name" placeholder="이름" value={name} onChange={onNameHandler} className="registerInput"/>
                </div>
               
                <div>
                    <input type="text" name="student_no" placeholder="학번" value={studentNo} onChange={onStudentNoHandler} className="registerInput"/>
                </div>
             
                <div>
                    <input type="password" name="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="registerInput"/>
                </div>
              
                <div>
                    <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler} className="registerInput"/>
                </div>
            
                <div>
                    <br/>
                    <button onClick={onSubmit}> 계정 생성하기 </button>
                </div>
            </form>
        </div>
    );
}
export default Register;