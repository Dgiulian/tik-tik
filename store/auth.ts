import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

import { BASE_URL } from '../utils';

export type UserType = {
  _id: string;
  userName: string;
  image: string;
};

export type UserStoreType = {
  userProfile: UserType | null;
  addUser: (user: any) => void;
  removeUser: () => void;
  fetchAllUsers: () => Promise<unknown>;
};

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data });
  },
});

const useAuthStore = create(
  persist<UserStoreType>(authStore, {
    name: 'auth',
  }),
);

export default useAuthStore;
