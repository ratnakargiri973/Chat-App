import React, { useEffect, useState, useRef } from 'react';
import {
  Avatar as MuiAvatar,
  Box,
  Button,
  Typography,
  Fade,
  Grow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import instance from '../AxiosConfig/AxiosConfig';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const { name, profilePic } = useSelector((state) => state.user);
  const [showLogout, setShowLogout] = useState(false);
  const [bgColor, setBgColor] = useState('lightgray');
  const avatarRef = useRef();
  const navigate = useNavigate();

  const muiColors = [
    '#e0f7fa', '#b2ebf2', '#b3e5fc', '#c8e6c9',
    '#ffe0b2', '#ffcdd2', '#f0f4c3', '#e1bee7', '#d7ccc8',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * muiColors.length);
      setBgColor(muiColors[random]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let avatarInitials = '';
  if (name) {
    const splitName = name.trim().split(' ');
    avatarInitials =
      splitName.length > 1
        ? splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase()
        : splitName[0][0].toUpperCase();
  }

  async function handleLogout(){
    try {
      const response = await instance.post('user/logout', {}, {withCredentials: true});
      navigate('/log-in');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      position="relative"
      ref={avatarRef}
      sx={{ cursor: 'pointer' }}
    >
      {profilePic ? (
        <MuiAvatar
          alt={name}
          src={profilePic}
          sx={{
            width: 40,
            height: 40,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.1)' },
          }}
          onClick={() => setShowLogout((prev) => !prev)}
        />
      ) : (
        <MuiAvatar
          sx={{
            bgcolor: bgColor,
            width: 40,
            height: 40,
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.1)' },
          }}
          onClick={() => setShowLogout((prev) => !prev)}
        >
          {avatarInitials}
        </MuiAvatar>
      )}

      <Typography fontWeight="bold" color="white" sx={{ userSelect: 'none' }}>
        {name}
      </Typography>

      <Grow in={showLogout}>
        <Box
          sx={{
            position: 'absolute',
            top: '60px',
            right: 0,
            bgcolor: '#ffffff',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            zIndex: 1000,
            p: 1.5,
            minWidth: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: '#333', fontWeight: 500 }}
          >
            Hi, {name?.split(' ')[0] || 'User'}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            fullWidth
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              fontWeight: 500,
            }}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Box>
      </Grow>
    </Box>
  );
}

export default Avatar;
