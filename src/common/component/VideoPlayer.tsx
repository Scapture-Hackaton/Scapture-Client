import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-eme';
import CryptoJS from 'crypto-js';

interface VideoPlayerProps {
  videoSrc: string; // HLS URL
  //   drmType: string; // DRM 유형 (Widevine, PlayReady, FairPlay)
  licenseUrl: string; // PallyCon 라이선스 URL
}

const pallyconSiteKey = `${import.meta.env.VITE_PALLYCON_SITE_KEY}`;
const pallyconAccessKey = `${import.meta.env.VITE_PALLYCON_ACCESS_KEY}`;
const pallyconSiteId = `${import.meta.env.VITE_PALLYCON_SITE_ID}`;
const contentId = `${import.meta.env.VITE_CONTENT_ID}`;
const userId = `${import.meta.env.VITE_USER_ID}`;
const iv = `${import.meta.env.VITE_IV}`;

const licensePolicy = {
  policy_version: 2,
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  //   drmType,
  licenseUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [drmType, setDrmType] = useState<string | null>(null);

  useEffect(() => {
    const type = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case type.indexOf('edge') > -1:
        setDrmType('PlayReady');
        break;
      case type.indexOf('chrome') > -1:
        setDrmType('Widevine');
        break;
      case type.indexOf('safari') > -1:
        setDrmType('FairPlay');
        break;
      default:
        setDrmType(null);
    }
  }, []);

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
        controls: true,
        autoplay: false,
        preload: 'auto',
        sources: [
          {
            src: videoSrc,
            type: getMimeType(drmType),
          },
        ],
      });
      playerRef.current.on('error', () => {
        console.error('VideoJS Error:', playerRef.current.error());
      });

      playerRef.current.ready(() => {
        playerRef.current.eme();
        const keySystems = getKeySystems(drmType, licenseUrl, base64Token);

        if (keySystems) {
          playerRef.current.src({
            src: videoSrc,
            type: getMimeType(drmType), // MIME 타입 설정
            keySystems,
          });
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
  }, [videoSrc, drmType, licenseUrl, base64Token]);

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
            persistentState: 'required',
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
        width="640"
        height="360"
      />
    </div>
  );
};

export default VideoPlayer;
