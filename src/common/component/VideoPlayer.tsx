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

const pallyconSiteKey = `${import.meta.env.VITE_PALLYCON_SITE_KEY}`;
const pallyconAccessKey = `${import.meta.env.VITE_PALLYCON_ACCESS_KEY}`;
const pallyconSiteId = `${import.meta.env.VITE_PALLYCON_SITE_ID}`;
// const contentId = `${import.meta.env.VITE_CONTENT_ID}`;
// const userId = `${import.meta.env.VITE_USER_ID}`;
const userId = uuidv4();

const iv = `${import.meta.env.VITE_IV}`;

const licensePolicy = {
  policy_version: 2,
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  contentId,
  //   drmType,
  // licenseUrl,
}) => {
  const [finalVideoSrc, setFinalVideoSrc] = useState<string>(videoSrc);
  const licenseUrl = 'https://license-global.pallycon.com/ri/licenseManager.do';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [drmType, setDrmType] = useState<string | null>(null);

  // console.log(videoSrc);

  useEffect(() => {
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
  }, [videoSrc, contentId]);

  const cipher = CryptoJS.AES.encrypt(
    JSON.stringify(licensePolicy),
    CryptoJS.enc.Utf8.parse(pallyconSiteKey),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    },
  ).toString();

  //   console.log(cipher);

  const UTCTime = new Date().toISOString().replace(/\.\d{3}/gi, '');

  const hashOrigin =
    pallyconAccessKey +
    drmType +
    pallyconSiteId +
    userId +
    contentId +
    cipher +
    UTCTime;

  const sha256 = CryptoJS.SHA256(hashOrigin);
  const hash = sha256.toString(CryptoJS.enc.Base64);

  //   const base64Token = sha256.toString(CryptoJS.enc.Base64);
  const tokenData = {
    drm_type: drmType,
    site_id: pallyconSiteId,
    user_id: userId,
    cid: contentId,
    policy: cipher,
    timestamp: UTCTime,
    hash: hash,
    response_format: 'original',
    key_rotation: false,
  };

  //   console.log(pallyconSiteKey);

  //   console.log('token json : ' + JSON.stringify(tokenData));

  const base64Token = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(tokenData)),
  );

  //   console.log(base64Token);

  // DRM 유형에 따른 MIME 타입 반환
  const getMimeType = (drmType: string) => {
    return drmType === 'Widevine' || drmType === 'PlayReady'
      ? 'application/dash+xml' // DASH 포맷
      : 'application/x-mpegURL'; // HLS 포맷 (FairPlay)
  };

  useEffect(() => {
    if (videoRef.current && drmType) {
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
  }, [drmType]);

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
            url: licenseUrl,
            licenseHeaders: {
              'pallycon-customdata-v2': token,
            },
            // persistentState: 'required',
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

export default VideoPlayer;
