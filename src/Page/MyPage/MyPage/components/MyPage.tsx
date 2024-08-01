import Header from '../../../Header/components/Header';
// import Footer from '../../Footer/components/Footer';

import styles from '../scss/my-page.module.scss';
import modal from '../scss/my-page-modal.module.scss';
import sub from '../scss/my-page-sub-modal.module.scss';
import pencil from '../../image/pencil.png';
import banana from '../image/banana.png';
import rightArrow from '../image/right_arrow.png';
import rightFrame from '../image/rightFrame.png';
import leftFrame from '../image/leftFrame.png';
import dropDown from '../image/dropDown.png';
// import profileImg from '../image/profile.webp';

import { useEffect, useRef, useState } from 'react';
import { modalNotice } from '../functions/ModalFunction';
import { BananaModal, SubscribeModal } from './MyPageModal';
import {
  getBanana,
  getProfile,
  postBanana,
} from '../../../../apis/api/mypage.api';

const MyPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalSubRef = useRef<HTMLDialogElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const innerSliderRef = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);
  const [startX, setStartX] = useState(0);

  // mypage api

  useEffect(() => {
    const res = getProfile();
    const banana = getBanana();
    console.log('res', res);
    console.log('banana', banana);
  });

  // mypage api
  useEffect(() => {
    const slider = sliderRef.current;
    const innerSlider = innerSliderRef.current;

    if (!slider || !innerSlider) return;

    const handleMouseDown = (e: MouseEvent) => {
      setPressed(true);
      setStartX(e.clientX - innerSlider.offsetLeft);
      slider.style.cursor = 'grabbing';
    };

    const handleMouseEnter = () => {
      slider.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      setPressed(false);
      slider.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!pressed) return;
      e.preventDefault();
      const x = e.clientX;
      innerSlider.style.left = `${x - startX}px`;
      checkBoundary();
    };

    const checkBoundary = () => {
      const outer = slider.getBoundingClientRect();
      const inner = innerSlider.getBoundingClientRect();

      if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = '0px';
      } else if (inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`;
      }
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, [pressed, startX]);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.test}>
      <div className={styles.myPage}>
        <Header />
        <div className={styles.profile}>
          <div className={styles.bar}></div>
          <div className={styles.container}>
            <div className={styles.image_box}>
              <div className={styles.box}>
                {/* <img className={styles.image} src={profileImg} alt=""></img> */}
              </div>
              <div className={styles.modify}>
                <img className={styles.pencil} src={pencil} alt="" />
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.name}>스캡쳐 님</div>
              <div
                className={styles.subscribe}
                onClick={() => {
                  modalNotice(modalSubRef);
                }}
              >
                <div className={styles.who}>구독자</div>
                <div className={styles.when}>2024.08.12 까지 이용</div>
              </div>
              <div className={styles.group}>
                <div className={styles.title}>소속팀</div>
                <div className={styles.descrip}>스캡쳐</div>
              </div>

              <div className={styles.group}>
                <div className={styles.title}>활동지역</div>
                <div className={styles.descrip}>서울 마포구</div>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className={styles.bananaContainer}>
            <div className={styles.group}>
              <div className={styles.bananaBox}>
                <img className={styles.banana} src={banana} alt="" />
              </div>
              <p className={styles.text}>버내너</p>
            </div>
            <div className={styles.group}>
              <p>보유 갯수</p>
              <p>5</p>
            </div>
          </div>

          <div className={styles.chargeContainer}>
            <div className={styles.invite}>친구 초대하고 '버내너 3개' 받기</div>
            <div
              className={styles.charge}
              onClick={() => {
                modalNotice(modalRef);
                // postBanana(5);
              }}
            >
              버내너 충전하기
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>

      <div className={styles.reservation}>
        <p>예약 내역 확인하기</p>
        <img src={rightArrow} alt="" />
      </div>

      <div className={styles.stored}>
        <div className={styles.group}>
          <div className={styles.storedText}>
            <img src={leftFrame} alt=""></img>
            <span>저장된 영상</span>
            <img src={rightFrame} alt=""></img>
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
                  onClick={() => handleOptionClick('최신순')}
                >
                  최신순
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOptionClick('인기순')}
                >
                  인기순
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleOptionClick('조회수')}
                >
                  조회수
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.sliderInner} ref={innerSliderRef}>
            <div className={styles.sliderItem}></div>
            <div className={styles.sliderItem}></div>
            <div className={styles.sliderItem}></div>
            <div className={styles.sliderItem}></div>
            <div className={styles.sliderItem}></div>
            <div className={styles.sliderItem}></div>
          </div>
        </div>
      </div>
      <BananaModal styles={modal} ref={modalRef} />
      <SubscribeModal styles={sub} ref={modalSubRef} />
    </div>
  );
};

export default MyPage;
