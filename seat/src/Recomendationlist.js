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

