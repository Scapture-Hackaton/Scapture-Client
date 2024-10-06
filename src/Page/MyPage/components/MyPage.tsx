import { useRecoilState, useRecoilValue } from 'recoil';
import { userData } from '../dto/atom.interface';
import { userDataAtom } from '../Atom/atom';
import AdminPage from '../Admin/components/AdminPage';
import UserPage from '../MyPage/components/UserPage';
import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import { loginData, loginDataAtom } from '../../Header/Atom/atom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MyPage = () => {
  const isProfile = useRecoilValue<userData>(userDataAtom);

  const [isLoginState, setLoginState] =
    useRecoilState<loginData>(loginDataAtom);

  const navigate = useNavigate();
  // 리다이렉션을 useEffect 안에서 처리
  useEffect(() => {
    if (localStorage.getItem('TOKEN') && localStorage.getItem('LoginType')) {
      setLoginState({ state: true });
    }
    if (!isLoginState.state) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Header index={0}></Header>
      {isProfile.role === 'BASIC' ? (
        <UserPage></UserPage>
      ) : (
        <AdminPage></AdminPage>
      )}
      <Footer></Footer>
    </>
  );
};

export default MyPage;
