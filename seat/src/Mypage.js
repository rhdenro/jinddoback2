import React, {useState} from 'react';
import './Mypage.css';
import Header from './Header.js';
import Userinfo from './Userinfo.js';
import './Mypage.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F15F5F",
      color: theme.palette.common.white,
      textAlign: "center",
      fontFamily: "ugro",
      fontSize: 23
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
      textAlign: "center",
      fontFamily: "ugro"
      
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, style, height, day, rate) {
    return { name, style, height, day, rate };
  }
  
  const rows = [
    createData('조망형', 1, 12, 20211110, 5),
    createData('조망형', 1, 13, 20211115, 5),
    createData('창가형', 2, 3, 20211116, 5),
    createData('창가형', 2, 5, 20211126, 4),
    createData('pc형', 3, 15, 20211127, 4),
  ];
  
  
/*const onSubmit = (event)=>{
    event.preventDefault()
    return alert("좌석 이용기록 초기화 완료")
}*/
function Mypage() {
  const [seatInfo, setSeatInfo] = useState();
  //초기화
  const clickMe =() => {
    axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db/seats/setDefaultValue',{
      userid: sessionStorage.getItem('userId'),
    },{'Access-Contorl-Allow-Credentials': "true",
    withCredentials: true})
    .then(result => {
      setSeatInfo(result.data);
    })
    }


}
export default Mypage;
