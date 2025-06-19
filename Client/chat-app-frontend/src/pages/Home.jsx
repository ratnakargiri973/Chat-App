import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Paper, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import { useSelector } from 'react-redux';
import Divider from '../components/Divider';
import Profile from './Profile';

function Home() {
  const isDividerOpen = useSelector((state) => state.divider.isDividerOpen);
  const isProfileOpen = useSelector((state) => state.profile.isProfileOpen);
  const navigate = useNavigate();
  const location = useLocation();

  const isSmallOrMedium = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (!isSmallOrMedium) {
      if (isProfileOpen) {
        navigate('/home/profile');
      } else {
        navigate('/home');
      }
    }
  }, [isProfileOpen, navigate, isSmallOrMedium]);

  if (isSmallOrMedium && isProfileOpen) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ProfileHeader />

        <Box
          sx={{
            display: 'flex',
            mt: '50px',
            height: 'calc(100vh - 50px)',
          }}
        >
          {isDividerOpen && (
            <Box
              sx={{
                width: '60px',
                height: '100%',
                bgcolor: '#f0f4c3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRight: '1px solid #ccc',
                flexShrink: 0,
              }}
            >
              <Divider />
            </Box>
          )}

          <Box
            sx={{
              width: isDividerOpen ? 'calc(100% - 60px)' : '100%',
              p: 3,
              overflowY: 'auto',
              bgcolor: '#f3e5f5',
            }}
          >
            <Profile />
          </Box>
        </Box>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ProfileHeader />
      <Box
        sx={{
          display: 'flex',
          mt: '50px',
          height: 'calc(100vh - 50px)',
        }}
      >
        {isDividerOpen && (
          <Box
            sx={{
              width: '60px',
              height: '100%',
              bgcolor: '#f0f4c3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRight: '1px solid #ccc',
            }}
          >
            <Divider />
          </Box>
        )}

        <Box
          sx={{
            width: {
              xs: isDividerOpen ? 'calc(100% - 60px)' : '100%',
              lg: isDividerOpen ? '18%' : '20%',
            },
            height: '100%',
            overflowY: 'auto',
            flexShrink: 0,
            bgcolor: '#ffe0e6',
          }}
        >
          <Sidebar />
        </Box>

        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'block',
            },
            width: isDividerOpen ? 'calc(82% - 60px)' : '80%',
            bgcolor: '#f3e5f5',
            p: 3,
            overflowY: 'auto',
          }}
        >
          {location.pathname === '/home' ? (
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 4,
                background: 'linear-gradient(135deg, #e1bee7, #ce93d8)',
                color: '#4a148c',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                mt: 10,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                👋 Welcome to Chat Board
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                Select a message, contact, or view your profile from the sidebar.
              </Typography>
            </Paper>
          ) : (
            <Outlet />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
