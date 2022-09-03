import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import type { Video } from '../types';
import VideoCard from '../components/video-card';
import NoResults from '../components/no-results';
import { BASE_URL } from '@utils/index';

interface HomeProps {
  videos: Video[];
}

const Home: NextPage<HomeProps> = ({ videos }) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map(video => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResults text='No videos found' variant='post' />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
