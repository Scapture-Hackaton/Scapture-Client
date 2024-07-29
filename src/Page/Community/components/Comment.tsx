import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/community.module.scss';

// import testCircle from '../image/testCircle.png';
// import fullHeart from '../image/fullHeart.png';
// import emptyHeart from '../image/emptyHeart.png';
import sendImg from '../image/sendImg.png';
import upBtn from '../image/upBtn.png';

// import { CommonResponse } from '../../../apis/dto/common.response';
import { CommentData } from '../../../apis/dto/comments.dto';
import Heart from './Heart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getComments, writeComment } from '../../../apis/api/community.api';

interface CommentProps {
  isShow: boolean;
}

// const Comment: React.FC<CommentProps> = ({ data }) => {
const Comment: React.FC<CommentProps> = ({ isShow }) => {
  //   console.log(data);

  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjM0ODk4NTUxIiwicHJvdmlkZXIiOiJrYWthbyIsInByb3ZpZGVySWQiOiIzNjM0ODk4NTUxIiwiaWF0IjoxNzIyMjUwNDY3LCJleHAiOjE3MjIzMzY4Njd9.tQi9KozWFLsGalCAkaXiT_cIA4ur0dB1xgY17KFoYec',
  );

  const videoId = 1;
  const queryClient = useQueryClient();
  const { data: commentsData, refetch } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getComments(videoId),
    initialData: [] as CommentData[], // 초기 데이터를 빈 배열로 설정
  });

  const [isData, setData] = useState<CommentData[]>(commentsData.data);
  //   const commentsToShow = showAll ? data : data.slice(0, 1);

  const [isInput, setInput] = useState('');

  const [isShowScrollButton, setShowScrollButton] = useState(false);
  const commentBoxRef = useRef<HTMLDivElement>(null);

  const addCommentMutation = useMutation({
    mutationFn: (newComment: { videoId: number; content: string }) =>
      writeComment(newComment.videoId, newComment.content),
    onSuccess: () => {
      // 댓글 작성 후 댓글 목록을 다시 가져옵니다.
      queryClient.invalidateQueries(['comments', videoId]);
      setInput('');
    },
  });

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const sendComment = () => {
    if (isInput.trim().length > 0) {
      addCommentMutation.mutate({ videoId, content: isInput });
    }
  };

  //   const sendComment = () => {
  //     if (isInput != null || isInput != '') {
  //       if (isInput.length != 0) {
  //         setData([
  //           ...isData,
  //           {
  //             id: isData[isData.length - 1].id + 1,
  //             name: '이현승',
  //             image:
  //               'http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640',
  //             content: isInput,
  //             isLiked: false,
  //             likeCount: 9,
  //           },
  //         ]);
  //         setInput('');
  //       }
  //     }
  //   };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendComment();
      if (commentBoxRef.current) {
        commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (commentBoxRef.current) {
      commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
    }
  }, [isData]);

  const handleScroll = () => {
    if (commentBoxRef.current) {
      const scrollTop = commentBoxRef.current.scrollTop;
      if (scrollTop > 100) {
        // 스크롤 위치가 100px 이상일 때 버튼 표시
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  };

  const scrollToTop = () => {
    if (commentBoxRef.current) {
      commentBoxRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const currentRef = commentBoxRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!isShow && commentBoxRef.current) {
      scrollToTop();
    }
  }, [isShow]);

  return (
    <>
      <div ref={commentBoxRef} className={`${styles.commentBox} test`}>
        {(commentsData.data ?? []).map((comment: CommentData) => (
          <div key={comment.commentId} className={styles.commentGroup}>
            <div className={styles.profileImg}>
              <img src={comment.image} alt="" />
            </div>
            <div className={styles.comment}>
              <p>{comment.name}</p>
              <div>{comment.content}</div>
            </div>
            <div className={styles.heartGroup}>
              <Heart isLiked={comment.isLiked} likeCount={comment.likeCount} />
            </div>
          </div>
        ))}
      </div>
      {isShowScrollButton && (
        <button className={styles.scrollToTopButton} onClick={scrollToTop}>
          <img src={upBtn} alt="" />
        </button>
      )}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="댓글 입력하기"
          onChange={changeInput}
          value={isInput}
          onKeyPress={handleKeyPress}
        />
        <img src={sendImg} alt="" onClick={sendComment} />
      </div>
    </>
  );
};

export default Comment;
