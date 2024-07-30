import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import bannerImage from '../image/banner-image.png';
import stadiumImage from '../image/stadium-image.png';
import searchImage from '../image/search-image.png';
import styles from '../scss/scapture.module.scss';
import SelectBtn from './SelectBtn';
import { useState } from 'react';
import { getStadiumList } from '../../../apis/api/scapture.api';
import { useQuery } from '@tanstack/react-query';
import { Stadium } from '../../../apis/dto/scapture.dto';

const Scapture = () => {
  const selectCity = ['서울시', '인천', '경기도'];
  const selectState: Record<string, string[]> = {
    서울시: [
      '성북구',
      '강서구',
      '양천구',
      '구로구',
      '영등포구',
      '관악구',
      '금천구',
      '동작구',
      '서초구',
      '강남구',
      '송파구',
      '강동구',
      '광진구',
      '중랑구',
      '노원구',
      '도봉구',
      '강북구',
      '동대문구',
      '성동구',
      '중구',
      '용산군',
      '종로구',
      '서대문구',
      '마포구',
      '은평구',
    ],

    인천: [
      '중구',
      '동구',
      '미추홀구',
      '연수구',
      '남동구',
      '부평구',
      '계양구',
      '서구',
      '강화군',
      '웅진군',
    ],

    경기도: [
      '김포',
      '파주',
      '고양',
      '양주',
      '의정부',
      '남양주',
      '하남',
      '광주',
      '성남',
      '수원',
      '과천',
      '안양',
      '광명',
      '부천',
      '시흥',
      '안산',
      '용인',
    ],
  };

  // 선택된 도시에 따라 리스트 변경
  const [isCity, setCity] = useState(selectCity[0]);
  const [isState, setState] = useState(selectState[isCity][0]);

  const handleCityChange = (city: string) => {
    setCity(city);
    setState(selectState[city][0]); // City 변경 시 state 리스트 초기화
  };

  const handleStateChange = (state: string) => {
    setState(state);
  };

  const { data: stadiums } = useQuery({
    queryKey: ['stadiums', isCity, isState],
    queryFn: () => getStadiumList(isCity, isState),
    initialData: [] as Stadium[],
  });

  console.log(stadiums);

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.scapture}>
        <div className={styles.banner}>
          <img src={bannerImage} alt="" />
          <div className={styles.bannerText}>
            <span>구장을 클릭하면,</span>
            <span>새로운 플레이 그라운드가 열립니다.</span>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.container}>
            <div className={styles.select}>
              <SelectBtn
                selectList={selectCity}
                selectedOption={isCity}
                onOptionChange={handleCityChange}
              ></SelectBtn>
              <SelectBtn
                selectList={selectState[isCity]}
                selectedOption={isState}
                onOptionChange={handleStateChange}
              ></SelectBtn>
              {/* <select id={styles.city}>
                <option value="">도시</option>
              </select>
              <select id={styles.local}>
                <option value="">지역</option>
              </select> */}
            </div>
            <div id={styles.search}>
              <input type="text" placeholder="구장명 검색" />
              <div id={styles.searchImage}>
                <img src={searchImage} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stadiumList}>
          <div className={styles.stadium}>
            <div className={styles.stadiumImage}>
              <img src={stadiumImage} alt="" />
            </div>
            <div className={styles.stadiumInfo}>
              <div className={styles.stadium}>
                <span id={styles.name}>장충테니스장</span>
                <div className={styles.info}>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      구장 위치
                    </span>
                    <span id={styles.info}>
                      서울특별시 중구 장충동2가 산14-103번지
                    </span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      운영 시간
                    </span>
                    <span id={styles.info}>7:00 ~ 19:00</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      실내/실외
                    </span>
                    <span id={styles.info}>실외</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      주차 공간
                    </span>
                    <span id={styles.info}>주차 가능(66면) 5분당 150원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stadiumList}>
          <div className={styles.stadium}>
            <div className={styles.stadiumImage}>
              <img src={stadiumImage} alt="" />
            </div>
            <div className={styles.stadiumInfo}>
              <div className={styles.stadium}>
                <span id={styles.name}>장충테니스장</span>
                <div className={styles.info}>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      구장 위치
                    </span>
                    <span id={styles.info}>
                      서울특별시 중구 장충동2가 산14-103번지
                    </span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      운영 시간
                    </span>
                    <span id={styles.info}>7:00 ~ 19:00</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      실내/실외
                    </span>
                    <span id={styles.info}>실외</span>
                  </div>
                  <div>
                    <span className={styles.title} id={styles.location}>
                      주차 공간
                    </span>
                    <span id={styles.info}>주차 가능(66면) 5분당 150원</span>
                  </div>
                </div>
                {/* css 적용 후 추가 예정 */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Scapture;
