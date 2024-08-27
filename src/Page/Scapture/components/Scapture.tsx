import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';

import mainIcon from '../image/mainIcon.svg';
import bannerImg from '../image/bannerImg.svg';
import searchIcon from '../image/searchIcon.svg';
import styles from '../scss/scapture.module.scss';
import SelectBtn from './SelectBtn';
import { useEffect, useState } from 'react';
import {
  getStadiumList,
  searchStadiumList,
} from '../../../apis/api/scapture.api';

import { Stadium } from '../../../apis/dto/scapture.dto';
import Stadiums from './Stadiums';

const Scapture = () => {
  const selectCity = ['서울시', '경기도'];
  // const selectState: Record<string, string[]> = {
  //   서울시: [
  //     // '성북구',
  //     // '강서구',
  //     '양천구',
  //     '구로구',
  //     // '영등포구',
  //     '관악구',
  //     '금천구',
  //     '동작구',
  //     '서초구',
  //     // '강남구',
  //     '송파구',
  //     '강동구',
  //     '광진구',
  //     '중랑구',
  //     // '노원구',
  //     '도봉구',
  //     '강북구',
  //     // '동대문구',
  //     '성동구',
  //     '중구',
  //     '용산군',
  //     '종로구',
  //     '서대문구',
  //     '마포구',
  //     '은평구',
  //     '중랑구',
  //   ],

  //   인천: [
  //     '중구',
  //     '동구',
  //     '미추홀구',
  //     '연수구',
  //     '남동구',
  //     '부평구',
  //     '계양구',
  //     '서구',
  //     '강화군',
  //     '웅진군',
  //   ],

  //   경기도: [
  //     '김포',
  //     '파주',
  //     // '고양',
  //     '양주',
  //     '의정부',
  //     '남양주',
  //     '하남',
  //     '광주',
  //     '성남',
  //     '수원',
  //     '과천',
  //     '안양',
  //     '광명',
  //     '부천',
  //     '시흥',
  //     '안산',
  //     '용인',
  //   ],
  // };

  const selectState: Record<string, string[]> = {
    서울시: ['성북구', '강서구', '영등포구', '강남구', '노원구', '동대문구'],
    경기도: ['고양'],
  };

  // 선택된 도시에 따라 리스트 변경
  const [isCity, setCity] = useState(selectCity[0]);
  const [isState, setState] = useState(selectState[isCity][0]);
  // 리스트로 보여줄 데이터
  const [stadiumData, setStadiumData] = useState<Stadium[]>([]);

  // 도시 선택시
  const handleCityChange = (city: string) => {
    setCity(city);
    setState(selectState[city][0]); // City 변경 시 state 리스트 초기화
  };

  // 지역 선택시
  const handleStateChange = (state: string) => {
    setState(state);
  };

  // 첫 화면 로드 및 city나 state가 변경되었을 때 리스트 가져오기
  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await getStadiumList(isCity, isState);
      setStadiumData(data);
    };

    fetchInitialData();
  }, [isCity, isState]);

  // 리스트 가져오기
  // const { data: stadiums } = useQuery({
  //   queryKey: ['stadiums', isCity, isState],
  //   queryFn: () => getStadiumList(isCity, isState),
  //   onSuccess: (data: Stadium[]) => {
  //     setStadiumData(data);
  //   },
  //   initialData: [] as Stadium[],
  // });

  // 댓글 창의 입력 감지
  const [isInput, setInput] = useState('');
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 엔터를 눌렀을 경우에도 댓글 작성이 가능하도록
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchSearchResults();
      setInput('');
    }
  };

  const fetchSearchResults = async () => {
    const data = await searchStadiumList(isInput);
    // console.log(data);

    setStadiumData(data);
  };

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.scapture}>
        <div className={styles.banner}>
          <img src={bannerImg} alt="" width="450px" height="480px" />
          <div className={styles.bannerText}>
            <img src={mainIcon} alt="" width="54px" height="54px" />
            <span>구장을 클릭하면,</span>
            <span>새로운 플레이 그라운드가 열립니다.</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.option}>
            <div className={styles.container}>
              <div id={styles.search}>
                <input
                  type="text"
                  placeholder="구장명 검색"
                  onChange={changeInput}
                  onKeyPress={handleKeyPress}
                  value={isInput}
                />
                <div id={styles.searchImage}>
                  <img
                    src={searchIcon}
                    alt=""
                    onClick={fetchSearchResults}
                    width="20px"
                    height="20px"
                  />
                </div>
              </div>
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
              </div>
            </div>
          </div>

          <Stadiums stadiumData={stadiumData}></Stadiums>
        </div>

        {/* <div className={styles.stadiumList}>
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
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Scapture;
