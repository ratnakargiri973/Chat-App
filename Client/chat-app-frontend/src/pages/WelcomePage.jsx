import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100vw',
        px: { xs: 4, sm: 6, md: 8 },
        backgroundImage: "url('https://tse3.mm.bing.net/th?id=OIP.UVK4ha7b2vY4V0xkVfPllQHaE9&pid=Api&P=0&h=180')",
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize: 'cover',
        textAlign: 'center',
        minHeight: 0,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: '1.8rem',
            sm: '2.5rem',
            md: '3rem',
          },
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3,
        }}
      >
        Welcome Back
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: 500 }}>
        SwiftWhisper helps you connect deeply. Sign in to get started or register if you're new here.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button variant="outlined" color="primary" onClick={() => navigate('/sign-up')}>
          Sign Up
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/log-in')}>
          Log In
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomePage;
