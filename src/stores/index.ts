import { create } from "zustand";

type Store = {
  customerName: string;
  setCustomerName: () => void;
};

export const useStore = create<Store>()((set) => ({
  customerName: "",
  setCustomerName: () => set((state) => ({ customerName: state.customerName })),
}));
