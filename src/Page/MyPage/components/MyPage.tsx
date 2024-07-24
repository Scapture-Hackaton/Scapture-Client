// import Header from '../../Header/components/Header';
// import Footer from '../../Footer/components/Footer';

import styles from '../scss/my-page.module.scss';

import pencil from '../image/pencil.png';
import banana from '../image/banana.png';
import rightArrow from '../image/right_arrow.png';

// import profileImg from '../image/profile.webp';

const MyPage = () => {
  return (
    <div className={styles.test}>
      <div className={styles.myPage}>
        {/* <Header /> */}
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
              <div className={styles.subscribe}>
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
            <div className={styles.charge}>버내너 충전하기</div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>

      <div className={styles.reservation}>
        <p>예약 내역 확인하기</p>
        <img src={rightArrow} alt="" />
      </div>
    </div>
  );
};

export default MyPage;
