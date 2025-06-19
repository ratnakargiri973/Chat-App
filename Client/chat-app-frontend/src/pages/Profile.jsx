import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardContent,
  Divider,
  Stack,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Profile() {
  const { name, userName, email, phone, profilePic, bio, coverPic } = useSelector(
    (state) => state.user
  );

  return (
    <Card
      sx={{
        maxWidth: 650,
        mx: 'auto',
        my: 5,
        borderRadius: 5,
        boxShadow: 6,
        overflow: 'hidden',
        backgroundColor: '#fdfdfd',
      }}
    >

      <Box
        sx={{
          position: 'relative',
          height: 220,
          backgroundImage: `url(${coverPic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        />
      </Box>


      <Box sx={{ textAlign: 'center', mt: -9 }}>
        <Avatar
          src={profilePic}
          alt={name}
          sx={{
            width: 120,
            height: 120,
            mx: 'auto',
            border: '4px solid white',
            boxShadow: 4,
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="h4" align="center" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary">
          @{userName}
        </Typography>

        {bio && (
          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 2, fontStyle: 'italic', px: 3 }}
          >
            “{bio}”
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 4, mb: 1 }}>
          <EmailIcon color="primary" />
          <Typography variant="body1">{email}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 4 }}>
          <PhoneIcon color="secondary" />
          <Typography variant="body1">{phone}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Profile;
