import React, { useState } from 'react';
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // 이미지 클릭 시 모달 열기
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      {images ? (
        <>
          <Slider {...settings} className={styles.banner}>
            {images.map((image: ImagesType, idx) => (
              <div className={styles.test} key={idx}>
                <img
                  src={image.image}
                  alt=""
                  width="450px"
                  height="300px"
                  onClick={() => handleImageClick(image.image)} // 클릭 이벤트 추가
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </Slider>
          {/* 모달 */}
          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContent}>
                <img
                  src={selectedImage as string}
                  alt="Selected"
                  className={styles.modalImage}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default StadiumImages;
