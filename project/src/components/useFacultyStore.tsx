import { create } from "zustand";
import { persist } from "zustand/middleware";;

type User = {
  _id?: string;
  adminId?: string;
  user?: string;
  address?: string;
  class?: any[];
  createdAt?: string;
  updatedAt?: string;
  dateOfJoining?: Date;
  department?: string;
  designation?: string;
  emergency_contact_no?: string;
  experience?: string;
  ph_no?: string;
  qualification?: string;
  specialization?: string;
  __v?: number;
};

type UserStore = {
  
  userData: User | null;
  setUser: (user: User) => void;
  updateUser: (fields: Partial<User>) => void;
  clearUser: ()=> void
};

const useFacultyStore = create<UserStore>()(
  persist(
    (set,get) => ({
      
      userData: null,
      setUser: (user) => set({  userData: user }),
      updateUser: (fields: Partial<User>) =>
        set({
          userData: {
            ...get().userData,
            ...fields,
          },
        }),
      clearUser: () => set({ userData: null }),
    }),
    { name: "faculty-storage" } // stores in localStorage
  )
);

export default useFacultyStore;
