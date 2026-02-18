import { create } from 'zustand';


type Logged = {
  isLogged: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

const isLoggedIn = create<Logged>((set) => ({
  isLogged: false, // initial state
  setTrue: () => set({ isLogged: true }),
  setFalse: () => set({ isLogged: false }),
}));

export default isLoggedIn