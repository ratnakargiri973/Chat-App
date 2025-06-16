import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { handleAuth } from './token/Auth';
import { Box, Container } from '@mui/material';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    handleAuth(dispatch);
  }, []);

  return (
    <main>
       <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
      }}
    >
     <Box
        sx={{
          flex: 1,
          display: 'flex',
          minHeight: 0,
        }}
      >
        <Container
          sx={{
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
    </main>
  );
}

export default App;
