export type Comment = {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
};
export type Like = unknown;
export type User = {
  _id: string;
  _type: string;
  userName: string;
  image: string;
};
export type Video = {
  asset: {
    _id: string;
    url: string;
  };
};
export type Post = {
  _id: string;
  caption: string;
  comments: Comment[] | null;
  likes: Like | null;
  postedBy: User;
  userId: string;
  video: Video | null;
};
