import React, { useRef, useState } from 'react';
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

  // 클릭과 드래그 구분을 위한 상태
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0); // 드래그 시작 위치 저장

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    dotsClass: 'dotCss',
  };

  // 이미지 클릭 시 모달 열기
  const handleImageClick = (image: string) => {
    // 드래그 중이면 클릭 이벤트 무시
    if (!isDragging) {
      setSelectedImage(image);
      setModalOpen(true);
    }
  };

  // 드래그 시작 시 마우스 위치 저장
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dragStartX.current = e.clientX;
    setIsDragging(false);
  };

  // 드래그 끝날 때 드래그 여부 확인
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (Math.abs(e.clientX - dragStartX.current) < 3) {
      setIsDragging(false); // 드래그가 아니면 클릭으로 간주
    } else {
      setIsDragging(true); // 드래그로 간주
    }
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
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onClick={() => handleImageClick(image.image)}
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
