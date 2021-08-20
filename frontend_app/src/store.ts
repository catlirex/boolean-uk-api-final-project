import React from "react";
import create from "zustand";

export type UserType = {
  id: number;
  name: string;
  phone_number: number;
};

export type ShopType = {
  id: number;
  name: string;
  image: string;
  postcode: string;
  estimateTime: number;
  pendingCupOfCoffee: number;
};

type CartType = {
  estimateTime?: number;
  userId?: number;
  shop_id?: number;
  coffee_orders?: CoffeeOrderType[];
};

export type CoffeeType = {
  id: number;
  name: string;
  size: number;
  price: number;
  description: string;
  ice: boolean;
  image: string;
};

type specialRequestType = {
  id: number;
  request: string;
  price: number;
  type: string;
};

export type specialRequestsType = {
  id?: number;
  specialRequestId: number;
  coffeeOrderId?: number;
  specialRequest?: specialRequestType;
};

export type CoffeeOrderType = {
  id?: number;
  quantity: number;
  transaction_id?: number;
  coffee_id: number;
  coffee?: CoffeeType;
  specialRequests: specialRequestsType[];
};

export type TransactionHistory = {
  estimated_pickup_time: string;
  id: number;
  shop_id: number;
  status: string;
  transaction_time: string;
  user_id: number;
  coffeeOrder?: CoffeeOrderType[];
};

type SpecialRequest = {
  id: number;
  request: string;
  price: number;
  type: string;
};

type StoreType = {
  loginRole: null | "user" | "shop";
  selectRole: (role: "user" | "shop") => void;
  setLogInUser: (e: React.SyntheticEvent) => void;
  loginError: null | undefined | "failToCreate";
  loginUser: null | UserType;
  userTransactionHistory: TransactionHistory[];
  getUserTransactionHistory: () => void;
  deleteTransaction: (id: number) => void;
  setNewUser: (name: undefined | string, phone: string | null) => void;
  shops: ShopType[];
  fetchShops: () => void;
  cart: CartType | null;

  setCart: (arg1: CartType) => void;
  completeTransaction: () => void;

  coffeeList: CoffeeType[] | [];
  fetchCoffeeList: () => void;
  selectedCoffee: CoffeeType[] | null;
  setSelectedCoffee: (name: string) => void;

  loginShopTodayTransaction: null | TransactionHistory[];

  specialRequest: SpecialRequest[] | null;
  fetchSpecialRequests: () => void;

  setLoginShop: (e: React.SyntheticEvent) => void;
  updateStatus: (id: number, status: string) => void;
  orderFilter: string;
  setOrderFilter: (filter: string) => void;
};

const useStore = create<StoreType>((set, get) => ({
  loginRole: null,
  selectRole: role => {
    if (get().loginRole === role) set({ loginRole: null });
    else set({ loginRole: role });
  },
  loginError: null,
  loginUser: null,
  setLogInUser: async e => {
    const target = e.target as typeof e.target & {
      phone: { value: string };
    };
    const data = await fetch(
      `http://localhost:3000/users/${target.phone.value}`
    ).then(res => res.json());

    if (data.id) set({ loginUser: data });
    else set({ loginError: undefined });
  },
  setNewUser: async (name, phone) => {
    const submitNewUser = {
      name,
      phone_number: Number(phone),
    };
    console.log(submitNewUser);
    const createdUser = await fetch(`http://localhost:3000/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitNewUser),
    }).then(res => res.json());

    if (!createdUser.id) set({ loginError: "failToCreate" });
    else set({ loginUser: createdUser });
  },

  userTransactionHistory: [],
  getUserTransactionHistory: async () => {
    const userID = get().loginUser?.id;
    const allTransaction = await fetch(
      `http://localhost:3000/transactions/user/${userID}`
    ).then(res => res.json());
    set({ userTransactionHistory: allTransaction });
  },
  deleteTransaction: async id => {
    const deletedData = await fetch(
      `http://localhost:3000/transactions/${id}`,
      {
        method: "DELETE",
      }
    ).then(res => res.json());
    set({
      userTransactionHistory: get().userTransactionHistory.filter(
        target => target.id === deletedData.id
      ),
    });
  },

  shops: [],
  fetchShops: () => {
    fetch("http://localhost:3000/shops/")
      .then(res => res.json())
      .then(shopsList => {
        fetch("http://localhost:3000/shops/estimateTime")
          .then(res => res.json())
          .then(shopsEstimateTime => {
            const completeShopList = shopsList.map((shop: ShopType) => {
              for (const shopTime of shopsEstimateTime) {
                if (shopTime.postcode === shop.postcode)
                  return { ...shop, ...shopTime };
              }
            });
            set({ shops: completeShopList });
          });
      });
  },

  cart: null,
  addShopIdToCart: (id: number) => {
    set({ cart: { shop_id: id } });
  },
  setCart: newCart => {
    set({ cart: newCart });
  },

  completeTransaction: () => {
    fetch("http://localhost:3000/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().cart),
    }).then(res => res.json());
  },

  coffeeList: [],
  fetchCoffeeList: () => {
    fetch("http://localhost:3000/coffee")
      .then(res => res.json())
      .then(coffee => set({ coffeeList: coffee }));
  },

  selectedCoffee: null,

  setSelectedCoffee: coffeeName => {
    const fetchSelectedCoffee = () => {
      fetch(`http://localhost:3000/coffee/${coffeeName}`)
        .then(res => res.json())
        .then(coffee => set({ selectedCoffee: coffee }));
    };
    fetchSelectedCoffee();
  },

  specialRequest: [],
  fetchSpecialRequests: () => {
    fetch("http://localhost:3000/specialRequests")
      .then(res => res.json())
      .then(request => set({ specialRequest: request }));
  },

  loginShopTodayTransaction: null,
  setLoginShop: async (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      postcode: { value: string };
    };
    const data = await fetch(
      `http://localhost:3000/transactions/shop/${target.postcode.value}/today`
    ).then(res => res.json());

    if (data.length) set({ loginShopTodayTransaction: data });
    else set({ loginError: undefined });
  },
  updateStatus: async (id, status) => {
    const updatedTransaction = await fetch(
      `http://localhost:3000/transactions/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    ).then(res => res.json());
    let updatedArray = get().loginShopTodayTransaction?.map(target => {
      if (target.id === updatedTransaction.id)
        return { ...target, ...updatedTransaction };
      else return target;
    });
    if (updatedArray) set({ loginShopTodayTransaction: updatedArray });
  },
  orderFilter: "pending",
  setOrderFilter: filter => {
    set({ orderFilter: filter });
  },
}));

export default useStore;
