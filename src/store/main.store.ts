import { create } from "zustand";

const mainStore = create((set, get) => ({
  chatOpen: false,
  setChatOpen: () => set({ chatOpen: !get().chatOpen }),
}));

export default mainStore;
