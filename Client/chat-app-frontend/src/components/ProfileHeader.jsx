import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, useSelector } from 'react-redux';
import { setDivider } from '../redux/slice/dividerSlice';


function ProfileHeader() {
    const dispatch = useDispatch();
    const isDividerOpen = useSelector((state) =>  state.divider.isDividerOpen);

  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        px: 3,
        bgcolor: '#81912a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 1100,
      }}
    >
      <FormatListBulletedIcon sx={{ color: '#fff' }} onClick={() => dispatch(setDivider(!isDividerOpen))}/>
      <Typography variant="h6" color="white" fontWeight="bold">
        True Connect
      </Typography>
      <Avatar />
    </Box>
  );
}

export default ProfileHeader;
