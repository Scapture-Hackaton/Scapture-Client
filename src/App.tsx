import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Page/Main/components/Main';
import Scapture from './Page/Scapture/components/Scapture';
import Stadium from './Page/Stadium/components/Stadium';
import Reservation from './Page/Reservation/components/Reservation';
import Video from './Page/Video/components/Video';
import MyPage from './Page/MyPage/MyPage/components/MyPage';
import EditProfile from './Page/MyPage/EditProfile/components/EditProfile';
import MyReservation from './Page/MyPage/MyReservation/components/MyReservation';
import Header from './Page/Header/components/Header';
import Footer from './Page/Footer/components/Footer';
import DevTer from './DevTerminal';

import './App.scss';
import Community from './Page/Community/components/Community';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/scapture" element={<Scapture />} />
        <Route path="/stadium" element={<Stadium />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/video" element={<Video />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<EditProfile />} />
        <Route path="/mypage/reservation" element={<MyReservation />} />
        <Route path="/community" element={<Community />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/dev-ter" element={<DevTer />} />
      </Routes>
    </Router>
  );
};

export default App;
