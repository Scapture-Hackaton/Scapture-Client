import { useRecoilValue } from 'recoil';
import { userData } from '../dto/atom.interface';
import { userDataAtom } from '../Atom/atom';
import AdminPage from '../\bAdmin/AdminPage';
import UserPage from '../MyPage/components/UserPage';
import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

const MyPage = () => {
  const isProfile = useRecoilValue<userData>(userDataAtom);

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
