// import styles from '../scss/video.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-eme';
import CryptoJS from 'crypto-js';
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';
import { v4 as uuidv4 } from 'uuid';

interface VideoPlayerProps {
  videoSrc: string; // HLS URL
  contentId: string;
  //   drmType: string; // DRM 유형 (Widevine, PlayReady, FairPlay)
  // licenseUrl: string; // PallyCon 라이선스 URL
}

const pallyconSecretKey = `${import.meta.env.VITE_NAVER_SITE_KEY}`;
const pallyconAccessKey = `${import.meta.env.VITE_NAVER_ACCESS_KEY}`;
const pallyconSiteId = `${import.meta.env.VITE_NAVER_SITE_ID}`;

// const contentId = `${import.meta.env.VITE_CONTENT_ID}`;
// const userId = `${import.meta.env.VITE_USER_ID}`;
const userId = uuidv4();

// const iv = `${import.meta.env.VITE_IV}`;

// const licensePolicy = {
//   policy_version: 2,
// };

const NaverVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  contentId,
  //   drmType,
  // licenseUrl,
}) => {
  const [finalVideoSrc, setFinalVideoSrc] = useState<string>(videoSrc);
  const [drmType, setDrmType] = useState<string | null>(null);
  const [base64Token, setBase64Token] = useState<string | null>(null);
  const timeStamp = String(Date.now());

  const licenseUrl = 'https://multi-drm.apigw.ntruss.com/api/v1/license';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  // DRM TYPE 지정
  const checkDRM = async () => {
    const type = navigator.userAgent.toLowerCase();

    if (type.includes('safari') && !type.includes('chrome')) {
      // Safari 브라우저 (FairPlay 사용)
      setDrmType('FairPlay');
      setFinalVideoSrc(`${videoSrc}/HLS/${contentId}.m3u8`);
    } else if (type.includes('edge') || type.includes('edg')) {
      // Edge 브라우저 (PlayReady 사용)
      setDrmType('PlayReady');
      setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
    } else if (
      type.includes('chrome') ||
      type.includes('samsungbrowser') ||
      type.includes('firefox')
    ) {
      // Chrome, Samsung 브라우저, Firefox (Widevine 사용)
      setDrmType('Widevine');
      setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
    } else {
      // 지원하지 않는 브라우저의 경우
      setDrmType(null);
    }

    const config = [
      {
        initDataTypes: ['cenc'],
        audioCapabilities: [
          {
            contentType: 'audio/mp4;codecs="mp4a.40.2"',
          },
        ],
        videoCapabilities: [
          {
            contentType: 'video/mp4;codecs="avc1.42E01E"',
          },
        ],
      },
    ];

    const fairPlayConfig = [
      {
        initDataTypes: ['sinf'],
        audioCapabilities: [
          {
            contentType: 'audio/mp4;codecs="mp4a.40.2"',
          },
        ],
        videoCapabilities: [
          {
            contentType: 'video/mp4;codecs="avc1.42E01E"',
          },
        ],
      },
    ];

    try {
      navigator
        .requestMediaKeySystemAccess('com.apple.fps.1_0', fairPlayConfig)
        .then(() => {
          setDrmType('FairPlay');
          setFinalVideoSrc(`${videoSrc}/HLS/${contentId}.m3u8`);
          // console.log(mediaKeySystemAccess);
          // console.log('clearkey support ok');
        })
        .catch(e => {
          // console.log('no clearkey support');
          console.log(e);
        });
    } catch (e) {
      // console.log('no clearkey support');
      console.log(e);
    }

    try {
      navigator
        .requestMediaKeySystemAccess('com.widevine.alpha', config)
        .then(() => {
          setDrmType('Widevine');
          setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);

          // console.log(mediaKeySystemAccess);
          // console.log('widevine support ok');
        })
        .catch(e => {
          // console.log('no widevine support');
          console.log(e);
        });
    } catch (e) {
      // console.log('no widevine support');
      console.log(e);
    }
    try {
      navigator
        .requestMediaKeySystemAccess('com.microsoft.playready', config)
        .then(() => {
          setDrmType('PlayReady');
          setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);

          // console.log(mediaKeySystemAccess);
          // console.log('playready support ok');
        })
        .catch(e => {
          // console.log('no playready support');
          console.log(e);
        });
    } catch (e) {
      // console.log('no playready support');
      console.log(e);
    }
  };

  useEffect(() => {
    checkDRM();
  }, [videoSrc, contentId]);

  //   console.log(cipher);

  useEffect(() => {
    if (drmType) {
      const tokenData = {
        siteId: pallyconSiteId,
        contentId,
        drmType: drmType?.toUpperCase(),
        responseFormat: 'ORIGINAL',
        userId,
      };

      // JSON 데이터 문자열로 변환
      const jsonString = JSON.stringify(tokenData);

      // Base64 인코딩
      const base64 = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(jsonString),
      );

      // Base64 URL-safe 변환
      const base64Url = base64
        .replace(/\+/g, '-') // '+'를 '-'로 변환
        .replace(/\//g, '_') // '/'를 '_'로 변환
        .replace(/=+$/, ''); // '=' 제거

      // 상태 업데이트
      setBase64Token(base64Url);
    }
  }, [drmType, pallyconSiteId, contentId, userId]);

  // DRM 유형에 따른 MIME 타입 반환
  const getMimeType = (drmType: string) => {
    return drmType === 'Widevine' || drmType === 'PlayReady'
      ? 'application/dash+xml' // DASH 포맷
      : 'application/x-mpegURL'; // HLS 포맷 (FairPlay)
  };

  useEffect(() => {
    if (videoRef.current && drmType && base64Token) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: true, // 자동 재생 설정
        controls: true, // 플레이어 컨트롤 표시 설정
        // crossOrigin: 'anonymous', // 교차 출처 리소스 공유 설정
        responsive: true, // 반응형 플레이어 설정
        fluid: true, // 컨테이너 크기에 맞게 플레이어 크기 조절
        playbackRates: [2, 1.5, 1.25, 1, 0.75, 0.5], // 사용 가능한 재생 속도 옵션
        // touchEnabled: true, // 터치 이벤트 활성화 설정
        controlBar: {
          // 컨트롤 바 설정
          playToggle: true, // 재생/일시정지 토글 버튼 활성화
          remainingTimeDisplay: true, // 남은 시간 표시 활성화
          progressControl: true, // 진행률 컨트롤 활성화
          pictureInPictureToggle: true, // 화면 내 화면(PiP) 토글 버튼 활성화
          currentTimeDisplay: true, // 현재 재생 시간 표시 활성화
          // qualitySelector: true, // 화질 선택 컨트롤 활성화
        },
        preload: 'auto',
        sources: [
          {
            src: finalVideoSrc,
            type: getMimeType(drmType),
          },
        ],
        html5: {
          nativeAudioTracks: false,
          nativeVideoTracks: false,
          hls: {
            overrideNative: true,
          },
        },
      });

      // 화질 선택 플러그인 설정
      const qualityLevels = playerRef.current.qualityLevels();

      // 가장 높은 화질을 기본 설정
      qualityLevels.on('addqualitylevel', () => {
        for (let i = 0; i < qualityLevels.length; i++) {
          qualityLevels[i].enabled = true; // 모든 품질 레벨을 활성화
        }
      });

      playerRef.current.on('error', () => {
        console.error('VideoJS Error:', playerRef.current.error());
      });

      playerRef.current.ready(() => {
        playerRef.current.eme();

        const keySystems = getKeySystems(drmType, licenseUrl, base64Token);
        console.log(keySystems);

        if (keySystems) {
          playerRef.current.src({
            src: finalVideoSrc,
            type: getMimeType(drmType), // MIME 타입 설정
            keySystems,
          });

          playerRef.current.httpSourceSelector();
        } else {
          console.error('지원되지 않는 DRM 유형');
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [drmType, base64Token]);

  const makeSignature = () => {
    const space = ' '; // one space
    const newLine = '\n'; // new line
    const method = 'GET'; // method
    const url = '/api/v2/channels?pageNo=1'; // url (include query string)
    const timestamp = timeStamp; // current timestamp (epoch)
    const accessKey = pallyconAccessKey; // access key id (from portal or Sub Account)
    const secretKey = pallyconSecretKey; // secret key (from portal or Sub Account)

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  };

  const signature = makeSignature();

  // DRM 유형에 따른 키 시스템 설정
  const getKeySystems = (
    drmType: string,
    licenseUrl: string,
    token: string,
  ) => {
    switch (drmType) {
      case 'Widevine':
        return {
          'com.widevine.alpha': {
            src: finalVideoSrc, //DRM Encryption 이 적용된 DRM 콘텐츠 재생 경로
            licenseUri: licenseUrl, //DRM license 발급을 위한 경로
            licenseRequestHeader: {
              'Content-Type': 'application/json',
              'X-NCP-REGION_CODE': 'KR',
              'X-ncp-apigw-timestamp': timeStamp,
              'X-ncp-iam-access-key': pallyconAccessKey,
              'x-ncp-apigw-signature-v2': signature,
              'X-DRM-TOKEN': token,
            }, //One Click Multi DRM 상품 활용을 위한 apigw 필수 인증 및 X-DRM-TOKEN 헤더값
          },
        };
      case 'PlayReady':
        return {
          'com.microsoft.playready': {
            url: licenseUrl,
            licenseHeaders: {
              'pallycon-customdata-v2': token,
            },
          },
        };
      case 'FairPlay':
        return {
          'com.apple.fps.1_0': {
            certificateUri: `https://license-global.pallycon.com/ri/fpsKeyManager.do?siteId=${pallyconSiteId}`, // 인증서 URL
            licenseUri: licenseUrl,
            headers: {
              'pallycon-customdata-v2': token,
            },
          },
        };
      default:
        return null;
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        controls
        preload="auto"
      />
    </div>
  );
};

export default NaverVideoPlayer;
