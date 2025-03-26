import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../store/authSlice';

export default function useRefreshToken() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(store => store.auth);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isAuthenticated) {
        try {
          await dispatch(refreshToken());
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }
    }, 4 * 60 * 1000); // Refresh every 4 minutes

    return () => clearInterval(interval);
  }, [dispatch, isAuthenticated]);

  return null;
}