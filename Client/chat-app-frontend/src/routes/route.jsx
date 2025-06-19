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
// import AuthLayout from '../layout/AuthLayout';
import WelcomePage from '../pages/WelcomePage';
import Profile from '../pages/Profile';
import Contacts from '../pages/Contacts';
import Messages from '../pages/Messages'
import ProtectedRoute from './ProtectedRoute';
import EditProfile from '../pages/EditProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
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
        element: <ProtectedRoute />, 
        children: [
          {
            path: 'home',
            element: <Home />,
            children: [
              { path: ':userId', element: <Messages /> },
              { path: 'profile', 
                element: <Profile />,
                children:[ 
                  { path: 'edit-profile', element: <EditProfile />}
                ] },
              { path: 'contacts', element: <Contacts /> },
              { path: 'message', element: <Messages /> },
            ],
          },
        ],
      },
        ]
     },
]);

export default router;
