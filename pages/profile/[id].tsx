import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import VideoCard from 'components/video-card';
import NoResults from 'components/no-results';
import { User as UserType, Video as VideoType } from 'types/shared';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { BASE_URL } from '@utils/index';
import VideoList from 'components/video-list';

const ProfilePage = ({
  user,
  userVideos,
  likedVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [tab, setTab] = useState<'VIDEOS' | 'LIKED'>('VIDEOS');

  if (!user) {
    return null;
  }
  const selectedClass = 'border-b2 border-black';
  const unselectedClass = 'text-gray-400';

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={62}
            height={62}
            className=' rounded-full'
            src={user.image}
            alt='user-profile'
            layout='responsive'
          />
        </div>
        <div className='flex flex-col justify-center'>
          <p className=' md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase'>
            {user.userName}
            <GoVerified className='text-blue-400 text-md' />
          </p>
          <p className='capitalize md:text-xl text-xs font-medium  text-gray-400'>
            {user.userName}
          </p>
        </div>
      </div>
      <div className='flex gap-10 m-10 border-b-2 border-gray-200 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${
            tab === 'VIDEOS' ? selectedClass : unselectedClass
          }`}
          onClick={() => setTab('VIDEOS')}
        >
          Videos
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${
            tab === 'LIKED' ? selectedClass : unselectedClass
          }`}
          onClick={() => setTab('LIKED')}
        >
          Liked
        </p>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          <VideoList videos={tab === 'VIDEOS' ? userVideos : likedVideos} />
        </div>
      </div>
    </div>
  );
};

interface ParamsProps extends ParsedUrlQuery {
  id: string;
}
export const getServerSideProps: GetServerSideProps<
  { user: UserType | null; likedVideos?: any; userVideos?: any },
  ParamsProps
> = async ({ params }) => {
  const { id } = params ?? {};

  if (!id) {
    return { props: { user: null } };
  }
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);
  console.log(data);
  return {
    props: { ...data },
  };
};

export default ProfilePage;
