// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@utils/client';
import { allPostsQuery } from '@utils/queries';
import { Post } from 'types/shared';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>,
) {
  if (req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch<Post[]>(query);
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const document = req.body;
    client.create(document).then(() => res.status(201).json(document));
  }
}
