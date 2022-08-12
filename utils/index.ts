import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { UserStoreType, UserType } from '../store/auth';

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3001';

type DecodedToken = {
  name: string;
  picture: string;
  sub: string;
};

export const createOrGetUser = async (
  response: any,
  addUser: (user: UserType) => void,
) => {
  const decoded: DecodedToken = jwtDecode(response.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
