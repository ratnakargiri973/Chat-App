import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import Contacts from './Contacts';
import Messages from './Messages';

function Sidebar() {
  const [searchVal, setSearchVal] = useState('');
  const isMessageOpen = useSelector((state) => state.message.isMessageOpen);
  const isContactOpen = useSelector((state) => state.contact.isContactOpen);

  const showMessages = isMessageOpen || (!isMessageOpen && !isContactOpen);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        bgcolor: '#ffe0e6',
      }}
    >
     
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          backgroundColor: '#ffcccb',
          borderRadius: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" sx={{ ml: 1, fontWeight: 500 }}>
          {showMessages ? 'Messages' : 'Contacts'}
        </Typography>
        <AddCircleIcon
          sx={{
            fontSize: 32,
            color: green[500],
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              color: green[700],
            },
          }}
        />
      </Box>

      <TextField
        fullWidth
        label="Search"
        id="fullWidth"
        variant="outlined"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '40px',
            borderRadius: '20px',
            paddingTop: '0px',
          },
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
            height: '100%',
            boxSizing: 'border-box',
          },
          '& .MuiInputLabel-root': {
            top: '-6px',
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        }}
      />

      <Box
        sx={{
          width: '100%',
          mt: 2,
          textAlign: 'center',
        }}
      >
        {showMessages ? (
          <Messages />
        ) : (
          <Contacts />
        )}
      </Box>
    </Box>
  );
}

export default Sidebar;
