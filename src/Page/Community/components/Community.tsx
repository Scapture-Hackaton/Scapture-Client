import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
import dropDown from '../image/dropDown.png';
import upBtn from '../image/upBtn.png';
import rightArrow from '../image/rightArrow.png';
import leftArrow from '../image/leftArrow.png';

import styles from '../scss/community.module.scss';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Comment from './Comment';
import Heart from './Heart';
import {
  getPopularVideos,
  getVideoDetail,
} from '../../../apis/api/community.api';
import PopularVideoList from './PopularVideoList';

const Community = () => {
  const [isComments, setComments] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: popularVideoData = { data: [] },
    isSuccess: isPopularVideoDataSuccess,
  } = useQuery({
    queryKey: ['popular_videos'],
    queryFn: getPopularVideos,
    initialData: { data: [] },
  });

  const firstVideoId =
    isPopularVideoDataSuccess && popularVideoData.length > 0
      ? popularVideoData[0].videoId
      : null;

  const { data: videoDetailData, isSuccess: isVideoDetailDataSuccess } =
    useQuery({
      queryKey: ['video_detail', firstVideoId],
      queryFn: () =>
        firstVideoId ? getVideoDetail(firstVideoId) : Promise.resolve(null),
      enabled: !!firstVideoId, // firstVideoId가 존재할 때만 쿼리 실행
      initialData: null,
    });

  // onToggleLike 함수 정의
  const handleToggleLike = (videoId: number) => {
    // 성공적으로 API 호출 후 데이터 갱신
    queryClient.invalidateQueries(['popular_videos']);
    queryClient.invalidateQueries(['video_detail', videoId]);
  };

  const handleToggleComments = () => {
    setComments(!isComments);
  };

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.community}>
        {isVideoDetailDataSuccess && videoDetailData ? (
          <>
            <div className={styles.videoContainer}>
              <div className={styles.video}>
                {/* <img src={videoDetailData.image} alt="" /> */}
                <video controls>
                  <source src={videoDetailData.video}></source>
                </video>
              </div>
              <div className={styles.title}>{videoDetailData.name}</div>
            </div>
            <div className={styles.fieldText}>
              {videoDetailData.stadium.name}
            </div>
            <div className={styles.heart}>
              <Heart
                id={firstVideoId}
                isLiked={videoDetailData.isLiked}
                likeCount={videoDetailData.likeCount}
                type="video"
                onToggleLike={() => handleToggleLike(firstVideoId)}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <div className={styles.commentContainer}>
          <div className={styles.title}>
            <div>
              <p>댓글</p>
              <span className={styles.cnt}>00</span>
            </div>
            <div className={styles.moreComment} onClick={handleToggleComments}>
              {isComments ? (
                <>
                  <span>댓글 닫기</span>
                  <img src={upBtn} alt=""></img>
                </>
              ) : (
                <>
                  <span>댓글 더보기</span>
                  <img src={dropDown} alt=""></img>
                </>
              )}
            </div>
          </div>

          <div
            className={`${styles.commentList} ${isComments ? styles.show : ''}`}
          >
            <Comment isShow={isComments}></Comment>
          </div>
        </div>

        <PopularVideoList videos={popularVideoData}></PopularVideoList>

        <div className={styles.paging}>
          <img src={leftArrow} alt=""></img>
          <div className={styles.pageNum}>1</div>
          <img src={rightArrow} alt=""></img>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;
