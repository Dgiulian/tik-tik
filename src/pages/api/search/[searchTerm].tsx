// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@utils/client';
import { searchPostsQuery } from '@utils/queries';
import { Post } from 'types/shared';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>,
) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query as { searchTerm: string | string[] };
    const query = searchPostsQuery(searchTerm);
    const data = await client.fetch<Post[]>(query);
    res.status(200).json(data);
  }
}
