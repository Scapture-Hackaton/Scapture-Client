import React, { useEffect, useRef, useState } from 'react';
import styles from '../scss/community.module.scss';

// import testCircle from '../image/testCircle.png';
// import fullHeart from '../image/fullHeart.png';
// import emptyHeart from '../image/emptyHeart.png';
import sendImg from '../image/sendImg.png';
import upBtn from '../image/upBtn.png';

// import { CommonResponse } from '../../../apis/dto/common.response';
import { CommentData } from '../../../apis/dto/community.dto';
import Heart from './Heart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getComments, writeComment } from '../../../apis/api/community.api';

interface CommentProps {
  isShow: boolean;
}

const Comment: React.FC<CommentProps> = ({ isShow }) => {
  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjM0ODk4NTUxIiwicHJvdmlkZXIiOiJrYWthbyIsInByb3ZpZGVySWQiOiIzNjM0ODk4NTUxIiwiaWF0IjoxNzIyMzI3MjQ2LCJleHAiOjE3MjI0MTM2NDZ9.O8h_RJzHl0yr3F4i6QOL_SYt1g-FDLTLcZc2i4e-VxU',
  );

  const videoId = 1;

  // 첫 화면에서 댓글을 가져옴
  const queryClient = useQueryClient();
  const { data: commentsData } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getComments(videoId),
    initialData: [] as CommentData[], // 초기 데이터를 빈 배열로 설정
  });

  const [isData, setData] = useState<CommentData[]>(commentsData.data);
  //   const commentsToShow = showAll ? data : data.slice(0, 1);

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
    mutationFn: (newComment: { videoId: number; content: string }) =>
      writeComment(newComment.videoId, newComment.content),
    onSuccess: () => {
      // 댓글 작성 후 댓글 목록을 다시 가져옴
      queryClient.invalidateQueries(['comments', videoId]);
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
      if (commentBoxRef.current) {
        commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
      }
    }
  };

  //   useEffect(() => {
  //     if (commentBoxRef.current) {
  //       commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
  //     }
  //   }, [isData]);

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

  // 스크롤의 변화를 감지
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
    if (!isShow && commentBoxRef.current) {
      scrollToTop();
    }
  }, [isShow]);

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
