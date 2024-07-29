import Header from '../../Header/components/Header';
import Footer from '../../Footer/components/Footer';
// import leftFrame from '../image/leftFrame.png';
// import rightFrame from '../image/rightFrame.png';
// import emptyHeart from '../image/emptyHeart.png';
// import fullHeart from '../image/fullHeart.png';
import dropDown from '../image/dropDown.png';
import upBtn from '../image/upBtn.png';
import testCircle from '../image/testCircle.png';

import rightArrow from '../image/rightArrow.png';
import leftArrow from '../image/leftArrow.png';

import styles from '../scss/community.module.scss';
import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// import { getComments } from '../../../apis/api/community.api';
import Comment from './Comment';
import Heart from './Heart';
// import { CommonResponse } from '../../../apis/dto/common.response';

const Community = () => {
  const [isComments, setComments] = useState(false);
  // const data: CommonResponse = useQuery(['comment', 2], () => getComments(2));
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['comment', 1],
  //   queryFn: () => getComments(1),
  // });

  // if (isPending) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error.message;

  // getPopularVideos

  // console.log(data);

  const handleToggleComments = () => {
    setComments(!isComments);
  };

  return (
    <div className={styles.test}>
      <Header />
      <div className={styles.community}>
        {/* <div className={styles.popularText}>
          <img src={leftFrame} alt=""></img>
          <span>이번주 인기있는 영상</span>
          <img src={rightFrame} alt=""></img>
        </div> */}

        <div className={styles.videoContainer}>
          <div className={styles.video}></div>
          <div className={styles.title}>영상 제목</div>
        </div>
        <div className={styles.fieldText}>구장명</div>
        <div className={styles.heart}>
          {/* <img src={fullHeart} alt="" />
          <div className={styles.cnt}>10</div> */}
          <Heart isLiked={true} likeCount={10}></Heart>
        </div>
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

          {/* <Comment data={data.data}></Comment> */}
          <div
            className={`${styles.commentList} ${isComments ? styles.show : ''}`}
          >
            <Comment isShow={isComments}></Comment>
          </div>
          {/* <div className={styles.commentGroup}>
            <div className={styles.profileImg}>
              <img src={testCircle} alt=""></img>
            </div>
            <div className={styles.comment}>
              <p>닉네임</p>
              <div>댓글 내용이 너무 길어서 안 보이는 경우 ..</div>
            </div>
            <div className={styles.heartGroup}>
              <img src={fullHeart} alt="" />
              <div className={styles.cnt}>10</div>
            </div>
          </div> */}
          {/* <div className={styles.commentGroup}>
            <div className={styles.profileImg}>
              <img src={testCircle} alt=""></img>
            </div>
            <div className={styles.comment}>
              <p>닉네임</p>
              <div>댓글 내용이 너무 길어서 안 보이는 경우 ..</div>
            </div>
            <div className={styles.heartGroup}>
              <img src={emptyHeart} alt="" />
              <div className={styles.cnt}>10</div>
            </div>
          </div> */}
        </div>

        <div className={styles.subVideoContainer}>
          <div className={styles.video}></div>
          <div className={styles.group}>
            <div className={styles.title}>영상 제목</div>
            <div className={styles.info}>
              <div className={styles.cnt}>조회수 00회</div>
              <p>2024.07.23</p>
            </div>

            <div className={styles.field}>
              <div className={styles.profileImg}>
                <img src={testCircle} alt=""></img>
              </div>
              <div className={styles.name}>구장명</div>
            </div>
          </div>
        </div>

        {/* <div className={styles.subVideoContainer}>
          <div className={styles.video}></div>
          <div className={styles.group}>
            <div className={styles.title}>영상 제목</div>
            <div className={styles.info}>
              <div className={styles.cnt}>조회수 00회</div>
              <p>2024.07.23</p>
            </div>

            <div className={styles.field}>
              <div className={styles.profileImg}>
                <img src={testCircle} alt=""></img>
              </div>
              <div className={styles.name}>구장명</div>
            </div>
          </div>
        </div> */}

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
