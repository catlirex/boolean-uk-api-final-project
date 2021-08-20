import React, { useEffect } from "react";
import { useState } from "react";
import useStore from "../../store";
import OrderCard from "./OrderCard";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import { useHistory } from "react-router-dom";

const ShopPageUl = styled.ul`
  padding: 10px 5px;
  height: 100%;
  overflow-y: scroll;
  overflow-style: none;
  display: grid;
  gap: 10px;
  scroll-behavior: smooth;
  margin-bottom: 200px;
  background-color: ${APP_COLOR.black};
  h2 {
    color: ${APP_COLOR.wheat};
  }
`;

export default function ShopHomeBody() {
  const loginError = useStore(state => state.loginError);
  const loginShopTodayTransaction = useStore(
    state => state.loginShopTodayTransaction
  );
  const orderFilter = useStore(state => state.orderFilter);
  const [toRenderOrder, setToRenderOrder] = useState(loginShopTodayTransaction);
  const history = useHistory();
  console.log(orderFilter);

  useEffect(() => {
    if (loginError === null && !loginShopTodayTransaction) history.push("/");
    if (!loginShopTodayTransaction) return;

    if (orderFilter === "pending") {
      const filteredOrder = loginShopTodayTransaction?.filter(
        target => target.status === orderFilter
      );
      setToRenderOrder(filteredOrder);
    } else if (orderFilter === "urgent") {
      const filteredOrder = loginShopTodayTransaction?.filter(
        target => new Date(target.estimated_pickup_time).getTime() < Date.now()
      );
      setToRenderOrder(filteredOrder);
    } else {
      const completeOrders = loginShopTodayTransaction?.filter(
        target => target.status === "collected"
      );
      const allOtherOrders = loginShopTodayTransaction?.filter(
        target => target.status !== "collected"
      );
      const sortedArray = [...allOtherOrders, ...completeOrders];
      setToRenderOrder(sortedArray);
    }
  }, [loginShopTodayTransaction, loginError, orderFilter]);

  return (
    <ShopPageUl>
      {toRenderOrder?.length ? (
        toRenderOrder.map((order, index) => (
          <OrderCard order={order} key={index} />
        ))
      ) : loginShopTodayTransaction && orderFilter === "urgent" ? (
        <h2>No Urgent order</h2>
      ) : (
        <h2>Loading...</h2>
      )}
    </ShopPageUl>
  );
}
