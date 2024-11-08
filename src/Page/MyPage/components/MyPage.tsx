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

  // 역할에 따른 리다이렉션 처리
  useEffect(() => {
    if (isProfile.role !== 'BASIC' && isProfile.role !== 'MANAGER') {
      navigate('/');
    }
  }, [isProfile.role, navigate]);

  const renderPage = () => {
    if (isProfile.role === 'BASIC') {
      return <UserPage />;
    } else if (isProfile.role === 'MANAGER') {
      return <AdminPage />;
    }
    return null;
  };

  return (
    <>
      <Header index={0}></Header>
      {renderPage()}
      <Footer></Footer>
    </>
  );
};

export default MyPage;
