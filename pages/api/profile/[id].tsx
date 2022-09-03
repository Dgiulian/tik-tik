// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@utils/client';
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from '@utils/queries';
import { User } from 'types/shared';
import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    user: User | null;
    userVideos: any;
    likedVideos: any;
  }>,
) {
  if (req.method === 'GET') {
    const { id } = req.query as { id: string };
    const query = singleUserQuery(id);
    const userVideosQuery = userCreatedPostsQuery(id);
    const userLikedVideosQuery = userLikedPostsQuery(id);
    const user = await client.fetch<User[]>(query);
    const userVideos = await client.fetch(userVideosQuery);
    const likedVideos = await client.fetch(userLikedVideosQuery);
    res.status(200).json({ user: user[0] ?? null, userVideos, likedVideos });
  }
}
