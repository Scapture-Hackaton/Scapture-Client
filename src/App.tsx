import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Page/Main/components/Main';
import Scapture from './Page/Scapture/components/Scapture';
import Stadium from './Page/Stadium/components/Stadium';
import Reservation from './Page/Reservation/components/Reservation';
import Video from './Page/Video/components/Video';
import MyPage from './Page/MyPage/components/MyPage';
import Header from './Page/Header/components/Header';
import Footer from './Page/Footer/components/Footer';
import DevTer from './DevTerminal';

import './App.scss';

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
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/dev-ter" element={<DevTer />} />
      </Routes>
    </Router>
  );
};

export default App;
