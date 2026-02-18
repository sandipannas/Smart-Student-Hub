import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  
  name: string;
  email: string;
  profilePic: string;
  // add more fields as needed
};



type UserStore = {
  user: User | null;
  setUser: (user: Partial<User>) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
     setUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : (user as User),
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // localStorage key
    }
  )
);

export default useUserStore;
