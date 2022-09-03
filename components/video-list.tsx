import React from 'react';
import { Post as PostType } from 'types/shared';
import NoResults from './no-results';
import VideoCard from './video-card';

type Props = {
  videos: PostType[];
};

const VideoList = ({ videos }: Props) => {
  return (
    <>
      {videos.length > 0 ? (
        videos.map((post: PostType, idx: number) => (
          <VideoCard key={idx} post={post} />
        ))
      ) : (
        <NoResults text={`No Videos Yet`} />
      )}
    </>
  );
};

export default VideoList;
