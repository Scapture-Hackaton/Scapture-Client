import { Link } from "react-router-dom";
import "./dev-ter.module.scss";

const DevTerminal = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Main</Link>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/scapture">Scapture</Link>
          </a>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/stadium">Stadium</Link>
          </a>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/reservation">Reservation</Link>
          </a>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/video">Video</Link>
          </a>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/mypage">My Page</Link>
          </a>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/header">Header</Link>
          </a>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/footer">Footer</Link>
          </a>
        </li>
        <li className="nav-item">
          <a href="">
            <Link to="/dev-ter">Dev Terminal</Link>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default DevTerminal;
