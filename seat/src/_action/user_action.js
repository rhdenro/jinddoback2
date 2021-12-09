import axios from 'axios';
import { 
    LOGIN_USER
} from './types'
export function loginUser(dataTosubmit){
    const request = Axios.post('/api/users/login', dataTosubmit)        //서버에 리퀘스트 날리고 
    .then(response => response.data)     
    
    return {
        type:LOGIN_USER,
        payload: request
    }
}