export type Comment = unknown;
export type Like = unknown;
export type User = {
  _id: string;
  image: string;
  userName: string;
};
export type Video = { asset: { [k: string]: any } };

export type Post = {
  _id: string;
  caption: string;
  comments: Comment | null;
  likes: Like | null;
  postedBy: User;
  userId: string;
  video: Video | null;
};