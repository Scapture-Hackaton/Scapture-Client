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
import mockupVideo from '../image/mockupVideo.mp4';

// import Vector from '../image/Vector.svg';
import location from '../../../assets/Icon/location.svg';
import clock from '../../../assets/Icon/Clock.svg';
import parking from '../../../assets/Icon/parking.svg';

import playBtnIcon from '../image/playBtnIcon.svg';
import stadiumEx from '../image/stadiumEx.jpeg';

import { useQuery } from '@tanstack/react-query';
import { getMainStadium } from '../../../apis/api/main.api';
import { useNavigate } from 'react-router-dom';
import AllianceStadium from './AllianceStadium';
import { useEffect, useRef } from 'react';
import BlurInfoBox from './BlurInfoBox';

const Main = () => {
  const { data: mainData, isSuccess: isMainDataSuccess } = useQuery({
    queryKey: ['main_stadium'],
    queryFn: () => getMainStadium(),
  });

  const navigate = useNavigate();

  const toCommunityPage = () => {
    navigate('/community');
  };

  const iphoneMockupRef = useRef<HTMLImageElement>(null);
  const iphoneScreenRef = useRef<HTMLVideoElement>(null);

  const backgrdoundRef = useRef<HTMLImageElement>(null);

  // const mockUpDesTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
            if (iphoneScreenRef.current) {
              iphoneScreenRef.current.play(); // 화면에 보일 때 재생
            }
          } else {
            if (iphoneScreenRef.current) {
              iphoneScreenRef.current.pause(); // 화면에서 벗어나면 일시 정지
            }
          }
        });
      },
      { threshold: 0.7 }, // 요소가 50% 보일 때 트리거
    );

    if (iphoneMockupRef.current) {
      observer.observe(iphoneMockupRef.current);
    }
    if (iphoneScreenRef.current) {
      observer.observe(iphoneScreenRef.current);
    }

    if (backgrdoundRef.current) {
      observer.observe(backgrdoundRef.current);
    }

    return () => {
      if (iphoneMockupRef.current) observer.unobserve(iphoneMockupRef.current);
      if (iphoneScreenRef.current) observer.unobserve(iphoneScreenRef.current);
      if (backgrdoundRef.current) observer.unobserve(backgrdoundRef.current);
    };
  }, []);

  const toStadiumPage = (stadiumId: string) => {
    navigate('/stadium', { state: { stadiumId } });
  };

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
            ref={backgrdoundRef}
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
            ref={iphoneMockupRef}
            src={iphoneMockup}
            className={styles.iphoneMockup}
            loading="lazy"
            alt=""
          />
          {/* <img
            ref={iphoneScreenRef}
            src={Vector}
            className={styles.iphoneScreen}
            alt=""
            loading="lazy"
          /> */}
          <video
            muted
            preload="none"
            ref={iphoneScreenRef}
            className={styles.iphoneScreen}
          >
            <source src={mockupVideo} />
          </video>
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

            <BlurInfoBox></BlurInfoBox>
          </div>

          {mainData && mainData.randomStadium ? (
            <div
              className={styles.oneInfo}
              onClick={() => toStadiumPage(mainData.randomStadium.stadiumId)}
            >
              <div className={styles.stadium}>
                <div className={styles.stadiumImage}>
                  <img
                    src={mainData.randomStadium.image}
                    alt=""
                    width="160px"
                    height="125px"
                  />
                </div>
                <div className={styles.stadiumInfo}>
                  <div className={styles.stadium}>
                    <div className={styles.topInfo}>
                      {mainData.randomStadium.condition === 'OVERALL' ? (
                        <>
                          <div className={styles.isOutside}>실내</div>
                          <div className={styles.isOutside}>실외</div>
                        </>
                      ) : mainData.randomStadium.condition === 'INDOOR' ? (
                        <div className={styles.isOutside}>실내</div>
                      ) : (
                        <div className={styles.isOutside}>실외</div>
                      )}

                      <div className={styles.isParking}>
                        {mainData.randomStadium.isParking
                          ? '주차 가능'
                          : '주차 불가능'}
                      </div>
                    </div>

                    <span id={styles.name}>{mainData.randomStadium.name}</span>

                    <div id={styles.info}>
                      <div className={styles.line}>
                        <img src={location} alt="" width="16px" height="16px" />
                        <div className={styles.info}>
                          {mainData.randomStadium.location}
                        </div>
                        {/* <div className={styles.info}>한성대학교</div> */}
                      </div>

                      <div className={styles.line}>
                        <img src={clock} alt="" width="16px" height="16px" />
                        <span className={styles.info}>
                          {mainData.randomStadium.hours}
                        </span>
                        {/* <span className={styles.info}>10:00~24:00</span> */}
                      </div>

                      <div className={styles.line}>
                        <img src={parking} alt="" width="16px" height="16px" />

                        <span className={styles.info}>
                          {mainData?.randomStadium?.isParking
                            ? '무료 주차장'
                            : '유료 주차장'}
                        </span>
                        {/* <span className={styles.info}>유료 주차</span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={styles.oneInfo}
              // onClick={() => toStadiumPage(stadium.stadiumId)}
            >
              <div className={styles.stadium}>
                <div className={styles.stadiumImage}>
                  <img src={stadiumEx} alt="" width="180px" height="140px" />
                </div>
                <div className={styles.stadiumInfo}>
                  <div className={styles.stadium}>
                    <div className={styles.topInfo}>
                      <div className={styles.isOutside}>
                        {/* {stadium.isOutside ? '실외' : '실내'} */}
                        실외
                      </div>
                      <div className={styles.isParking}>
                        {/* {stadium.isOutside ? '주차 가능' : '주차 불가능'} */}
                        주차 가능
                      </div>
                    </div>

                    <span id={styles.name}>
                      {/* {stadium.name} */}
                      한성대 풋살장
                    </span>

                    <div id={styles.info}>
                      <div className={styles.line}>
                        <img src={location} alt="" width="16px" height="16px" />
                        {/* <div className={styles.info}>{stadium.location}</div> */}
                        <div className={styles.info}>한성대학교</div>
                      </div>

                      <div className={styles.line}>
                        <img src={clock} alt="" width="16px" height="16px" />
                        {/* <span className={styles.info}>{stadium.hours}</span> */}
                        <span className={styles.info}>10:00:24:00</span>
                      </div>

                      <div className={styles.line}>
                        <img src={parking} alt="" width="16px" height="16px" />

                        {/* <span className={styles.info}>{stadium.parking}</span> */}
                        <span className={styles.info}>유료 주차</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
              {mainData != null && mainData.popular ? (
                <div className={styles.group}>
                  <div
                    className={styles.testVideo}
                    onClick={() => toCommunityPage()}
                  >
                    <img
                      src={mainData.popular.image}
                      className={styles.mainImg}
                      alt=""
                      width="266px"
                      height="150px"
                      loading="lazy"
                    />

                    <img
                      src={playBtnIcon}
                      className={styles.subImg}
                      alt=""
                      width="60px"
                      height="60px"
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.videoDes}>
                    <div className={styles.title}>
                      {mainData.popular.stadiumName}
                    </div>
                    <div className={styles.videoDetail}>
                      <p>{mainData.popular.location}</p>
                      <p>
                        {mainData.popular.date} | {mainData.popular.hours}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.group}>
                  <div className={styles.testVideo}>
                    <img
                      src={playBtnIcon}
                      className={styles.subImg}
                      alt=""
                      width="60px"
                      height="60px"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.videoDes}>
                    <div className={styles.title}>영상 제목</div>
                    <div className={styles.videoDetail}>
                      <p>구장 주소</p>
                      <p>0000.00.00.0 | 00:00~00:00</p>
                    </div>
                  </div>
                </div>
              )}
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
            <a
              id={styles.button}
              href="https://nonstop-bottle-b75.notion.site/11a7791a343180afb0b9c0a0debefc56?pvs=25"
              target="_blank"
            >
              제휴 문의하기
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
