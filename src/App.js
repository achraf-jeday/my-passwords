import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCSRFToken, getAccessToken, verifyUserPackingKey, getPasswordsList, getPassword } from './store/actions/usersActions';
import querystring from 'querystring';
import StickyFooter from './StickyFooter';
import SignIn from './SignIn';
import ResponsiveAppBar from './ResponsiveAppBar';
import './App.css';

import { useDemoData } from '@mui/x-data-grid-generator';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';

function AlertDialog({entry}) {

  const [name, setName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [link, setLink] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [metatag, setMetatag] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = async () => {
    try {
      setName(entry.getValue(entry.id, 'name') ?? '');
      setUserId(entry.getValue(entry.id, 'field_user_id') ?? '');
      setPassword(entry.getValue(entry.id, 'field_password') ?? '');
      setLink(entry.getValue(entry.id, 'field_link') ?? '');
      setEmail(entry.getValue(entry.id, 'field_email') ?? '');
      setMetatag(entry.getValue(entry.id, 'metatag') ?? '');
      setNotes(entry.getValue(entry.id, 'field_notes') ?? '');
    } catch (error) {
      console.log(error);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <label>
        <IconButton onClick={handleClickOpen} color="primary" aria-label="Edit entry" component="span">
          <EditIcon />
        </IconButton>
      </label>
      <label>
        <IconButton onClick={handleClickOpen} color="primary" aria-label="Edit entry" component="span">
          <DeleteForeverIcon />
        </IconButton>
      </label>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {"Entry Details"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <br />
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
              <Grid container item spacing={2} xs={6} direction={"column"} justifyContent="center" alignItems="center">
                <Grid item style={{ width: '90%' }}>
                  <TextField fullWidth id="name" label="Name" size="small" value={name} />
                </Grid>
                <Grid item style={{ width: '90%' }}>
                  <TextField fullWidth id="user-id" label="User ID" size="small" value={userId} />
                </Grid>
                <Grid item style={{ width: '90%' }}>
                  <TextField fullWidth id="password" label="Password" size="small" type="password" value={password} />
                </Grid>
                <Grid item style={{ width: '90%' }}>
                  <TextField fullWidth id="link" label="Link" size="small" value={link} />
                </Grid>
                <Grid item style={{ width: '90%' }}>
                  <TextField fullWidth id="email" label="Email" size="small" value={email} />
                </Grid>
                <Grid item style={{ width: '90%' }}>
                  <TextField fullWidth id="tags" label="Tags" size="small" value={metatag} />
                </Grid>
              </Grid>
              <Grid container item spacing={2} xs={6} direction={"column"} justifyContent="center" alignItems="center">
                <Grid item style={{ width: '90%' }}>
                  <TextField
                    fullWidth
                    id="notes"
                    label="Notes"
                    size="small"
                    multiline
                    rows={8}
                    value={notes}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const loadServerRows = (dispatch, access_token, page, page_size) =>
  new Promise((resolve) => {
    resolve(dispatch(getPasswordsList(access_token, page, page_size)));
  });

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const user_state = useSelector(state => state.user_state);
  const dispatch = useDispatch();

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'field_email', headerName: 'Email', width: 150 },
    { field: 'field_link', headerName: 'Link', width: 150 },
    { field: 'field_user_id', headerName: 'User ID', width: 150 },
    { field: 'field_password', headerName: 'Password', width: 150 },
    { field: 'field_notes', headerName: 'Notes', width: 600, hide: true },
    { field: 'metatag', headerName: 'Metatag', width: 150, hide: true },
    { field: 'changed', headerName: 'Changed', width: 150 },
    { field: 'created', headerName: 'Created', width: 150 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return <AlertDialog entry={params} />;
      }
    }
  ];

  const [rowsState, setRowsState] = React.useState({
    page: 0,
    pageSize: 10,
    rows: [],
    loading: false,
  });

  React.useEffect(() => {
  }, []);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    let active = true;

    (async () => {
      setRowsState((prev) => ({ ...prev, loading: true }));

      const newRows = await loadServerRows(
        dispatch,
        user_state.access_token,
        rowsState.page,
        rowsState.pageSize,
      );

      if (!active) {
        return;
      }
      setRowsState((prev) => ({ ...prev, loading: false, rows: newRows }));
    })();

    return () => {
      active = false;
    };

  }, [rowsState.page, rowsState.pageSize]);

  if(!loggedIn) {
    return <SignIn setLoggedIn={setLoggedIn} setRowsState={setRowsState} />
  }

  return (
    <div className = "App" >
      <React.Fragment>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
        <ResponsiveAppBar setLoggedIn={setLoggedIn} />
          <div className="wrapper">
            <br />
            <br />
            <div
              style={{
                  display: 'flex',
                  justifyContent: 'center'
              }}
            >
              <div
                style={{
                    height: 650,
                    width: '90%'
                }}
              >
                <DataGrid
                  columns={columns}
                  pagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  rowCount={parseInt(user_state.count, 10)}
                  {...rowsState}
                  paginationMode="server"
                  onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
                  onPageSizeChange={(pageSize) =>
                    setRowsState((prev) => ({ ...prev, pageSize }))
                  }
                />
              </div>
            </div>
            <br />
            <br />
          </div>
          <StickyFooter />
        </Box>
      </React.Fragment>
    </div>
  );
}

export default App;
