import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Divider() {
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
        <IconButton>
          <MessageIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Contacts" placement="right">
        <IconButton>
          <ContactsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Profile" placement="right">
        <IconButton>
          <AccountBoxIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default Divider;
