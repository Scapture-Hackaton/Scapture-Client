import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Main from './Page/Main/components/Main';
import Scapture from './Page/Scapture/components/Scapture';
import Stadium from './Page/Stadium/components/Stadium';
import Reservation from './Page/Reservation/components/Reservation';
import Video from './Page/Video/components/Video';
import MyPage from './Page/MyPage/components/MyPage';
import MyReservation from './Page/MyPage/MyReservation/components/MyReservation';
import Header from './Page/Header/components/Header';
import Footer from './Page/Footer/components/Footer';
import DevTer from './DevTerminal';

import './App.scss';
import Community from './Page/Community/components/Community';
import ScrollToTop from './utils/ScrollToTop';
import ManageStadium from './Page/MyPage/Admin/components/Stadium/ManageStadium';
import CreateStadium from './Page/MyPage/Admin/components/CreateStadium/CreateStadium';
// import LoginCallBack from './Page/Header/test/LoginCallBack';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/scapture" element={<Scapture />} />
          <Route path="/stadium/:stadiumId" element={<Stadium />} />
          <Route path="/stadium" element={<Stadium />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/video" element={<Video />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin/stadium" element={<ManageStadium />} />
          <Route path="/admin/create" element={<CreateStadium />} />
          <Route path="/mypage/reservation" element={<MyReservation />} />
          <Route path="/community" element={<Community />} />
          <Route path="/header" element={<Header index={0} />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/dev-ter" element={<DevTer />} />

          {/* Login-API */}
          {/* <Route path="/oauth/redirected/kakao" element={<LoginCallBack />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
