import { create } from "zustand";

interface StoreState {
  infoUser: any;
}

interface StoreActions extends StoreState {
  setInfoUser: (infoUser: any) => void;
}

const infoRTUser = create<StoreActions>((set) => ({
  infoUser: {
    email: "",
    phone: "",
    fullName: "",
  },

  setInfoUser: (info) => set(() => ({ infoUser: info })),
}));

export default infoRTUser;
