import create from "zustand";

type StoreType = {
  loginRole: null | "user" | "shop";
  selectRole: (role: "user" | "shop") => void;
};
const useStore = create<StoreType>((set, get) => ({
  loginRole: null,
  selectRole: (role) => {
    if (get().loginRole === role) set({ loginRole: null });
    else set({ loginRole: role });
  },
}));

export default useStore;
