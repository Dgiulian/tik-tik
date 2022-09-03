import { BASE_URL } from '@utils/index';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import NoResults from '../components/no-results';
import VideoCard from '../components/video-card';
import type { Post } from 'types/shared';

interface HomeProps {
  videos: Post[];
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

interface ParamsProps extends ParsedUrlQuery {
  topic?: string;
}
export const getServerSideProps: GetServerSideProps<
  { videos: Post[] | null },
  ParamsProps
> = async ({ query }) => {
  const { topic } = query ?? {};
  let URL = topic ? `discover/${topic}` : 'post';
  const { data } = await axios.get<Post[]>(`${BASE_URL}/api/${URL}`);
  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
