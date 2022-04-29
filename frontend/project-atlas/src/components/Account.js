import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const Account = ({ openAccount, setOpenAccount, uid, setUID }) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  // Fire on submit to update user info
  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');
    const confirmPass = data.get('confirm-password');

    // Check if error with user input
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
    if (confirmPass !== password) {
      setConfirmError("Passwords do not match");
      hasError = true;
    } else {
      setConfirmError("");
    }

    if (!hasError) {
      try { // Attempt to update user info
        console.log(email);
        console.log(password);
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
        };
        const response = await fetch(`http://localhost:5555/app/update/user/${uid}`, requestOptions);
        const data = await response.json();
        if (response.status === 200) {
          console.log(data)
          setOpenAccount(false);
        } else {
          setEmailError(data)
        }
      } catch (error) {
        console.log(error);
        setEmailError("Unexpected error occured, check console for info");
      }
    }
  };

  // Handle user deletion if delete button pressed
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`http://localhost:5555/app/delete/user/${uid}`, requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setUID("");
        setOpenAccount(false);
      } else {
        throw Error(data);
      }
    } catch (error) {
      console.log(error);
      setEmailError("Deletion unsuccessful, check console for more info");
    }
  }


  useEffect(() => { // Get user data each time userid changes or accounts page opened
    async function fetchData(uid) {
      try {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`http://localhost:5555/app/info/user/${uid}`, requestOptions);
        let resp = await response.json();
        if (response.status === 200) {
          setCurrentEmail(resp[0]['email']);
        } else {
          throw Error("Unknown error occurred when getting map data from server");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (uid !== "") {
      fetchData(uid);
    }
  }, [openAccount, uid]);
  

  return (
    <Modal
      open={openAccount}
      onClose={() => setOpenAccount(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
            Account Info
          </Typography>
          <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              defaultValue={currentEmail}
              error={emailError !== ""}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password"
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
              Update Info
            </Button>
            <Button
              onClick={handleDelete}
              fullWidth
              variant="contained"
              sx={{ mb: 2, bgcolor: '#f44336', '&:hover': {backgroundColor: '#ba000d'} }}
            >
              Delete Account
            </Button>
            <Button onClick={() => setOpenAccount(false)} variant="text">
              {"Close"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  )
}
