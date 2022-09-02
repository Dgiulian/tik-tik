import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { Post as PostType } from 'types/shared';
import { BiFullscreen } from 'react-icons/bi';
import { GiWhiteBook } from 'react-icons/gi';
import { wrap } from 'module';
import { ImSortAmountDesc } from 'react-icons/im';
import { BASE_URL } from '@utils/index';
import useAuthStore from 'store/auth';
import LikeButton from 'components/like-button';
import Comments from 'components/comments';

const PostDetailPage = ({
  post: postDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [post, setPost] = useState(postDetail);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [videoRef, isMuted]);

  if (!post) {
    return <p>Post Not found </p>;
  }
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
    } else {
      videoRef?.current?.play();
    }
    setIsPlaying(playing => !playing);
  };
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
        <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              className='h-full cursor-pointer'
              loop
              onClick={onVideoClick}
              src={post.video?.asset.src}
            ></video>
          </div>
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!isPlaying && (
              <button>
                <BsFillPlayFill
                  className='text-white text-6xl lg:text-8xl'
                  onClick={onVideoClick}
                />
              </button>
            )}
          </div>
        </div>
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
          {isMuted ? (
            <button onClick={() => setIsMuted(false)}>
              <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsMuted(true)}>
              <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
              <Image
                width={60}
                height={60}
                alt='user-profile'
                className='rounded-full'
                src={post.postedBy.image}
              />
              <div>
                <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                  {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400 text-xl' />
                </div>
                <p className='text-md'> {post.postedBy.userName}</p>
              </div>
            </div>
          </Link>
          <div className='px-10'>
            <p className=' text-md text-gray-600'>{post.caption}</p>
          </div>
          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                flex='flex'
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            post={post}
            onCommentSubmit={(comments: PostType['comments']) =>
              setPost({ ...post, comments: comments })
            }
          />
        </div>
      </div>
    </div>
  );
};

interface ParamsProps extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  { post: PostType | null },
  ParamsProps
> = async ({ params }) => {
  const { id } = params ?? {};

  const URL = process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : 'http://localhost:3001';
  if (!id) {
    return { props: { post: null } };
  }
  const { data } = await axios.get(`${URL}/api/post/${id}`);
  console.log(data);
  return {
    props: { post: data },
  };
};
export default PostDetailPage;
