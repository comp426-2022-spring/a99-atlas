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

export const SignIn = ({ setUID, toggleSignIn }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Fire when submit button is pressed
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    // Check for user input error
    let hasError = false;
    if (email === "") {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      try { // Attempt to login user
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
        };
        const response = await fetch('http://localhost:5555/app/login', requestOptions);
        const data = await response.json();
        if (response.status === 200) { // On success save the user id provided by backend
          setUID(data[0]['nanoid'])
        } else {
          setEmailError(data)
          setPasswordError(data)
        }
      } catch (error) {
        console.log(error);
        setEmailError("Unexpected error occured, check console for info");
      }
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
              Sign in
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
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
