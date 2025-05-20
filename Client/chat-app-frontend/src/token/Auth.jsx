
import instance from '../AxiosConfig/AxiosConfig';
import { setUser } from '../redux/slice/userSlice';

export const handleAuth = async (dispatch) => {
  try {
    const response = await instance.get('auth/valid-token', {
      withCredentials: true,
    });

    console.log('Auth Response:', response.data);

    if (response.data.success) {
      dispatch(setUser(response.data.user));
    }
  } catch (error) {
    console.error('Auth failed:', error.response?.data || error.message);
  }
};
