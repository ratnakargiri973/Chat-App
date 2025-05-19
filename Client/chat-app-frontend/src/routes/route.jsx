import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/ChangePassword';
import VerifyOtp from '../pages/VerifyOtp';
import Home from '../pages/Home';
import Message from '../components/Message';
import AuthLayout from '../layout/AuthLayout';
import WelcomePage from '../pages/WelcomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        element: <AuthLayout />, 
        children: [
          {
            index: true,
            element: <WelcomePage />
          },
          {
            path: 'log-in',
            element: <Login />
          },
          {
            path: 'sign-up',
            element: <Register />
          },
          {
            path: 'log-out',
            element: <Logout />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'verify-otp',
            element: <VerifyOtp />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          },
          {
            path:"home",
            element: <Home />,
            children: [
              {
                path: ':userId',
                element: <Message />
              }
            ]
          }
        ]
      },
    ]
  }
]);

export default router;
