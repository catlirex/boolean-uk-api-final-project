import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";

import useStore, { ShopType } from "../../store";

const ShopCardDiv = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 100px 1fr;
  background-color: ${APP_COLOR.paleWheat};
  height: 130px;
  padding: 1rem;
  border-radius: 10px;
  .title {
    font-size: 0.8rem;
    font-weight: 700;
    padding-top: 5px;
  }
`;

const ShopCardUl = styled.ul`
  display: grid;
  gap: 10px;
  grid-auto-rows: max-content;
  padding: 0.5rem;

  overflow-y: scroll;
  overflow-style: none;
  scroll-behavior: smooth;

  .container:hover {
    box-shadow: 0px 0px 10px 1px ${APP_COLOR.white};
  }
`;

export default function ShopCards() {
  const fetchShops = useStore(store => store.fetchShops);
  const shops = useStore(store => store.shops);
  const addShopIdToCart = useStore(store => store.addShopIdToCart);
  const history = useHistory();

  function handleClick(shop: ShopType) {
    addShopIdToCart(shop.id);
    history.push("/user/coffeeList");
  }

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  return (
    <ShopCardUl>
      {shops.map((shop, index) => (
        <ShopCardDiv
          key={index}
          className="shop container"
          onClick={() => handleClick(shop)}
        >
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
            <p className="title">Postcode:</p>
            <p> {shop.postcode}</p>
            <p className="title">Waiting time: </p>
            <p>{shop.estimateTime} min(s)</p>
          </div>
        </ShopCardDiv>
      ))}
    </ShopCardUl>
  );
}
