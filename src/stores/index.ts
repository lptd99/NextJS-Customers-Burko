import { ICustomer } from "@/interfaces";
import { create } from "zustand";

type Store = {
  customerName: string;
  setCustomerName: () => void;
  customerToUpdate: ICustomer | null;
  setCustomerToUpdate: (customer: ICustomer | null) => void;
};

export const useStore = create<Store>()((set) => ({
  customerName: "",
  setCustomerName: () => set((state) => ({ customerName: state.customerName })),
  customerToUpdate: null,
  setCustomerToUpdate: (customer) =>
    set(() => ({ customerToUpdate: customer })),
}));
