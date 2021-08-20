import create from "zustand";

export type UserType = {
  id: Number;
  name: string;
  phone_number: Number;
};

export type ShopType = {
  id: Number;
  name: string;
  image: string;
  postcode: string;
  estimateTime: number;
  pendingCupOfCoffee: Number;
};

type CartType = {
  estimateTime?: Number;
  userId?: Number;
  shop_id?: Number;
  coffee_orders?: CoffeeTypeInCart[];
};

export type CoffeeTypeInCart = {
  quantity: number;
  coffeeId: number;
  specialRequest: SpecialRequestTypeInCart[];
};

type SpecialRequestTypeInCart = {
  specialRequestId?: Number;
};

export type CoffeeType = {
  id: Number;
  name: string;
  size: Number;
  price: Number;
  description: string;
  ice: boolean;
  image: string;
};

export type CoffeeOrderType = {
  id: Number;
  quantity: Number;
  transaction_id: Number;
  coffee_id: Number;
  coffee?: CoffeeType;
};

export type TransactionHistory = {
  estimated_pickup_time: string;
  id: Number;
  shop_id: Number;
  status: String;
  transaction_time: String;
  user_id: Number;
  coffeeOrder?: CoffeeOrderType[];
};

type SpecialRequest = {
  id: Number;
  request: string;
  price: Number;
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
  setNewUser: (name: undefined | string, phone: string | null) => void;
  shops: ShopType[];
  fetchShops: () => void;
  cart: CartType | null;
  addShopIdToCart: (id: Number) => void;
  setCart: (arg1: CartType) => void;
  completeTransaction: () => void;
  coffeeList: CoffeeType[] | [];
  fetchCoffeeList: () => void;
  selectedCoffee: CoffeeType[] | null;
  setSelectedCoffee: (name: string) => void;
  specialRequest: SpecialRequest[] | null;
  fetchSpecialRequests: () => void;
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

    if (data) set({ loginUser: data });
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

    if (createdUser.Error) set({ loginError: "failToCreate" });
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
  addShopIdToCart: id => {
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
}));

export default useStore;
