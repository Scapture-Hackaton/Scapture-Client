import styles from '../scss/footer.module.scss';
import ScaptureLogo from '../image/scapture-logo.png';
import KakaoLogo from '../image/kakao-logo.png';
import InstagramLogo from '../image/instagram-logo.png';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div id={styles.image}>
          <img src={ScaptureLogo}></img>
        </div>
        <div className={styles.contents}>
          <div>서비스 소개</div>
          <div>Scapture</div>
          <div>커뮤니티</div>
          <div>FAQ</div>
          <div>공지사항</div>
        </div>
        <div className={styles.copyright}>
          <span>
            @Copyright <b>Scapture</b> All rights reserved.
          </span>
          <span id={styles.terms}>이용약관</span>
          <span id={styles.policy}>개인정보처리방침</span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.info}>
            <span>스캡쳐</span>
            <span>사업자등록번호 : 149-62-00716</span>
            <span>대표 : 최용석</span>
            <span>주소 : 서울특별시 강서구 강서로35길 58 </span>
            <span>이메일 : scapture0526@gmail.com</span>
          </div>
          <div className={styles.shortcut}>
            <div>
              <img src={InstagramLogo} />
            </div>
            <div id={styles.kakao}>
              <img src={KakaoLogo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
