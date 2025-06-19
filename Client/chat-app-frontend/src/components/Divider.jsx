import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/slice/profileSlice';
import { setContact } from '../redux/slice/contactSlice';
import { setMessage } from '../redux/slice/messageSlice';

function Divider() {
  const dispatch = useDispatch();
  // const isProfileOpen = useSelector((state) => state.profile.isProfileOpen);
  // const isMessageOpen = useSelector((state) => state.message.isMessageOpen);
  // const isContactOpen = useSelector((state) => state.contact.isContactOpen);

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
        <IconButton
          onClick={() => {
            dispatch(setMessage(true));
            dispatch(setContact(false));
            dispatch(setProfile(false));
          }}
        >
          <MessageIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Contacts" placement="right">
        <IconButton
          onClick={() => {
            dispatch(setContact(true));
            dispatch(setMessage(false));
            dispatch(setProfile(false));
          }}
        >
          <ContactsIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Profile" placement="right">
        <IconButton
          onClick={() => {
            dispatch(setProfile(true));
            dispatch(setMessage(false));
            dispatch(setContact(false));
          }}
        >
          <AccountBoxIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default Divider;
