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
    //초기 로딩
    const onLoad =() => {
      console.log("IN")
      axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db//users/getMyPrefer',{
        userid: sessionStorage.getItem('userId'),
      },{'Access-Contorl-Allow-Credentials': "true",
      withCredentials: true})
      .then(result => {
        console.log(result);
        setSeatInfo(result.data);
      })
      }
    return(
        <TableContainer component={Paper} onLoad = {onLoad}>
        <Header/>
      
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">  
      
        <TableHead>
          <TableRow>
            <StyledTableCell> 이전 사용 좌석 형태 </StyledTableCell>
            <StyledTableCell align="right"> 층 수 </StyledTableCell>
            <StyledTableCell align="right"> 좌석 번호 </StyledTableCell>
            <StyledTableCell align="right">이용 날짜</StyledTableCell>
            <StyledTableCell align="right"> 평점 </StyledTableCell>
          </TableRow>
        </TableHead>
        {seatInfo !== undefined?(
          <TableBody>
          {seatInfo.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
              {row.form+ " : " + row.sector}
              </StyledTableCell>
              <StyledTableCell align="right">{row.floor}</StyledTableCell>
              <StyledTableCell align="right">{row.seatNum}</StyledTableCell>     
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>):null}
       
        <br/>
        <div className="more">
            <h2 className="infoArea"> 좌석 초기화 클릭 시 이용했던 모든 좌석에 대한 <br/> 정보는 <strong class="color">별점 2점</strong>으로 초기화됩니다.</h2>
            <button className="button" onClick={clickMe}>
            좌석 초기화
            </button>
        </div>
      </Table>
    </TableContainer>
        
    );

}
export default Mypage;
