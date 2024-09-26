import { typeInforUser, typePackage, typeResponsePackage } from "@/types";
import { create } from "zustand";

interface Room {
  roomId: string;
  [key: string]: any;
}

interface StoreState {
  chatOpen: boolean;
  confirmInforRegister: boolean;
  chats: { [key: string]: any };
  friendInfo: { [key: string]: any };
  inforUser: typeInforUser;
  inforPackage: typeResponsePackage;
  listRooms: Room[];
}

interface StoreActions extends StoreState {
  setChatOpen: () => void;
  setConfirmInforRegister: (value: boolean) => void;
  setChats: (newChats: { [key: string]: any }) => void;
  setFriendInfo: (newFriend: { [key: string]: any }) => void;
  addRoomIntoList: (newRoom: Room) => void;
  updateRoomInList: (updatedRoom: Room) => void;
  setInforUser: (inforUser: typeInforUser) => void;
  setInforPackage: (newPackage: typeResponsePackage) => void;
  removeRoomFromList: (roomId: string) => void;
}

const mainStore = create<StoreActions>((set) => ({
  chats: {},
  chatOpen: false,
  confirmInforRegister: false,
  friendInfo: {},
  inforUser: {
    email: "",
    phone: "",
  },
  inforPackage: {
    packages: {
      _id: "",
      name: "",
      price: "",
      duration: "",
    },
  },
  listRooms: [],

  setFriendInfo: (newFriend) => set({ friendInfo: { ...newFriend } }),

  setChatOpen: () => set((state) => ({ chatOpen: !state.chatOpen })),
  setConfirmInforRegister: (value) =>
    set(() => ({ confirmInforRegister: value })),

  setChats: (newChats) =>
    set((state) => ({ chats: { ...state.chats, ...newChats } })),

  setInforUser: (infor) => set(() => ({ inforUser: infor })),
  setInforPackage: (newPackage) => set(() => ({ inforPackage: newPackage })),
  addRoomIntoList: (newRoom) =>
    set((state) => {
      // Kiểm tra nếu phòng đã tồn tại trong danh sách
      if (state.listRooms.some((room) => room.roomId === newRoom.roomId)) {
        return state; // Không thay đổi nếu phòng đã tồn tại
      }
      return { listRooms: [...state.listRooms, newRoom] };
    }),

  updateRoomInList: (updatedRoom) =>
    set((state) => ({
      listRooms: state.listRooms.map((room) =>
        room.roomId === updatedRoom.roomId ? updatedRoom : room
      ),
    })),

  removeRoomFromList: (roomId) =>
    set((state) => ({
      listRooms: state.listRooms.filter((room) => room.roomId !== roomId),
    })),
}));

export default mainStore;
