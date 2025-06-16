import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green } from '@mui/material/colors';

function Sidebar() {
  const [searchVal, setSearchVal] = useState('');

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
      {/* Add Button */}
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
          Contacts
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

      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            height: 48,
            backgroundColor: '#fff',
          },
        }}
      />

      {/* Placeholder for contacts or items */}
      <Box
        sx={{
          width: '100%',
          mt: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No contacts yet.
        </Typography>
      </Box>
    </Box>
  );
}

export default Sidebar;
