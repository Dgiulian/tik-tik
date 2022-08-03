import React from 'react';

type Props = {
  text: string;
};

const NoResults = (props: Props) => {
  return <div>{props.text}</div>;
};

export default NoResults;
