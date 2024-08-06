import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import styles from '../scss/main.module.scss';

import BannerImage from '../image/banner-image.svg';
import IntroImage from '../image/intro-image.svg';
import CheckBox from '../image/checkbox.svg';
// import StadiumImage from '../image/stadium-image.svg';
import soccer from '../image/soccer.svg';
import popularVideoBack from '../image/popularVideoBack.svg';

import EffectRight from '../image/effect-right.svg';
import EffectLeft from '../image/effect-left.svg';

import { useQuery } from '@tanstack/react-query';
import { getMainStadium } from '../../../apis/api/main.api';
import { useNavigate } from 'react-router-dom';
import AllianceStadium from './AllianceStadium';
// import { PopularVideos } from '../../../apis/dto/main.dto';
// import banner from '../scss/banner.module.scss';

const Main = () => {
  const { data: mainData, isSuccess: isMainDataSuccess } = useQuery({
    queryKey: ['main_stadium'],
    queryFn: () => getMainStadium(),
  });

  const navigate = useNavigate();

  const toStadiumPage = () => {
    navigate('/community');
  };

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.main}>
        <div className={styles.banner}>
          <img src={BannerImage} alt="" />
        </div>
        <div className={styles.container}>
          <div className={styles.intro}>
            <div>
              <div className={styles.introText}>
                <span>몸만 와서 운동만 하세요!</span>
                <div>
                  <span id={styles.yellow}> 촬영, 편집, 업로드</span>
                  <span>는</span>
                </div>
                <span>SCAPTURE가 해드릴게요!</span>
              </div>
              <div className={styles.object}>
                <img src={IntroImage} alt="introImage" />
              </div>
            </div>
          </div>
          <div className={styles.stadium}>
            <div className={styles.group}>
              <div id={styles.checkbox}>
                <img src={CheckBox} alt="checkbox-image" />
              </div>
              <div className={styles.about}>
                <span>내가 원하는 구장에서 운동하고</span>
                <span>언제 어디서든 운동 영상을 손쉽게 확인해보고</span>
                <span>다운로드하세요.</span>
              </div>
            </div>
            <div className={styles.images}>
              <img src={soccer} alt="stadium-image" />
            </div>
          </div>

          {mainData && isMainDataSuccess ? (
            <>
              <div className={styles.video} onClick={toStadiumPage}>
                <span id={styles.content}>인기 동영상</span>
                <div className={styles.imageContainer}>
                  <img
                    src={popularVideoBack}
                    alt=""
                    className={styles.backgroundImage}
                  />
                  <img
                    src={mainData.popular.image}
                    alt=""
                    className={styles.overlayImage}
                  />
                </div>
                <div id={styles.group}>
                  <div className={styles.name}>
                    <span id={styles.title}>경기장 이름</span>
                    <span id={styles.date}>경기 진행 일시</span>
                  </div>
                  <div className={styles.detail}>
                    <span id={styles.title}>
                      {mainData.popular.stadiumName}
                    </span>
                    <span id={styles.date}>
                      {mainData.popular.date} / {mainData.popular.hours}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.group}>
                  <div id={styles.effect}>
                    <div>
                      <img src={EffectLeft} alt="" />
                    </div>
                    <span>제휴 구장</span>
                    <div>
                      <img src={EffectRight} alt="" />
                    </div>
                  </div>
                  <div className={styles.images}>
                    <AllianceStadium
                      stadiumList={mainData.stadiums}
                    ></AllianceStadium>
                    {/* <div>
                      <img src={InfoImageA} alt="" />
                      <div>장충테스장</div>
                    </div>
                    <div>
                      <img src={InfoImageB} alt="" />
                      <div>수락산스포츠타운야구장</div>
                    </div> */}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
