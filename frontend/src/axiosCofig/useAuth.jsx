import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../redux/authSlice/AuthSlice';
import useRefreshToken from './useRefreshToken';
import { useNavigate } from 'react-router-dom';
const useAuth = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const refresh = useRefreshToken();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const accessToken = await refresh();
         console.log(accessToken,'access')
        if (!accessToken) {
        navigate("/fuck")
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };

    if (!isAuthenticated) {
      authenticate();
    }
  }, [isAuthenticated, dispatch, refresh]);
};

export default useAuth;
