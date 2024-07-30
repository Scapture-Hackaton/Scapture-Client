import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAuth = (resToken: (code: string) => void) => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      console.log('Authorization code:', code);
      resToken(code);
    } else {
      console.error(
        'Error: In this WEB drop the Code from this social Login.please, retry to Login.',
      );
    }
  }, [location, resToken]);
};

export default useAuth;
