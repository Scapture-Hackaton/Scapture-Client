import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Page/Main/components/Main";
import Scapture from "./Page/Scapture/components/Scapture";
import Stadium from "./Page/Stadium/components/Stadium";
import Reservation from "./Page/Reservation/components/Reservation";
import Video from "./Page/Video/components/Video";
import MyPage from "./Page/MyPage/components/MyPage";
import Header from "./Page/Header/components/Header";
import Footer from "./Page/Footer/components/Footer";

import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Scapture" element={<Scapture />} />
        <Route path="/Stadium" element={<Stadium />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Header" element={<Header />} />
        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </Router>
  );
}

export default App;
