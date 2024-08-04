export interface CommentData {
  commentId: number;
  name: string;
  image: string;
  content: string;
  isLiked: boolean;
  likeCount: number;
}

export interface PopularVideos {
  videoId: number;
  name: string;
  image: string;
  stadiumName: string;
  views: number;
  date: string;
  likeCount: number;
}
