import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";

import useStore from "../store";

const ShopCardDiv = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 100px 1fr;
  background-color: ${APP_COLOR.paleWheat};

  padding: 1rem;
  border-radius: 10px;
`;

const ShopCardUl = styled.ul`
  display: grid;
  gap: 10px;
  grid-auto-columns: 1fr;

  padding: 0.5rem;
`;

export default function ShopCards() {
  const fetchShops = useStore(store => store.fetchShops);

  const shops = useStore(store => store.shops);

  const cart = useStore(store => store.cart);

  const addShopIdToCart = useStore(store => store.addShopIdToCart);

  const history = useHistory();

  if (cart.shop_id) {
    history.push("/coffee");
  }

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  return (
    <ShopCardUl>
      {shops.map(shop => (
        <ShopCardDiv className="shop" onClick={() => addShopIdToCart(shop.id)}>
          <div className="shop-image">
            <img
              src={shop.image}
              alt={shop.name}
              width="100px"
              height="100px"
            />
          </div>
          <div className="shop-data">
            <h3>{shop.name}</h3>
            <p>Postcode: {shop.postcode}</p>
            <p>Waiting time: {shop.estimateTime} min(s)</p>
          </div>
        </ShopCardDiv>
      ))}
    </ShopCardUl>
  );
}
