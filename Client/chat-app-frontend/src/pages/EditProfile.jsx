import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import instance from '../AxiosConfig/AxiosConfig';
import { setUser } from '../redux/slice/userSlice';

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: user.name || '',
    userName: user.userName || '',
    email: user.email || '',
    phone: user.phone || '',
    bio: user.bio || '',
    profilePic: user.profilePic || '',
    coverPic: user.coverPic || '',
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      if (profileImageFile) data.append('profileImage', profileImageFile);
      if (coverImageFile) data.append('coverImage', coverImageFile);

      const response = await instance.put('user/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      dispatch(setUser(response.data.user));

      navigate('/home/profile');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/home/profile');
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        mt: 4,
        mb: 4,
        p: 2,
        borderRadius: 5,
        boxShadow: 6,
        backgroundColor: '#fdfdfd',
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Edit Profile
        </Typography>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Avatar
            src={formData.profilePic}
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 2,
              border: '3px solid #ccc',
            }}
          />
        </Box>

        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            fullWidth
          />
          <TextField
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Update Profile Picture
            </Typography>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Choose Profile Image
              <input
                type="file"
                accept="image/*"
                name="profileImage"
                hidden
                onChange={(e) => setProfileImageFile(e.target.files[0])}
              />
            </Button>
            {profileImageFile && (
              <Typography variant="caption" color="text.secondary">
                Selected: {profileImageFile.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Update Cover Picture
            </Typography>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Choose Cover Image
              <input
                type="file"
                accept="image/*"
                name="coverImage"
                hidden
                onChange={(e) => setCoverImageFile(e.target.files[0])}
              />
            </Button>
            {coverImageFile && (
              <Typography variant="caption" color="text.secondary">
                Selected: {coverImageFile.name}
              </Typography>
            )}
          </Box>


        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleUpdate}
          >
            Save
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default EditProfile;
