import styles from '../scss/footer.module.scss';
import footerIcon from '../image/footerIcon.svg';
import kakaotalkIcon from '../image/kakaotalkIcon.svg';
import instagramIcon from '../image/instagramIcon.svg';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerMenu}>
          <div
            onClick={() => {
              navigate('/');
            }}
          >
            서비스 소개
          </div>
          <div
            onClick={() => {
              navigate('/scapture');
            }}
          >
            Scapture
          </div>
          <div
            onClick={() => {
              navigate('/community');
            }}
          >
            커뮤니티
          </div>
          <div>FAQ</div>
          <div>공지사항</div>
        </div>

        <div className={styles.group}>
          <div id={styles.image}>
            <img
              src={footerIcon}
              loading="lazy"
              onClick={() => {
                navigate('/');
              }}
              alt=""
            ></img>
          </div>

          <div className={styles.info}>
            <div>@Copyright Scapture All rights reserved.</div>
            <div>스캡쳐</div>
            <div>사업자등록번호 : 149-62-00716</div>
            <div>대표 : 최용석</div>
            <div>주소 : 서울특별시 강서구 강서로35길 58 </div>
            <div>이메일 : contact@s-capture.com</div>
          </div>

          <div className={styles.bottomGroup}>
            <div className={styles.terms}>
              <span id={styles.terms}>이용약관</span>
              <span id={styles.policy}>개인정보처리방침</span>
            </div>

            <div className={styles.shortcut}>
              <img src={instagramIcon} loading="lazy" alt="" />
              <img src={kakaotalkIcon} loading="lazy" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
