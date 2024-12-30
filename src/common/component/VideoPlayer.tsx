// import styles from '../scss/video.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-eme';
import CryptoJS from 'crypto-js';
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';
// import '@videojs/http-streaming';
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
  const [drmType, setDrmType] = useState<string | null>(null);
  const [base64Token, setBase64Token] = useState<string | null>(null);

  const licenseUrl = 'https://license-global.pallycon.com/ri/licenseManager.do';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  // console.log(videoSrc);

  // useEffect(() => {
  //   const type = navigator.userAgent.toLowerCase();

  //   if (type.includes('safari') && !type.includes('chrome')) {
  //     // Safari 브라우저 (FairPlay 사용)
  //     setDrmType('FairPlay');
  //     setFinalVideoSrc(`${videoSrc}/HLS/${contentId}.m3u8`);
  //   } else if (type.includes('edge') || type.includes('edg')) {
  //     // Edge 브라우저 (PlayReady 사용)
  //     setDrmType('PlayReady');
  //     setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
  //   } else if (
  //     type.includes('chrome') ||
  //     type.includes('samsungbrowser') ||
  //     type.includes('firefox')
  //   ) {
  //     // Chrome, Samsung 브라우저, Firefox (Widevine 사용)
  //     setDrmType('Widevine');
  //     setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
  //   } else {
  //     // 지원하지 않는 브라우저의 경우
  //     setDrmType(null);
  //   }
  // }, [videoSrc, contentId]);

  // useEffect(() => {
  //   const userAgent = navigator.userAgent.toLowerCase();

  //   // 브라우저와 OS 체크
  //   const isSafari =
  //     userAgent.includes('safari') && !userAgent.includes('chrome');
  //   const isEdge = userAgent.includes('edge') || userAgent.includes('edg');
  //   const isChrome = userAgent.includes('chrome') && !isEdge;
  //   const isFirefox = userAgent.includes('firefox');
  //   const isSamsungBrowser = userAgent.includes('samsungbrowser');
  //   const isWindows = userAgent.includes('windows');
  //   // const isMac = userAgent.includes('mac');

  //   // Windows에서 Edge, Chrome, Firefox는 PlayReady 사용
  //   if (isWindows) {
  //     if (isEdge) {
  //       setDrmType('PlayReady');
  //       setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
  //     } else if (isChrome || isFirefox || isSamsungBrowser) {
  //       setDrmType('Widevine');
  //       setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
  //     }
  //   } else if (isSafari && !isWindows) {
  //     // macOS 또는 iOS의 Safari (FairPlay 사용)
  //     setDrmType('FairPlay');
  //     setFinalVideoSrc(`${videoSrc}/HLS/${contentId}.m3u8`);
  //   } else if (isEdge) {
  //     // Edge에서 PlayReady 사용
  //     setDrmType('PlayReady');
  //     setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
  //   } else if (isChrome || isFirefox || isSamsungBrowser) {
  //     // 비-Windows에서 Widevine 사용
  //     setDrmType('Widevine');
  //     setFinalVideoSrc(`${videoSrc}/DASH/${contentId}.mpd`);
  //   } else {
  //     // 지원되지 않는 브라우저의 경우
  //     setDrmType(null);
  //   }
  // }, [videoSrc, contentId]);

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
      const cipher = CryptoJS.AES.encrypt(
        JSON.stringify(licensePolicy),
        CryptoJS.enc.Utf8.parse(pallyconSiteKey),
        {
          iv: CryptoJS.enc.Utf8.parse(iv),
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC,
        },
      ).toString();

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

      // console.log(drmType);

      setBase64Token(
        CryptoJS.enc.Base64.stringify(
          CryptoJS.enc.Utf8.parse(JSON.stringify(tokenData)),
        ),
      );
    }
  }, [drmType]);

  //   const base64Token = sha256.toString(CryptoJS.enc.Base64);

  //   console.log(pallyconSiteKey);

  //   console.log('token json : ' + JSON.stringify(tokenData));

  //   console.log(base64Token);

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
        // sources: [
        //   {
        //     src: finalVideoSrc,
        //     type: getMimeType(drmType),
        //   },
        // ],
        html5: {
          // nativeAudioTracks: false,
          // nativeVideoTracks: false,
          // nativeHls: true,
          // hls: {
          //   overrideNative: true,
          // },
          // vhs: {
          //   withCredentials: true,
          // },
        },
      });

      // 화질 선택 플러그인 설정
      const qualityLevels = playerRef.current.qualityLevels();

      // 가장 높은 화질을 기본 설정
      // qualityLevels.on('addqualitylevel', () => {
      //   for (let i = 0; i < qualityLevels.length; i++) {
      //     qualityLevels[i].enabled = true; // 모든 품질 레벨을 활성화
      //   }
      // });
      qualityLevels.on('addqualitylevel', () => {
        let highestQuality = 0;

        // 가장 높은 화질 찾기
        for (let i = 0; i < qualityLevels.length; i++) {
          if (qualityLevels[i].height > qualityLevels[highestQuality].height) {
            highestQuality = i;
          }
          qualityLevels[i].enabled = false; // 모든 품질 레벨 비활성화
        }

        // 가장 높은 화질 활성화
        qualityLevels[highestQuality].enabled = true;
      });

      playerRef.current.ready(() => {
        const keySystems = getKeySystems(drmType, licenseUrl, base64Token);

        // console.log(base64Token);
        // console.log(finalVideoSrc);

        if (keySystems) {
          playerRef.current.eme();

          playerRef.current.src({
            src: finalVideoSrc,
            type: getMimeType(drmType), // MIME 타입 설정
            keySystems,
          });
          // console.log(finalVideoSrc);
          // console.log(getMimeType(drmType));
          // console.log(keySystems);

          playerRef.current.httpSourceSelector();
        } else {
          console.error('지원되지 않는 DRM 유형');
        }
      });
      playerRef.current.on('error', () => {
        console.error('Video.js Error:', playerRef.current.error());
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [drmType, base64Token]);

  const base64DecodeUint8Array = (input: any) => {
    const raw = window.atob(input);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) array[i] = raw.charCodeAt(i);

    return array;
  };

  const base64EncodeUint8Array = (input: any) => {
    const keyStr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN;
      chr3 = i < input.length ? input[i++] : Number.NaN;

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output +=
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
    }
    return output;
  };

  const arrayToString = (array: any) => {
    const uint16array: any = new Uint16Array(array.buffer);
    return String.fromCharCode.apply(null, uint16array);
  };

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
          // 'com.apple.fps.1_0': {
          //   certificateUri: `https://license-global.pallycon.com/ri/fpsKeyManager.do?siteId=${pallyconSiteId}`, // 인증서 URL
          //   licenseUri: licenseUrl,
          //   licenseHeaders: {
          //     'pallycon-customdata-v2': token,
          //   },
          // },
          'com.apple.fps.1_0': {
            getCertificate: (_emeOptions: any, callback: any) => {
              videojs.xhr(
                {
                  url: `https://license-global.pallycon.com/ri/fpsKeyManager.do?siteId=${pallyconSiteId}`,
                  method: 'GET',
                },
                (err, _response: any, responseBody) => {
                  if (err) {
                    callback(err);
                    return;
                  }
                  callback(null, base64DecodeUint8Array(responseBody));
                },
              );
            },
            getContentId: (_emeOptions: any, initData: any) => {
              const contentId = arrayToString(initData);
              return contentId.substring(contentId.indexOf('skd://') + 6);
            },
            getLicense: (
              _emeOptions: any,
              _contentId: any,
              keyMessage: any,
              callback: any,
            ) => {
              videojs.xhr(
                {
                  url: licenseUrl,
                  method: 'POST',
                  responseType: 'text',
                  body: 'spc=' + base64EncodeUint8Array(keyMessage),
                  headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'pallycon-customdata-v2': token,
                  },
                },
                (err, _response: any, responseBody) => {
                  if (err) {
                    callback(err);
                    return;
                  }
                  callback(null, base64DecodeUint8Array(responseBody));
                },
              );
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
