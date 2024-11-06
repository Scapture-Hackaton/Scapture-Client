import React from 'react';
import { AllianceStadiumDto } from '../../../apis/dto/main.dto';

import styles from '../scss/main.module.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

interface AllianceStadiumProps {
  stadiumList: AllianceStadiumDto[];
}
//css도 - props 필요
const AllianceStadium: React.FC<AllianceStadiumProps> = ({ stadiumList }) => {
  const settings = {
    // dots: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    nfinite: true,
  };

  const navigate = useNavigate();

  const toStadium = (stadiumId: number) => {
    navigate('/stadium', { state: { stadiumId } });
  };

  return (
    <>
      {stadiumList ? (
        <Slider {...settings} className={styles.stadiumList}>
          {stadiumList.map((allianceStadium: AllianceStadiumDto) => (
            <div
              className={styles.item}
              key={allianceStadium.stadiumId}
              onClick={() => toStadium(allianceStadium.stadiumId)}
            >
              <img src={allianceStadium.image} alt="" loading="lazy" />
              <div>{allianceStadium.name}</div>
            </div>
          ))}
        </Slider>
      ) : null}
    </>
  );
};

export default AllianceStadium;
