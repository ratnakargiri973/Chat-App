import React, { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import instance from '../AxiosConfig/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await instance.post("user/forgot-password", { email });
      navigate('/verify-otp');
    } catch (error) {
      console.log("Something went wrong! " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: '100vw',
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1674729243673-0b5e871a8a24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hhdCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: {
            xs: '90%',
            sm: '70%',
            md: '50%',
            lg: '40%',
            xl: '30%',
          },
          maxWidth: 500,
          textAlign: 'center',
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681277840121-8bb80ef78bc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hhdCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <TextField
          name="email"
          label="Email"
          variant="standard"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={Loading}
          sx={{ mt: 2 }}
          fullWidth
        >
          Send OTP
        </LoadingButton>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
