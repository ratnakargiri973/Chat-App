
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid, Typography, Container } from '@mui/material';

function AuthLayout() {
  const HEADER_HEIGHT = 60;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        sx={{
          height: `${HEADER_HEIGHT}px`,
          backgroundColor: '#fff',
          boxShadow: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Box
                component="video"
                src="https://cdn-icons-mp4.flaticon.com/512/7211/7211842.mp4"
                autoPlay
                loop
                muted
                playsInline
                sx={{
                  width: { xs: 40, sm: 50, md: 60 },
                  height: { xs: 40, sm: 50, md: 60 },
                  borderRadius: '8px',
                  objectFit: 'contain',
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  textAlign: 'center',
                }}
              >
                SwiftWhisper
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>


      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          px: 2,
          py: 3,
          minHeight: 0,
        }}
      >
        <Container
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default AuthLayout;
