interface RepliesType {
  id: number;
  content: string;
  createAt: string | Date;
  updateAt: string | Date;
  userInfo: UserInfo;
  articleId: number;
  commentId: number;
  replyInfo: ReplyInfo | null;
  replyUserInfo: UserInfo | null;
  rootCommentId: number;
}

interface ReplyInfo {
  articleId: number;
  commentId: number;
  content: string;
  createAt: string | Date;
  id: number;
  replyUserId: number;
  rootCommentId: number;
  updateAt: string | Date;
  userId: number;
}

type Replies = { list: RepliesType[] };

interface CommentType {
  id: number;
  userId: number;
  content: string;
  articleId: number;
  commentId: number | null;
  replyUserId: number | null;
  rootCommentId: number | null;
  userInfo: UserInfo;
  createAt: string | Date;
  updateAt: string | Date;
  replies: Replies;
}

export type { CommentType, RepliesType };
