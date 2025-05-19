import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Link as MuiLink,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import instance from '../AxiosConfig/AxiosConfig';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (profilePic) {
        data.append('image', profilePic);
      }

      const response = await instance.post('user/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Registered user:', response.data);
      setFormData({
        name: '',
        userName: '',
        email: '',
        phone: '',
        password: '',
      });
      setProfilePic(null);
      navigate('/log-in');
    } catch (error) {
      const errMsg = error?.response?.data?.message || 'Registration failed. Try again.';
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        width: '98vw',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundImage:
          "url('https://wallpapers.com/images/thumbnail/samsung-galaxy-s7-edge-fiber-optics-tfzkecbjvsho4br4.webp')",
        backgroundSize: 'cover',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 450,
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            backgroundImage:
              "url('https://wallpapers.com/images/thumbnail/white-pastel-r7ui2jy4iahczxs0.webp')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h5' : 'h4'}
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2' }}
          >
            Register
          </Typography>

          {message && (
            <Typography align="center" sx={{ color: 'red', mb: 2 }}>
              {message}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField name="name" label="Full Name" variant="standard" fullWidth value={formData.name} onChange={handleChange} />
            <TextField name="userName" label="Username" variant="standard" fullWidth value={formData.userName} onChange={handleChange} />
            <TextField name="email" label="Email" type="email" variant="standard" fullWidth value={formData.email} onChange={handleChange} />
            <TextField name="phone" label="Phone" type="text" variant="standard" fullWidth value={formData.phone} onChange={handleChange} />
            <TextField name="password" label="Password" type="password" variant="standard" fullWidth value={formData.password} onChange={handleChange} />
            <Button component="label" variant="outlined">
              Upload Profile Picture
              <input type="file" name='image' hidden accept="image/*" onChange={handleFileChange} />
            </Button>

            <LoadingButton type="submit" loading={loading} variant="contained" fullWidth>
              Register
            </LoadingButton>
          </Box>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <MuiLink component={RouterLink} to="/log-in" underline="hover" sx={{ fontWeight: 500 }}>
              Log in
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
