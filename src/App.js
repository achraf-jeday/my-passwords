import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCSRFToken, getAccessToken, verifyUserPackingKey, getPasswordsList, getPassword, updatePasswordAction, deletePasswordAction } from './store/actions/usersActions';
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

function AlertDialog({entry, rowsState, setRowsState}) {

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const [metatag, setMetatag] = useState("");
  const [notes, setNotes] = useState("");

  const [open, setOpen] = useState(false);
  const user_state = useSelector(state => state.user_state);
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

  const updatePassword = async event => {
    event.preventDefault();
    var data = new FormData(event.currentTarget);
    var fields = [];
    for (var [key, value] of data.entries()) {
      fields[key] = value;
    }
    fields['uuid'] = entry.getValue(entry.id, 'uuid');

    setOpen(false);

    (async () => {
      setRowsState((prev) => ({ ...prev, loading: true }));
      var csrf = await dispatch(getCSRFToken());
      var response = await dispatch(updatePasswordAction(csrf, user_state.access_token, fields));
      let target = entry.id % rowsState.pageSize;
      if (target != 0) {
        --target;
      }
      rowsState.rows[target].name = fields['name'];
      rowsState.rows[target].field_user_id = fields['user-id'];
      rowsState.rows[target].field_password = fields['password'];
      rowsState.rows[target].field_link = fields['link'];
      rowsState.rows[target].field_email = fields['email'];
      rowsState.rows[target].metatag = fields['tags'];
      rowsState.rows[target].field_notes = fields['notes'];
      let changed = new Date(response.data.data.attributes.changed);
      changed = changed.toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit"
      });
      rowsState.rows[target].changed = changed;
      const newRows = await refreshRows(
        rowsState,
      );
      setRowsState((prev) => ({ ...prev, loading: false, rows: newRows }));
    })();
  };

  const deletePassword = async () => {
    let uuid = entry.getValue(entry.id, 'uuid');

    (async () => {
      setRowsState((prev) => ({ ...prev, loading: true }));
      var csrf = await dispatch(getCSRFToken());
      await dispatch(deletePasswordAction(csrf, user_state.access_token, uuid));
      const newRows = await loadServerRows(
        dispatch,
        user_state.access_token,
        rowsState.page,
        rowsState.pageSize,
      );
      setRowsState((prev) => ({ ...prev, loading: false, rows: newRows }));
    })();
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
        <IconButton onClick={deletePassword} color="primary" aria-label="Edit entry" component="span">
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
        <Box
          component="form"
          onSubmit={updatePassword}
          noValidate
          autoComplete="off"
        >
          <DialogTitle id="alert-dialog-title">
            {"Entry Details"}
          </DialogTitle>
          <DialogContent>
              <br />
              <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid container item spacing={2} xs={6} direction={"column"} justifyContent="center" alignItems="center">
                  <Grid item style={{ width: '90%' }}>
                    <TextField
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      size="small"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ width: '90%' }}>
                    <TextField
                      fullWidth
                      id="user-id"
                      label="User ID"
                      name="user-id"
                      size="small"
                      value={userId}
                      onChange={e => setUserId(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ width: '90%' }}>
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      size="small"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ width: '90%' }}>
                    <TextField
                      fullWidth
                      id="link"
                      label="Link"
                      name="link"
                      size="small"
                      value={link}
                      onChange={e => setLink(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ width: '90%' }}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      size="small"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item style={{ width: '90%' }}>
                    <TextField
                      fullWidth
                      id="tags"
                      label="Tags"
                      name="tags"
                      size="small"
                      value={metatag}
                      onChange={e => setMetatag(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={2} xs={6} direction={"column"} justifyContent="center" alignItems="center">
                  <Grid item style={{ width: '90%' }}>
                    <TextField
                      fullWidth
                      id="notes"
                      label="Notes"
                      name="notes"
                      size="small"
                      multiline
                      rows={8}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

const loadServerRows = (dispatch, access_token, page, page_size) =>
  new Promise((resolve) => {
    resolve(dispatch(getPasswordsList(access_token, page, page_size)));
  });

const refreshRows = (rowsState) =>
  new Promise((resolve) => {
    resolve(rowsState.rows);
  });

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const user_state = useSelector(state => state.user_state);
  const dispatch = useDispatch();

  const [rowsState, setRowsState] = React.useState({
    page: 0,
    pageSize: 10,
    rows: [],
    loading: false,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'name', width: 600 },
    { field: 'field_email', headerName: 'Email', width: 150 , hide: true },
    { field: 'field_link', headerName: 'Link', width: 150 , hide: true },
    { field: 'field_user_id', headerName: 'User ID', width: 150 , hide: true },
    { field: 'field_password', headerName: 'Password', width: 150 , hide: true },
    { field: 'field_notes', headerName: 'Notes', width: 600, hide: true },
    { field: 'metatag', headerName: 'Metatag', width: 150, hide: true },
    { field: 'uuid', headerName: 'UUID', width: 150, hide: true },
    { field: 'changed', headerName: 'Changed', width: 200 },
    { field: 'created', headerName: 'Created', width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return <AlertDialog entry={params} rowsState={rowsState} setRowsState={setRowsState} />;
      }
    }
  ];

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
