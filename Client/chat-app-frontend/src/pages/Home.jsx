import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import { useSelector } from 'react-redux';
import Divider from '../components/Divider';

function Home() {
  const isDividerOpen = useSelector((state) => state.divider.isDividerOpen);

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
      {/* Header */}
      <ProfileHeader />

      {/* Body Layout */}
      <Box
        sx={{
          display: 'flex',
          mt: '64px', // height of fixed header
          height: 'calc(100vh - 64px)',
        }}
      >
        {/* Divider */}
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

        {/* Sidebar */}
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

        {/* Main Content */}
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: 'block',
            },
            width: isDividerOpen ? 'calc(80% - 60px)' : '80%',
            bgcolor: '#f3e5f5',
            p: 3,
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
