import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardContent,
  Divider,
  Stack,
  IconButton,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { setProfile } from '../redux/slice/profileSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';

function Profile() {
  const { name, userName, email, phone, profilePic, bio, coverPic } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleEdit = () => {
    navigate('edit-profile');
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        mb: 4,
        borderRadius: 5,
        boxShadow: 6,
        overflow: 'hidden',
        backgroundColor: '#fdfdfd',
        position: 'relative',
      }}
    >

      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <IconButton onClick={() => dispatch(setProfile(false))} sx={{ color: 'red' }}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          height: 220,
          backgroundImage: `url(${coverPic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
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

      <CardContent sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{
              mt: 1,
              mr: 1,
              textTransform: 'none',
              borderRadius: 4,
              boxShadow: 1,
            }}
          >
            Edit
          </Button>
        </Box>

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
      {location.pathname === '/home/profile/edit-profile' && <EditProfile />}
      
    </Card>
  );
}

export default Profile;
