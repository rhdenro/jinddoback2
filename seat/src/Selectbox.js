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


}

