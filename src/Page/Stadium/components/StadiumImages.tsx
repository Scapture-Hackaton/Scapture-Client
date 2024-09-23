import React from 'react';
import styles from '../scss/stadium.module.scss';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface StadiumImagesProps {
  images: ImagesType[];
}

interface ImagesType {
  image: string;
}

const StadiumImages: React.FC<StadiumImagesProps> = ({ images }) => {
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      {images ? (
        <Slider {...settings} className={styles.banner}>
          {images.map((image: ImagesType, idx) => (
            <div className={styles.test} key={idx}>
              <img src={image.image} alt="" width="450px" height="300px" />
            </div>
          ))}
        </Slider>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default StadiumImages;
