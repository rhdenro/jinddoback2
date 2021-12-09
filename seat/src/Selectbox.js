import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Selectbox.css';

function ComboBox(props) {
  const [textArea, setTextArea] = useState("");
  const onChange = event => {
    props.onChange(event, textArea);
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={selectfirstseat}
      onChange = {onChange}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} value={document.getElementById('conbo-box-demo')} label="우대인원" />}
    />
  );
}
export default ComboBox;


