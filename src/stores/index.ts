import { ICustomer } from "@/interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  customerName: string;
  setCustomerName: () => void;
  customerToUpdate: ICustomer | null;
  setCustomerToUpdate: (customer: ICustomer | null) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      customerName: "",
      setCustomerName: () =>
        set((state) => ({ customerName: state.customerName })),
      customerToUpdate: null,
      setCustomerToUpdate: (customer) =>
        set(() => ({ customerToUpdate: customer })),
    }),
    {
      name: "customer-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
