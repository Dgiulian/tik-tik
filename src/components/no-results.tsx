import React from 'react';
import { BiCommentX } from 'react-icons/bi';
import { MdOutlineVideocamOff } from 'react-icons/md';

type Props = {
  text: string;
  variant?: 'comment' | 'post';
};

const NoResults = ({ text, variant = 'post' }: Props) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {variant === 'comment' ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  );
};

export default NoResults;
