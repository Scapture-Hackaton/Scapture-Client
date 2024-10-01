// import Header from '../../../Header/components/Header';

import Banana from '../image/banana.svg';
import Cancel from '../image/cancel.svg';
import Vector from '../image/Vector9.svg';
// import benefit1 from '../image/benefit1.svg';
// import benefit2 from '../image/benefit2.svg';
// import benefit3 from '../image/benefit3.svg';
import Ground from '../image/Ground.svg';
// import Button from '../image/Radiobutton.svg';
// import Footer from '../../../Footer/components/Footer';
// import AllianceStadium from '../../../Main/components/AllianceStadium';
// import { userData, bananaData, subscribedData } from '../../dto/atom.interface';

import styles from '../scss/my-page.module.scss';
// import modal from '../scss/my-page-modal.module.scss';
// import sub from '../scss/my-page-sub-modal.module.scss';

// import pencil from '../../image/pencil.svg';
// import banana from '../image/banana.svg';
// import rightArrow from '../image/right_arrow.svg';
// import dropDown from '../image/dropDown.svg';
// import subscribe from '../image/subscribe.svg';
// import profileImgDefault from '../../image/scapture-logo.svg';
// import profileImg from '../image/profile.webp';

// import { useEffect, useRef, useState } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  getBanana,
  getProfile,
  getReservation,
  getSortVideoLatest,
} from '../../../../apis/api/mypage.api';

import { StoredVideoList } from '../../../../apis/dto/myPage.dto';
import SubscribeModal from './SubscribeModal';
import EditProfile from './EditProfile';
import UserInfo from './UserInfo';
// import { userDataAtom } from '../../Atom/atom';
// import { userData } from '../../dto/atom.interface';
// import { useRecoilValue } from 'recoil';

// import ReactPaginate from 'react-paginate';

// import { modalNotice } from '../functions/ModalFunction';
// import { BananaModal, SubscribeModal } from './MyPageModal';
// import {
//   getBanana,
//   getProfile,
//   getSortVideo,
// } from '../../../../apis/api/mypage.api';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { userDataAtom, bananaDataAtom, subscribedAtom } from '../../Atom/atom';
// import { Link, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// const itemsPerPage = 8; // 페이지당 보여줄 아이템 수

const UserPage = () => {
  const navigate = useNavigate();
  // const modalRef = useRef<HTMLDialogElement>(null);
  // const modalSubRef = useRef<HTMLDialogElement>(null);

  //Recoil
  // const [isProfile, setProfile] = useRecoilState<userData>(userDataAtom);
  // const [isBanana, setBanana] = useRecoilState<bananaData>(bananaDataAtom);
  // const isSubscribed = useRecoilValue<subscribedData>(subscribedAtom);

  //useState
  // const [isVideo, setVideo] = useState<string>('');
  // const [isVideos, setVideos] = useState([]);
  // const location = useLocation();

  // const handleCopyClipBoard = async (text: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     alert('클립보드에 링크가 복사되었어요.');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleSortType = (type: string) => {
  //   const res = getSortVideo(type);
  //   console.log(res);
  // };

  // useEffect(() => {
  //   const fetchProfileInfo = async () => {
  //     const res = await getProfile();
  //     const banana = await getBanana();
  //     const videoSort = await getSortVideo('latest');
  //     console.log(
  //       'res',
  //       res?.data,
  //       '\n',
  //       'banana',
  //       banana?.data,
  //       '\n',
  //       'subscribe',
  //       isSubscribed,
  //       '\n',
  //       'subscribe',
  //       isSubscribed,
  //       '\n',
  //       'videoSort',
  //       videoSort,
  //     );
  //     if (res?.data && banana?.data && videoSort?.data) {
  //       setProfile(prev => ({
  //         ...prev,
  //         endDate: res.data.endDate,
  //         image: res.data.image,
  //         location: res.data.location,
  //         name: res.data.name,
  //         role: res.data.role,
  //         team: res.data.team,
  //       }));
  //       setBanana(prev => ({
  //         ...prev,
  //         balance: banana.data.balance,
  //         subscribed: banana.data.subscribed,
  //       }));
  //       setVideo(videoSort.data[0].image);
  //       setVideos(videoSort.data);
  //     }
  //   };

  //   fetchProfileInfo();
  // }, [setProfile, setBanana]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);
  // console.log(selectedButtonId);

  // const [selected, setSelected] = useState('최신순');
  // const selectRef = useRef<HTMLDivElement>(null);

  // const handleClick = id => {
  //   setSelectedButtonId(id); // 클릭된 버튼의 ID를 상태로 설정
  // };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  // const handleOptionClick = (option: string) => {
  //   setSelected(option);
  //   setOpen(false);
  // };

  // const deleteToken = () => {
  //   localStorage.removeItem('TOKEN');
  //   window.location.reload();
  // };
  //  페이지네이션 더미
  // const videoData = Array.from({ length: 50 }, (_, index) => ({
  //   title: `영상 제목 ${index + 1}`,
  //   field: '구장 주소 입력 필드',
  //   time: '0000.00.00 | 00:00 - 00:00',
  // }));

  // const [currentPage, setCurrentPage] = useState(0);

  // 현재 페이지에 표시될 비디오 수
  // const offset = currentPage * itemsPerPage;
  // const currentItems = videoData.slice(offset, offset + itemsPerPage);
  // const pageCount = Math.ceil(videoData.length / itemsPerPage);

  // 페이지 변경 시 호출되는 함수
  // const handlePageClick = ({ selected }) => {
  //   setCurrentPage(selected);
  // };

  const bananas = [
    { id: 1, quantity: '1개', price: '2,990원' },
    { id: 2, quantity: '5개', price: '9,990원' },
    { id: 3, quantity: '10개', price: '19,990원' },
  ];

  // const isProfile = useRecoilValue<userData>(userDataAtom);
  // console.log(isProfile);

  // 프로필 데이터
  const { data: myProfileData, refetch } = useQuery({
    queryKey: ['myprofile'],
    queryFn: () => getProfile(),
  });

  const [isEdit, setEdit] = useState<boolean>(false);

  // 프로필 변경 함수
  const changeUserInfo = async () => {
    setEdit(!isEdit);
    await refetch();
  };

  // 버내너 잔액 조회
  const { data: bananaData } = useQuery({
    queryKey: ['bananaCnt'],
    queryFn: () => getBanana(),
  });

  // 예약 리스트 가져오기
  const { data: reserveList } = useQuery({
    queryKey: ['reserveList'],
    queryFn: () => getReservation(),
  });

  // 저장 영상 조회
  const { data: storeVideoList } = useQuery({
    queryKey: ['storeVideoList'],
    queryFn: () => getSortVideoLatest(),
  });

  //   console.log(storeVideoList);

  return (
    <div className={styles.test}>
      {/* <Header index={0} /> */}
      <div className={styles.myPageContainer}>
        <div className={styles.centerContainer}>
          {isEdit ? (
            <EditProfile
              myProfileData={myProfileData}
              changeUserInfo={changeUserInfo}
            ></EditProfile>
          ) : (
            <UserInfo
              myProfileData={myProfileData}
              changeUserInfo={changeUserInfo}
            ></UserInfo>
          )}

          {/* 비구독 배너 비구독일때 제거 필요 */}
          {myProfileData && myProfileData?.data?.isSubscribe ? null : (
            <div className={styles.banner} onClick={toggleModal2}>
              <div className={styles.mainTitle}>구독혜택 구경하기</div>
              <div className={styles.subTitle}>
                구독시 받을 수 있는 혜택을 살펴보세요!
              </div>
            </div>
          )}

          <div className={styles.bananaContainer}>
            <div className={styles.mainTitle}>버내너 관리</div>
            <div className={styles.subTitle}>
              보유한 갯수만큼 영상을 다운받을 수 있어요
            </div>
            <div className={styles.countContainer}>
              <img className={styles.img} src={Banana} alt=""></img>
              <div className={styles.presentContainer}>
                <div className={styles.present}>현재 버내너 보유갯수</div>
                <div className={styles.count}>
                  {bananaData?.data?.balance || bananaData?.data?.balance == 0
                    ? bananaData?.data?.balance.toString().padStart(2, '0')
                    : '00'}
                  개
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.inviteButton}>
                <div>친구 초대하고</div> <div>버내너 3개 받기</div>
              </div>
              <div
                className={styles.chargeButton}
                onClick={() => {
                  toggleModal();
                }}
              >
                버내너 충전하기
              </div>
            </div>
          </div>
          <div className={styles.reservationContainer}>
            <div className={styles.textContainer}>
              <div
                style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
              >
                <div className={styles.title}>예약내역</div>
                <div className={styles.count}>
                  {reserveList?.data ? reserveList?.data?.length : '0'}
                </div>
              </div>
              <div className={styles.subTitle}>
                나의 예약정보를 확인할 수 있어요
              </div>
            </div>
            {reserveList?.data && reserveList?.data?.length ? (
              <div
                className={styles.detail}
                onClick={() => {
                  navigate('/mypage/reservation', { state: { reserveList } });
                }}
              >
                자세히 보기
              </div>
            ) : (
              <div className={styles.noDetail}>자세히 보기</div>
            )}
          </div>
          <div className={styles.saveContainer}>
            <div className={styles.title}>저장한 영상</div>
            {storeVideoList?.data ? (
              <div className={styles.videoGrid}>
                {storeVideoList.data.map((item: StoredVideoList) => (
                  <div
                    className={styles.videoCard}
                    key={item.videoId}
                    onClick={() => {
                      navigate('/video', {
                        state: {
                          videoId: item.videoId,
                          stadiumId: item.stadiumId,
                        },
                      });
                    }}
                  >
                    {/* <div className={styles.thumbnail}></div> */}
                    <img
                      className={styles.thumbnail}
                      src={item.image}
                      alt=""
                      width="199px"
                      height="112px"
                    />
                    <div className={styles.videoInfo}>
                      <div className={styles.videoTitle}>{item.name}</div>
                      <div className={styles.videoDetails}>
                        <div className={styles.videoField}>
                          {item.stadiumName} | {item.fieldName}
                        </div>
                        <div className={styles.videoTime}>
                          {item.date} | {item.hours}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noReserve}>
                <img
                  src={Ground}
                  className={styles.img}
                  width="168px"
                  height="108px"
                ></img>
                <div className={styles.title}>아직 저장된 영상이 없어요</div>
              </div>
            )}

            {/* <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pageCount} //몇개 페이지 보여줄건지
              pageRangeDisplayed={10} // 페이지 주변에 표시될 번호 범위
              // onPageChange={handlePageClick}
              containerClassName={styles.pagination} /// 전체컨테이너
              activeClassName={styles.active} // 활성화 페이지 번호에 적용
              pageClassName={styles.pageNumber} //각 페이지 번호에 적용
              previousClassName={styles.button} // 이전버튼 적용
              nextClassName={styles.button} //다음버튼 적용
            /> */}
          </div>
        </div>
        {/* 버내너 충전 모달 */}
        {isOpen && (
          <div className={styles.modalContainer}>
            <div className={styles.modalCard}>
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderText}>버내너 충전하기</div>
                <img
                  className={styles.close}
                  src={Cancel}
                  onClick={() => {
                    toggleModal();
                    setSelectedButtonId(null);
                  }}
                ></img>
              </div>
              <img src={Vector} />
              <img className={styles.modalImg} src={Banana}></img>
              <div className={styles.modalText}>
                버내너 갯수만큼<br></br>원하는 영상을 다운로드 할 수 있어요!
              </div>
              {bananas.map(banana => (
                <div
                  key={banana.id}
                  className={styles.bananaContainer}
                  // onClick={() => handleClick(banana.id)}
                >
                  <div className={styles.numOfBanana}>
                    <div
                      className={`${styles.button} ${selectedButtonId === banana.id ? styles.clicked : ''}`}
                    ></div>
                    <div className={styles.banana}>버내너</div>
                    <div className={styles.bananaNum}>{banana.quantity}</div>
                  </div>
                  <div className={styles.price}>{banana.price}</div>
                </div>
              ))}
              <div
                className={`${styles.payment} ${selectedButtonId != null ? styles.clicked : ''}`}
              >
                결제하기
              </div>
            </div>
          </div>
        )}
        {/* 구독혜택 모달 */}
        {isOpen2 && (
          <SubscribeModal
            toggleModal2={toggleModal2}
            setSelectedButtonId={setSelectedButtonId}
          ></SubscribeModal>
          //   <div className={styles.benefitContainer}>
          //     <div className={styles.benefit}>
          //       <div className={styles.modalHeader}>
          //         <div className={styles.modalHeaderText}>구독 혜택</div>
          //         <img
          //           className={styles.close}
          //           src={Cancel}
          //           onClick={() => {
          //             toggleModal2();
          //             setSelectedButtonId(null);
          //           }}
          //         ></img>
          //       </div>
          //       <img src={Vector} />
          //       <div className={styles.detailContainer}>
          //         <div className={styles.detail}>
          //           <img src={benefit1} alt="" className={styles.img}></img>
          //           <div className={styles.text}>영상 무료 다운로드</div>
          //         </div>
          //         <div className={styles.detail}>
          //           <img src={benefit2} alt="" className={styles.img}></img>
          //           <div className={styles.text}>영상 무제한 저장</div>
          //         </div>
          //         <div className={styles.detail}>
          //           <img src={benefit3} alt="" className={styles.img}></img>
          //           <div className={styles.text}>월 19,900원</div>
          //         </div>
          //         <div className={styles.button}>구독하러 가기</div>
          //       </div>
          //     </div>
          //   </div>
        )}
      </div>
      {/* <Footer></Footer> */}
      {/* <div className={styles.myPage}>
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
                컴포넌트 예정
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
              컴포넌트 예정
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
            <div className={styles.bananaWarp}>
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
            </div>
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
      <div className={styles.logout} onClick={deleteToken}>
        로그아웃
      </div>
      <Footer /> */}
    </div>
  );
};

export default UserPage;
