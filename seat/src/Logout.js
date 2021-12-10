import './App.css';

export default function Logout(){
    sessionStorage.clear();
    document.location.href='/';
}