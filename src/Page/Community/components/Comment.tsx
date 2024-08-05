import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/community.module.scss';
import modal from '../../Header/scss/login-modal.module.scss';

// import testCircle from '../image/testCircle.png';
// import fullHeart from '../image/fullHeart.png';
// import emptyHeart from '../image/emptyHeart.png';
import sendImg from '../image/sendImg.png';
import dropDown from '../image/dropDown.png';
import upBtn from '../image/upBtn.png';

// import { CommonResponse } from '../../../apis/dto/common.response';
import { CommentData } from '../../../apis/dto/community.dto';
import Heart from './Heart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getComments, writeComment } from '../../../apis/api/community.api';

import {
  KAKAO_AUTH_URL,
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../../apis/config/login.config';
import { LoginModal } from '../../Header/components/LoginModal';

interface CommentProps {
  videoId: number;
}

const Comment: React.FC<CommentProps> = ({ videoId }) => {
  //DOM
  const modalRef = useRef<HTMLDialogElement>(null);

  //Object
  const AUTH_URLS = {
    kakao: KAKAO_AUTH_URL,
    google: GOOGLE_AUTH_URL,
    naver: NAVER_AUTH_URL,
  };

  const [isComments, setComments] = useState(false);

  const [isCommentCnt, setCommentCnt] = useState('00');
  const changeCommentCnt = (cnt: number) => {
    setCommentCnt(cnt.toString().padStart(2, '0'));
  };

  // 첫 화면에서 댓글을 가져옴
  const queryClient = useQueryClient();
  const { data: commentsData } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getComments(videoId),
    initialData: [] as CommentData[], // 초기 데이터를 빈 배열로 설정
  });

  // 댓글 창의 입력 감지
  const [isInput, setInput] = useState('');
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 맨위로 올라가는 버튼의 상태
  const [isShowScrollButton, setShowScrollButton] = useState(false);
  // commentBox의 Ref
  const commentBoxRef = useRef<HTMLDivElement>(null);

  // 댓글이 추가되면 감지하여 요청을 다시 보내 데이터 최신화
  const addCommentMutation = useMutation({
    mutationFn: async (newComment: { videoId: number; content: string }) => {
      const res = await writeComment(newComment.videoId, newComment.content);
      if (res.status == 400 || res.status == 403) {
        modalRef.current?.showModal();
      }
    },

    onSuccess: () => {
      // 댓글 작성 후 댓글 목록을 다시 가져옴
      queryClient.invalidateQueries({ queryKey: ['comments', videoId] });
      setInput('');
    },
  });

  // 댓글 작성을 하면 요청을 다시 보냄
  const sendComment = () => {
    // 공백인 댓글은 요청을 보내지 않음
    if (isInput.trim().length > 0) {
      addCommentMutation.mutate({ videoId, content: isInput });
    }
  };

  // 엔터를 눌렀을 경우에도 댓글 작성이 가능하도록
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendComment();
    }
  };

  // 일정 위치로 스크롤을 내렸을 경우 맨위로 이동하는 버튼 생성
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

  // 스크롤의 변화를 감지하여 맨 위로 올라가는 버튼 생성
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

  // 맨위로 이동
  const scrollToTop = () => {
    if (commentBoxRef.current) {
      commentBoxRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // 댓글 닫기를 눌렀을 경우 댓글의 맨위로 이동
  useEffect(() => {
    if (!isComments && commentBoxRef.current) {
      scrollToTop();
    }
  }, [isComments]);

  // 좋아요를 눌렀을 때 갱신
  const handleToggleLike = (commentId: number, isLiked: boolean) => {
    const updatedComments = commentsData.data.map((comment: CommentData) =>
      comment.commentId === commentId
        ? {
            ...comment,
            isLiked,
            likeCount: isLiked ? comment.likeCount + 1 : comment.likeCount - 1,
          }
        : comment,
    );
    queryClient.setQueryData(['comments', videoId], { data: updatedComments });
  };

  // 댓글이 업데이트되었을 때 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (commentsData.data != null) {
      changeCommentCnt(commentsData.data.length);
    }

    if (commentBoxRef.current) {
      commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
    }
  }, [commentsData.data]);

  const handleToggleComments = () => {
    setComments(!isComments);
  };

  // video가 변경되면 댓글 더보기로 변경
  useEffect(() => {
    setComments(false);

    if (commentsData && commentsData.data && commentsData.data != null) {
      setCommentCnt(commentsData.data.length.toString().padStart(2, '0'));
    } else {
      setCommentCnt('00');
    }
  }, [videoId]);

  return (
    <>
      <div className={styles.title}>
        <div>
          <p>댓글</p>
          <span className={styles.cnt}>{isCommentCnt}</span>
        </div>
        <div className={styles.moreComment} onClick={handleToggleComments}>
          {isComments ? (
            <>
              <span>댓글 닫기</span>
              <img src={upBtn} alt="" />
            </>
          ) : (
            <>
              <span>댓글 더보기</span>
              <img src={dropDown} alt="" />
            </>
          )}
        </div>
      </div>

      <div className={`${styles.commentList} ${isComments ? styles.show : ''}`}>
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
                <Heart
                  id={comment.commentId}
                  isLiked={comment.isLiked}
                  likeCount={comment.likeCount}
                  type="comment"
                  onToggleLike={handleToggleLike}
                />
              </div>
            </div>
          ))}
        </div>
        {isShowScrollButton && (
          <button className={styles.scrollToTopButton} onClick={scrollToTop}>
            <img src={upBtn} alt="" />
          </button>
        )}
        <div
          className={`${styles.inputGroup} ${isComments == false && isCommentCnt == '00' ? styles.hidden : ''}`}
        >
          <input
            type="text"
            placeholder="댓글 입력하기"
            onChange={changeInput}
            value={isInput}
            onKeyPress={handleKeyPress}
          />
          <img src={sendImg} alt="" onClick={sendComment} />
        </div>
      </div>
      <LoginModal
        styles={modal}
        AUTH_URLS={AUTH_URLS}
        modalRef={modalRef}
      ></LoginModal>
    </>
  );
};

export default Comment;
