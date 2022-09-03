import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/auth';
import NoResults from './no-results';
import axios from 'axios';
import { BASE_URL } from '@utils/index';
import { Post, User as UserType } from 'types/shared';

type Props = {
  post: Post;
  onCommentSubmit: (comments: Post['comments']) => void;
};

const Comments = ({ post, onCommentSubmit }: Props) => {
  const { allUsers, userProfile }: any = useAuthStore();
  const [isPostingComment] = useState(false);
  const [comment, setComment] = useState('');

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userProfile && comment) {
      const response = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      console.log(response);
      setComment('');
      onCommentSubmit(response.data.comments);
    }
  };
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {post.comments?.length ? (
          post.comments?.map((item, idx: number) => (
            <>
              {allUsers?.map(
                (user: UserType) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=' p-2 items-center' key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className='-mt-5 ml-16 text-[16px] mr-8'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  ),
              )}
            </>
          ))
        ) : (
          <NoResults text='No comments yet.' variant='comment' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-0'>
          <form action='' onSubmit={addComment} className='flex gap-4'>
            <input
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Add comment'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button type='submit' disabled={isPostingComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
