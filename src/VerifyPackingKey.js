import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCSRFToken, getAccessToken, verifyUserPackingKey, getPasswordsList } from './store/actions/usersActions';
import Copyright from './Copyright';

import axios from 'axios';
import querystring from 'querystring';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export function VerifyPackingKey({ savePackingKey, name, setRowsState }) {
  const [packingKey, setPackingKey] = useState();
  const dispatch = useDispatch();
  const user_state = useSelector(state => state.user_state);
  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await dispatch(verifyUserPackingKey(data.get('packing-key'), user_state.csrf, user_state.access_token));
    let newRows = await dispatch(getPasswordsList(user_state.access_token, name, 0, 10));
    savePackingKey(true);
    setRowsState((prev) => ({ ...prev, rows: newRows }));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="packing-key"
              label="Packing key"
              type="password"
              id="packing-key"
              autoComplete="current-packing-key"
              onChange={e => setPackingKey(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps  = (state) => ({user_state:state.user_state})

export default connect(mapStateToProps)(VerifyPackingKey)

VerifyPackingKey.propTypes = {
  savePackingKey: PropTypes.func.isRequired
}
