import React from 'react';
import { AllianceStadiumDto } from '../../../apis/dto/main.dto';

import styles from '../scss/main.module.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface AllianceStadiumProps {
  stadiumList: AllianceStadiumDto[];
}

const AllianceStadium: React.FC<AllianceStadiumProps> = ({ stadiumList }) => {
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  console.log(stadiumList);

  return (
    <Slider {...settings} className={styles.stadiumList}>
      {stadiumList.map((allianceStadium: AllianceStadiumDto) => (
        <div className={styles.items} key={allianceStadium.stadiumId}>
          <img src={allianceStadium.image} alt="" />
          <div>{allianceStadium.name}</div>
        </div>
      ))}
    </Slider>
  );
};

export default AllianceStadium;
