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
            <div>스캡쳐(Scapture)</div>
            <div>사업자등록번호 : 149-62-00716</div>
            <div>통신판매업신고번호 : 2024-서울관악-1789</div>
            <div>대표 : 최용석</div>
            <div>주소 : 서울특별시 서울특별시 관악구 봉천로545, 501호</div>
            <div>이메일 : scapture0526@gmail.com</div>
          </div>

          <div className={styles.bottomGroup}>
            <div className={styles.terms}>
              <span id={styles.terms}>이용약관</span>
              <a
                id={styles.policy}
                href="https://nonstop-bottle-b75.notion.site/Scapture-1187791a343180fbb205f8911578629b"
                target="_blank"
                rel="noopener noreferrer"
              >
                개인정보처리방침
              </a>
            </div>

            <div className={styles.shortcut}>
              <img
                src={instagramIcon}
                loading="lazy"
                alt=""
                onClick={() => {
                  window.location.href =
                    'https://www.instagram.com/scapture_official/';
                }}
              ></img>

              <img src={kakaotalkIcon} loading="lazy" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
