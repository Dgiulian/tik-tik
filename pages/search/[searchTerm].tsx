import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import VideoCard from 'components/video-card';
import NoResults from 'components/no-results';
import { Post, User as UserType, Video as VideoType } from 'types/shared';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { BASE_URL } from '@utils/index';
import VideoList from 'components/video-list';
import useAuthStore from 'store/auth';

const Search = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [tab, setTab] = useState<'VIDEOS' | 'ACCOUNTS'>('VIDEOS');
  const { allUsers } = useAuthStore();
  const router = useRouter();
  const selectedClass = 'border-b2 border-black';
  const unselectedClass = 'text-gray-400';
  const { searchTerm }: ParamsProps = router.query as ParamsProps;
  // if (Array.isArray(searchTerm) || typeof searchTerm === 'undefined') {
  //   return <p>Oh oh, all that could failed, has failed. </p>;
  // }
  const searchedAccounts =
    allUsers?.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? [];
  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${
            tab === 'ACCOUNTS' ? selectedClass : unselectedClass
          }`}
          onClick={() => setTab('ACCOUNTS')}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${
            tab === 'VIDEOS' ? selectedClass : unselectedClass
          }`}
          onClick={() => setTab('VIDEOS')}
        >
          Videos
        </p>
      </div>

      {/* <div className='flex flex-wrap md:justify-start'> */}
      {tab === 'ACCOUNTS' ? (
        <div className='md:mt-16'>
          {searchedAccounts?.length > 0 ? (
            searchedAccounts.map(user => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='rounded-full'
                      alt='user-profile'
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                        {user.userName} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {post?.length ? (
            <VideoList videos={post} />
          ) : (
            <NoResults text={`No results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
    // </div>
  );
};

interface ParamsProps extends ParsedUrlQuery {
  searchTerm: string;
}

export const getServerSideProps: GetServerSideProps<
  { post: Post[] | null },
  ParamsProps
> = async ({ params }) => {
  const { searchTerm: searchTerm } = params ?? {};

  if (!searchTerm) {
    return { props: { post: null } };
  }
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { post: data },
  };
};
export default Search;
