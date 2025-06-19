// utils/handleAuth.js
import instance from '../AxiosConfig/AxiosConfig';
import { setUser } from '../redux/slice/userSlice';

export const handleAuth = async (dispatch) => {
  try {
    const response = await instance.get('auth/valid-token', {
      withCredentials: true,
    });

    const userData = response.data.user;

    dispatch(setUser({
      name: userData.name,
      userName: userData.userName,
      email: userData.email,
      phone: userData.phone,
      profilePic: userData.profilePic,
      coverPic: userData.coverPic,
      bio: userData.bio
    }));

    return true; 
  } catch (error) {
    console.error('Auth failed:', error.response?.data || error.message);
    return false; 
  }
};
