// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@utils/client';
import { allUsersQuery } from '@utils/queries';
import { User } from 'types/shared';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>,
) {
  if (req.method === 'GET') {
    const query = allUsersQuery();
    const data = await client.fetch<User[]>(query);
    if (data) {
      res.status(200).json(data);
    }
    res.status(200).json([]);
  }
}
