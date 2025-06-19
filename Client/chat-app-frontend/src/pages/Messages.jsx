import React from 'react';
import { Box, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function Messages() {
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
        bgcolor: '#fafafa',
        borderRadius: 3,
      }}
    >
      <ChatBubbleOutlineIcon sx={{ fontSize: 60, color: '#9e9e9e', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#616161' }}>
        💬 No Messages Yet!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: '#757575' }}>
        Start a new conversation and it’ll show up here ✨📬
      </Typography>
    </Box>
  );
}

export default Messages;
