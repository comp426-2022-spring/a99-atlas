import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const SignUp = ({ setUID, toggleSignIn }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = data.get('email');
    const password = data.get('password');
    const confirmPass = data.get('confirm-password');

    let hasError = false;
    if (email === "") {
      setEmailError("Email is required");
      hasError = true;
    }
    if (password === "") {
      setPasswordError("Password is required");
      hasError = true;
    }
    if (confirmPass !== password) {
      setConfirmError("Passwords do not match");
      hasError = true;
    }

    if (!hasError) {
      console.log({
        email: data.get('email'),
        password: data.get('password'),
        confirm_password: data.get('confirm-password')
      });
    }
  };

  return (
    <div>
        <Container component="main" maxWidth="xs" sx={style}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={emailError !== ""}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError !== ""}
                helperText={passwordError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-current-password"
                error={confirmError !== ""}
                helperText={confirmError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Button onClick={toggleSignIn} variant="text">
                {"Don't have an account? Sign Up"}
              </Button>
            </Box>
          </Box>
        </Container>
    </div>
  )
}