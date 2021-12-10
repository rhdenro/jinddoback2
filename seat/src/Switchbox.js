import * as React from 'react';
import {useState} from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './Switchbox.css';
import axios from 'axios';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
function CustomizedSwitches(props) {
  const [textArea, setTextArea] = useState(props.textArea);
  const [states,setStates] = useState(props.states);
  const [seatInfo, setSeatInfo] = useState({});
  async function onClick(e,text){
    alert(text.value); // text.value = 우대인원 내부 텍스트
    alert(states); //states = 3가지 체크박스
    let isPrefer = false;
    if(text.value !== ""){
      isPrefer = true
    }
    await axios.post(process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT+'/db/recommendation',{
      userid: sessionStorage.getItem('userId'),
      text: text.value,
      isEdge: states[0],
      isPc: states[1],
      isConcent: states[2],
      isPreference: isPrefer
    },{
      'Access-Contorl-Allow-Credentials': "true",
      withCredentials: true
  }).then(result => {
    console.log(result);
    props.onChange(result);
  })
  }
  return (
    <FormGroup>
       
        <Stack direction="row" spacing={1} alignItems="center" fontFamily="ugro">

        <label> 가장자리 </label>
        <Typography>Off</Typography>
        <AntSwitch id="test" onChange = {props.onChange} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
        
        <label> 컴퓨터 사용 </label>
        <Typography>Off</Typography>
        <AntSwitch id="test2" onChange = {props.onChange} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>

        <label> 콘센트 유무 </label>
        <Typography>Off</Typography>
        <AntSwitch id="test3" onChange = {props.onChange} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography>On</Typography>
        
        <input type="hidden" id="textArea" value={props.value} />
        <div className="btn">
          <button onClick = {(e) => {onClick(e, document.getElementById('textArea'))}}> 
          <h4> 조회하기 </h4> </button> 
        </div>
        
      </Stack>
      
    </FormGroup>
  );
}

export default CustomizedSwitches;