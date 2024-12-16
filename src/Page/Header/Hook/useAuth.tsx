import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginData, loginDataAtom } from '../Atom/atom';

const useAuth = (
  resToken: (code: string, type: string) => void,
  type: string | null,
) => {
  const location = useLocation();
  //recoil
  const setLoginState = useSetRecoilState<loginData>(loginDataAtom);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    //if문 수정 필요
    if (code && type) {
      // console.log('Authorization code:', code);
      resToken(code, type);
      //임시 recoil 적용 본래라면 login.api에 있어야하지만 Hook이 되기 때문에 우선 보류
      setLoginState(prev => ({ ...prev, state: true }));
    }
    // else {
    //   // console.error(
    //   //   'Error: In this WEB drop the Code from this social Login.please, retry to Login.',
    //   // );

    //   setLoginState(prev => ({ ...prev, state: false }));
    // }
  }, [location, resToken, type]);
};

export default useAuth;
