import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import styles from '../scss/main.module.scss';

import mainBanner from '../image/mainBanner.svg';
import mainLogo from '../image/mainLogo.svg';
import bannerCover from '../image/bannerCover.svg';

import gradientBg from '../image/gradientBg.svg';
import mainIcon from '../image/mainIcon.svg';
import iphoneMockup from '../image/iphoneMockup.svg';

import videoTopGradient from '../image/videoTopGradient.svg';

import inqyireLogo from '../image/inqyireLogo.svg';

import { useQuery } from '@tanstack/react-query';
import { getMainStadium } from '../../../apis/api/main.api';
// import { useNavigate } from 'react-router-dom';
import AllianceStadium from './AllianceStadium';

const Main = () => {
  const { data: mainData, isSuccess: isMainDataSuccess } = useQuery({
    queryKey: ['main_stadium'],
    queryFn: () => getMainStadium(),
  });

  // const navigate = useNavigate();

  // const toStadiumPage = () => {
  //   navigate('/community');
  // };

  return (
    <div className={styles.test}>
      <Header index={0} />
      <div className={styles.main}>
        <div className={styles.banner}>
          <img
            src={mainBanner}
            className={styles.mainBanner}
            alt=""
            width="450px"
            height="700px"
          />
          <img
            src={bannerCover}
            className={styles.bannerCover}
            alt=""
            width="450px"
            height="700px"
          />
          <img
            src={mainLogo}
            className={styles.mainLogo}
            alt=""
            width="400px"
            height="192px"
          />
          <div className={styles.mainDes}>
            <div className={styles.desTitle}>Sports + Capture</div>
            <div className={styles.des}>
              원하는 구장에서 운동하고,
              <br />
              자동으로 촬영된 영상을 손쉽게 확인해 보세요.
              <br />
              마음에 드는 장면은 간단한 클릭으로 다운로드까지 가능합니다.
            </div>
          </div>
        </div>

        <div className={styles.mockUp}>
          <img
            src={gradientBg}
            className={styles.gradientBg}
            alt=""
            width="450px"
            height="1264px"
          ></img>
          <div className={styles.mockUpDes}>
            <img
              src={mainIcon}
              loading="lazy"
              alt=""
              width="54px"
              height="54px"
            />
            <div className={styles.mockUpDesText}>
              몸만 와서 운동만 하세요!
              <br />
              <span>촬영, 편집, 업로드</span>는
              <br />
              SCAPTURE가 해드릴게요!
            </div>
          </div>
          <img
            src={iphoneMockup}
            className={styles.iphoneMockup}
            loading="lazy"
            alt=""
          />
        </div>

        <div className={styles.explainContainer}>
          <div className={styles.want}>
            <div className={styles.group}>
              <img
                src={mainIcon}
                loading="lazy"
                alt=""
                width="54px"
                height="54px"
              />
              <p>내가 원하는 구장에서 운동하고</p>
            </div>
          </div>

          <div className={styles.check}>
            <div className={styles.group}>
              <img
                src={mainIcon}
                loading="lazy"
                alt=""
                width="54px"
                height="54px"
              />
              <div className={styles.checkTxt}>
                <span>언제 어디서든</span> 운동 영상을
                <br />
                손쉽게 <span>확인, 다운로드</span> 하세요!
              </div>
            </div>
          </div>

          <div className={styles.popualrVideoContiner}>
            <div className={styles.leftBorder}></div>
            <div className={styles.popualrVideo}>
              <img
                src={videoTopGradient}
                className={styles.videoTopGradient}
                loading="lazy"
                alt=""
              />
              <div className={styles.group}>
                <div className={styles.testVideo}></div>
                <div className={styles.videoDes}>
                  <div className={styles.title}>영상 제목 입력</div>
                  <div className={styles.videoDetail}>
                    <p>구장 주소 입력 필드</p>
                    <p>0000.00.00 | 00:00 ~ 00:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightBorder}></div>
          </div>
        </div>

        <div className={styles.stadiums}>
          <div className={styles.icon}>
            <img
              src={mainIcon}
              loading="lazy"
              alt=""
              width="54px"
              height="54px"
            />
            <p>제휴 구장</p>
          </div>

          {mainData && isMainDataSuccess ? (
            <div className={styles.container}>
              <AllianceStadium
                stadiumList={mainData.stadiums}
              ></AllianceStadium>
            </div>
          ) : null}
        </div>

        <div className={styles.inquire}>
          <div className={styles.group}>
            <img src={inqyireLogo} alt="" width="54px" height="54px" />
            <div className={styles.inquireTitle}>파트너 및 제휴 문의</div>
            <div className={styles.inquireSubTxt}>
              스캡쳐는 다양한 형태의 협업을 기대하고 있습니다.
            </div>
            <button>제휴 문의하기</button>
          </div>
        </div>

        {/* <div className={styles.container}>
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
