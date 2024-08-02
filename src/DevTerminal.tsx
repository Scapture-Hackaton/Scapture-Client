import Header from './Page/Header/components/Header';
import Footer from './Page/Footer/components/Footer';

import { Link } from 'react-router-dom';
import styles from './dev-ter.module.scss';

const DevTerminal = () => {
  return (
    <div>
      <Header />
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <a href="">
              <Link to="/">Main</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/scapture">Scapture</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/stadium">Stadium</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/reservation">Reservation</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/video">Video</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/mypage">My Page</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/community">community</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/header">Header</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/footer">Footer</Link>
            </a>
          </li>
          <li>
            <a href="">
              <Link to="/dev-ter">Dev Terminal</Link>
            </a>
          </li>
        </ul>
      </nav>
      <Footer />
    </div>
  );
};

export default DevTerminal;
