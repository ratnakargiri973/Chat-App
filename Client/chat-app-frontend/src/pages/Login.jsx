import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Link as MuiLink,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import instance from '../AxiosConfig/AxiosConfig';
import { ToastContainer, toast } from 'react-toastify';



function Login() {
  const [loginInfo, setLoginInfo] = useState({
    emailOrPhoneOrUserName: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const notify = (msg) => toast.success(msg);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const response = await instance.post('user/login', loginInfo);

    console.log('Login success:', response.data);

    notify(response?.data?.message || "Login Successful");

    // await handleAuth(dispatch);

    setTimeout(() => {
      navigate('/home');
    }, 1500);
  
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || 'Login failed. Please try again.';
    setMessage(errMsg);
    toast.error(errMsg); 
  } finally {
    setLoading(false);
  }
};

  

  return (
    <Box
      sx={{
        flex: 1,
        width: '100vw',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundImage:
          "url('https://wallpapers.com/images/high/whatsapp-chat-falling-cherry-blossom-petals-x7o00wdbf0pndtqu.webp')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        // borderRadius: '10px',
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
            maxWidth: 400,
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            borderTopLeftRadius: '20%',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            backgroundImage:
              "url('https://tse4.mm.bing.net/th?id=OIP.KgB4iWwED9A8Gc9kvAsxsgHaEK&pid=Api&P=0&h=180')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundColor: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant={isSmallScreen ? 'h5' : 'h4'}
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#1976d2' }}
            >
              Welcome Back
            </Typography>

            {message && (
              <Typography
                align="center"
                sx={{ color: 'red', mb: 2, fontSize: 14 }}
              >
                {message}
              </Typography>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                name="emailOrPhoneOrUserName"
                label="Email or Phone or User name"
                variant="standard"
                type="text"
                value={loginInfo.emailOrPhoneOrUserName}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                variant="standard"
                value={loginInfo.password}
                onChange={handleChange}
                fullWidth
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 0 },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                  }
                  label="Remember Me"
                />
                <MuiLink
                  component={RouterLink}
                  to="/forgot-password"
                  underline="hover"
                  sx={{ fontSize: 14, color: '#1976d2' }}
                >
                  Forgot Password?
                </MuiLink>
              </Box>

              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                size={isSmallScreen ? 'medium' : 'large'}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Let's Go
              </LoadingButton>

              <Typography align="center" sx={{ mt: 2 }}>
                Don’t have an account?{' '}
                <MuiLink
                  component={RouterLink}
                  to="/sign-up"
                  underline="hover"
                  sx={{ fontWeight: 500 }}
                >
                  Sign up
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}

export default Login;
