// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@utils/client';
import { postDetailQuery } from '@utils/queries';
import { Post } from 'types/shared';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | null>,
) {
  if (req.method === 'GET') {
    const { id } = req.query as { id: string };
    const query = postDetailQuery(id);
    const data = await client.fetch<Post[]>(query);
    res.status(200).json(data[0] ?? null);
  } else if (req.method === 'POST') {
    const document = req.body;
    // client.create(document).then(() => res.status(201).json(document));
  }
}
