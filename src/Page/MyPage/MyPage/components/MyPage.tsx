import Header from '../../../Header/components/Header';
import Footer from '../../../Footer/components/Footer';
import AllianceStadium from '../../../Main/components/AllianceStadium';
import { userData, bananaData, subscribedData } from '../../dto/atom.interface';

import styles from '../scss/my-page.module.scss';
import modal from '../scss/my-page-modal.module.scss';
import sub from '../scss/my-page-sub-modal.module.scss';

import pencil from '../../image/pencil.svg';
import banana from '../image/banana.svg';
import rightArrow from '../image/right_arrow.svg';
import dropDown from '../image/dropDown.svg';
import subscribe from '../image/subscribe.svg';
import profileImgDefault from '../../image/scapture-logo.svg';
// import profileImg from '../image/profile.webp';

import { useEffect, useRef, useState } from 'react';
import { modalNotice } from '../functions/ModalFunction';
import { BananaModal, SubscribeModal } from './MyPageModal';
import {
  getBanana,
  getProfile,
  getSortVideo,
} from '../../../../apis/api/mypage.api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom, bananaDataAtom, subscribedAtom } from '../../Atom/atom';
import { Link, useLocation } from 'react-router-dom';

const MyPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalSubRef = useRef<HTMLDialogElement>(null);

  //Recoil
  const [isProfile, setProfile] = useRecoilState<userData>(userDataAtom);
  const [isBanana, setBanana] = useRecoilState<bananaData>(bananaDataAtom);
  const isSubscribed = useRecoilValue<subscribedData>(subscribedAtom);

  //useState
  const [isVideo, setVideo] = useState<string>('');
  const [isVideos, setVideos] = useState([]);
  const location = useLocation();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSortType = (type: string) => {
    const res = getSortVideo(type);
    console.log(res);
  };

  useEffect(() => {
    const fetchProfileInfo = async () => {
      const res = await getProfile();
      const banana = await getBanana();
      const videoSort = await getSortVideo('latest');
      console.log(
        'res',
        res?.data,
        '\n',
        'banana',
        banana?.data,
        '\n',
        'subscribe',
        isSubscribed,
        '\n',
        'subscribe',
        isSubscribed,
        '\n',
        'videoSort',
        videoSort,
      );
      if (res?.data && banana?.data && videoSort?.data) {
        setProfile(prev => ({
          ...prev,
          endDate: res.data.endDate,
          image: res.data.image,
          location: res.data.location,
          name: res.data.name,
          role: res.data.role,
          team: res.data.team,
        }));
        setBanana(prev => ({
          ...prev,
          balance: banana.data.balance,
          subscribed: banana.data.subscribed,
        }));
        setVideo(videoSort.data[0].image);
        setVideos(videoSort.data);
      }
    };

    fetchProfileInfo();
  }, [setProfile, setBanana]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('최신순');
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.myPage}>
        <div className={styles.profile}>
          <div className={styles.bar}></div>
          <div className={styles.container}>
            <div className={styles.image_box}>
              <div className={styles.box}>
                <img
                  className={styles.image}
                  src={isProfile.image ?? profileImgDefault}
                  alt="SCAPTURE"
                />
                <Link to="/mypage/edit" style={{ textDecoration: 'none' }}>
                  <div className={styles.modify}>
                    <img className={styles.pencil} src={pencil} alt="" />
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.name}>{isProfile.name} 님</div>

              <div
                className={styles.subscribe}
                onClick={() => {
                  modalNotice(modalSubRef);
                  console.log(isSubscribed);
                }}
              >
                {/* 컴포넌트 예정 */}
                {isSubscribed.subscribed || isProfile.endDate ? (
                  <>
                    <div className={styles.who}>구독자</div>
                    <div className={styles.when}>
                      {isProfile.endDate}까지 이용
                    </div>
                  </>
                ) : (
                  <>
                    <img className={styles.sub} src={subscribe} alt="" />
                    <div>구독하기</div>
                  </>
                )}
              </div>
              {/* 컴포넌트 예정 */}
              <div className={styles.group}>
                <div className={styles.title}>소속팀</div>
                <div className={styles.descrip}>{isProfile.team}</div>
              </div>

              <div className={styles.group}>
                <div className={styles.title}>활동지역</div>
                <div className={styles.descrip}>{isProfile.location}</div>
              </div>
            </div>
          </div>

          {isSubscribed.subscribed || isProfile.endDate ? (
            <>
              <div className={styles.noticeContainer}>
                <div className={styles.notice}>
                  {isProfile.name}님은 현재 구독 중 입니다.
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.bananaContainer}>
                <div className={styles.group}>
                  <div className={styles.bananaBox}>
                    <img className={styles.banana} src={banana} alt="" />
                  </div>
                  <p className={styles.text}>버내너</p>
                </div>
                <div className={styles.group}>
                  <p>보유 갯수</p>
                  <p>{isBanana.balance}</p>
                </div>
              </div>
              <div className={styles.chargeContainer}>
                <div
                  className={styles.invite}
                  onClick={() => {
                    // baseURL을 추후에 삽입 해야함
                    handleCopyClipBoard(`${location.pathname}`);
                  }}
                >
                  친구 초대하고 '버내너 3개' 받기
                </div>
                <div
                  className={styles.charge}
                  onClick={() => {
                    modalNotice(modalRef);
                  }}
                >
                  버내너 충전하기
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.list}>
        <Link
          className={styles.reservation}
          style={{ textDecoration: 'none' }}
          to="/mypage/reservation"
        >
          <p>예약 내역 확인하기</p>
          <img src={rightArrow} alt="" />
        </Link>
      </div>

      <div className={styles.stored}>
        <div className={styles.group}>
          <div className={styles.storedText}>
            <span>저장된 영상</span>
          </div>
          <div
            className={`${styles.selectbox} ${open ? styles.open : ''}`}
            ref={selectRef}
          >
            <button type="button" onClick={toggleDropdown}>
              <span>{selected}</span>
              <img src={dropDown} alt=""></img>
            </button>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleOptionClick('최신순');
                    handleSortType('latest');
                  }}
                >
                  최신순
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleOptionClick('인기순');
                    handleSortType('popularity');
                  }}
                >
                  인기순
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleOptionClick('조회수');
                    alert('아직 준비 중 입니다!');
                  }}
                >
                  조회수
                </button>
              </li>
            </ul>
          </div>
        </div>

        {isVideo ? (
          <div className={styles.images}>
            <AllianceStadium stadiumList={isVideos} />
          </div>
        ) : (
          <div className={styles.videoNotice}>내역이 없습니다</div>
        )}
      </div>
      <BananaModal styles={modal} ref={modalRef} />
      <SubscribeModal styles={sub} ref={modalSubRef} />
      <Footer />
    </div>
  );
};

export default MyPage;
