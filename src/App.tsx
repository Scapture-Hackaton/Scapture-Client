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
// import DevTer from './DevTerminal';

import './App.scss';
import Community from './Page/Community/components/Community';
import ScrollToTop from './utils/ScrollToTop';
import ManageStadium from './Page/MyPage/Admin/components/Stadium/ManageStadium';
import CreateStadium from './Page/MyPage/Admin/components/CreateStadium/CreateStadium';
import PaySuccess from './common/component/Payment/PaySuccess';
import Manager from './Page/Manager/components/CheckHighlights/Manager';
import Bridge from './Page/Manager/components/Bridge/Bridge';
import PayFail from './common/component/Payment/PayFail';
import AccountSetting from './Page/MyPage/AccountSetting/components/AccountSetting';
import AccountDelete from './Page/MyPage/AccountSetting/components/AccountDelete';
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
          <Route path="/reservation" element={<Reservation />} />

          <Route
            path="/video/:stadiumId/:videoId/:prevScheduleId/:month/:day/:prevFieldId"
            element={<Video />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin/stadium" element={<ManageStadium />} />
          <Route path="/admin/create" element={<CreateStadium />} />
          <Route path="/mypage/reservation" element={<MyReservation />} />
          <Route path="/community" element={<Community />} />
          <Route path="/header" element={<Header index={0} />} />
          <Route path="/footer" element={<Footer />} />

          <Route path="/landing/:stadiumId/:fieldId" element={<Bridge />} />
          <Route path="/admin" element={<Manager />} />
          <Route path="/admin/highlights/:shceduleId" element={<Manager />} />
          <Route path="/admin/originals/:shceduleId" element={<Manager />} />
          <Route path="/admin/user/:userId" element={<Manager />} />

          <Route path="/success" element={<PaySuccess />} />
          <Route path="/fail" element={<PayFail />} />
          <Route path="/mypage/account" element={<AccountSetting />} />
          <Route path="/mypage/account/delete" element={<AccountDelete />} />

          {/* <Route path="/dev-ter" element={<DevTer />} /> */}
          {/* Login-API */}
          {/* <Route path="/oauth/redirected/kakao" element={<LoginCallBack />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
