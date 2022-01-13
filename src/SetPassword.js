import * as React from 'react';
import { useDispatch, connect } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
import Copyright from './Copyright';
import { resetPass } from './store/actions/usersActions';
import PropTypes from 'prop-types';

const theme = createTheme();

export function SetPassword() {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  var name = searchParams.get("name")
  var pass = searchParams.get("pass")

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await dispatch(resetPass(name, pass, data.get('password')));
    navigate("/", { replace: true });
  };

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
            Set your password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  required
                  fullWidth
                  id="user-id"
                  label="User ID"
                  name="user-id"
                  autoComplete="user-id"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="retype-password"
                  label="Retype Password"
                  type="password"
                  id="retype-password"
                  autoComplete="retype-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="packing-key"
                  label="Packing key"
                  type="password"
                  id="packing-key"
                  autoComplete="packing-key"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="retype-packing-key"
                  label="Retype packing key"
                  type="password"
                  id="retype-packing-key"
                  autoComplete="retype-packing-key"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps  = (state) => ({user_state:state.user_state})

export default connect(mapStateToProps)(SetPassword)
