import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from './Header.js';
import Selectbox from './Selectbox.js';
import Switchbox from './Switchbox.js';
import './Recomendationlist.css';
import Reservation from './Reservation.js';
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

function createData(name, style, height, day) {
  return { name, style, height, day };
}

const rows = [
  createData('조망형', 1, 12, 20211110),
  createData('조망형', 1, 13, 20211115),
  createData('창가형', 2, 3, 20211116),
  createData('창가형', 2, 5, 20211126),
  createData('pc형', 3, 15, 20211127),
];

const clickMe = (event) => {
  window.location.href = "/home"
  axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db/reservation',{
  userid: sessionStorage.getItem('userId'),
  seat_code: event.target.getAttribute('value')
  },{'Access-Contorl-Allow-Credentials': "true",
  withCredentials: true})
  .then(result => {
    return result;
  })
}

function move(){
  window.location.href = "/Allseat"
}

export default function CustomizedTables() {
  const [textArea, setTextArea] = useState("");
  const [states,setStates] = useState([true, true, true]);
  const [seatInfo, setSeatInfo] = useState();
  const onChange = (event) => {
    if(event.data !== undefined){
      if(event.data.result){
        setSeatInfo(event.data.result);
      }
      else{
        setSeatInfo(event.data);
      }
    }
    else if(event.currentTarget.id == "test"){
      let tempStates = states;
      tempStates[0] = !(tempStates[0]);
      setStates(tempStates);
    }
    else if(event.currentTarget.id == "test2"){
      let tempStates = states;
      tempStates[1] = !(tempStates[1]);
      setStates(tempStates);
    }
    else{
      let tempStates = states;
      tempStates[2] = !(tempStates[2]);
      setStates(tempStates);
    }
  }
  return (
    <TableContainer component={Paper}>
        <Header/>
        <div className="arrangement">
          <Selectbox onChange={(event)=> {setTextArea(event.target.innerText);}} />
          <br/>
          <Switchbox onChange={(event) => {onChange(event);}} value = { textArea } states = {states} seatInfo = { seatInfo }/>
        </div>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">  
      
        <TableHead>
          <TableRow>
            <StyledTableCell> 좌석 형태 </StyledTableCell>
            <StyledTableCell align="right"> 층 수 </StyledTableCell>
            <StyledTableCell align="right"> 좌석 번호 </StyledTableCell>
            <StyledTableCell align="right"> 밀집도 </StyledTableCell>
            <StyledTableCell align="right"> 예약 진행 </StyledTableCell>
          </TableRow>
        </TableHead>
       
      </Table>
    </TableContainer>
  );
}
