// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@utils/client';
import { postDetailQuery } from '@utils/queries';
import { Post } from 'types/shared';
import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | null | unknown>,
) {
  if (req.method === 'GET') {
    const { id } = req.query as { id: string };
    const query = postDetailQuery(id);
    const data = await client.fetch<Post[]>(query);
    res.status(200).json(data[0] ?? null);
  } else if (req.method === 'PUT') {
    const { comment, userId } = req.body;

    const { id }: any = req.query;

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid(),
          postedBy: { _type: 'postedBy', _ref: userId },
        },
      ])
      .commit();

    res.status(200).json(data as unknown);
  }
}
