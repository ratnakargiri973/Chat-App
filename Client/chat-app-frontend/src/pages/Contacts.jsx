import React from 'react';
import { Box, Typography } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';

function Contacts() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fefefe',
        borderRadius: 3,
      }}
    >
      <ContactsIcon sx={{ fontSize: 60, color: '#90a4ae', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#455a64' }}>
        📇 No Contacts Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: '#607d8b' }}>
        Add your friends to get started 👥✨
      </Typography>
    </Box>
  );
}

export default Contacts;
