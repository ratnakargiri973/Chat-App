import React from 'react';
import { Box, IconButton, Link, Tooltip } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/slice/profileSlice';
// import { useNavigate } from 'react-router-dom';


function Divider() {
  const dispatch = useDispatch();
  const isProfileOpen = useSelector((state) => state.profile.isProfileOpen);
  return (
    <Box
      sx={{
        width: '60px',
        height: '100%',
        bgcolor: '#f0f4c3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 2,
        borderRight: '1px solid #ccc',
      }}
    >
      <Tooltip title="Messages" placement="right">
        <IconButton component={Link} to="/home">
          <MessageIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Contacts" placement="right">
        <IconButton component={Link} to="/home/contacts">
          <ContactsIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Profile" placement="right">
        <IconButton onClick={() => dispatch(setProfile(!isProfileOpen))}>
          <AccountBoxIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default Divider;
