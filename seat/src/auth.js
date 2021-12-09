import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
export default function login1(id, password, sessionStorage){
    return new Promise(function(resolve, reject){
        axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db/login',{
            userid: id,
            userpassword: password,
        },{
            'Access-Contorl-Allow-Credentials': "true",
            withCredentials: true
        }).then(result => {
            sessionStorage.setItem('userId', result.data.userId);
            sessionStorage.setItem('userName', result.data.userName);
            sessionStorage.setItem('isLogined', result.data.isLoggedIn);
        }).then(resolve(1))
    })
}