import React, { useEffect } from "react";
import Header from "../Component/Header";

import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import useStore, { TransactionHistory, CoffeeOrderType } from "../store";
import CoffeeOrderCard from "../Component/CoffeeOrderCard";
import { APP_COLOR } from "../consistent";
import { Button, withStyles } from "@material-ui/core";
import CoffeeOrderPreviewCard from "../Component/CoffeeOrderPreviewCard";
import Footer from "../Component/Footer";

type Params = {
  id: string;
};

const WheatButton = withStyles(() => ({
  root: {
    float: "right",
    marginRight: "5px",
    height: "50px",
    fontSize: "0.8rem",
    width: "auto",
    color: APP_COLOR.darkGray,
    backgroundColor: APP_COLOR.paleWheat,
    "&:hover": {
      backgroundColor: APP_COLOR.lightBrown,
    },
  },
}))(Button);

const StyledPage = styled.div`
  margin-top: 50px;
  height: 84%;
  background-color: ${APP_COLOR.white};
`;

const StyledSection = styled.section`
  background-color: white;
  overflow-y: scroll;
  overflow-style: none;

  scroll-behavior: smooth;

  .status-box {
    height: 50px;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
    font-variant: petite-caps;
    background-color: ${APP_COLOR.wheat};
  }
  .status {
    font-size: 1.5rem;
  }
  .info-box {
    padding: 10px 5px;
    display: grid;
    grid-template-columns: 90px 1fr;
    height: 100px;
  }
`;

export default function OrderPreviewPage() {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useStore(state => state.cart);

  const shopList = useStore(state => state.shops);
  const shopDetail = shopList.find(target => target.id === cart?.shop_id);

  const coffeeList = useStore(state => state.coffeeList);
  const specialRequest = useStore(state => state.specialRequest);
  const completeTransaction = useStore(state => state.completeTransaction);
  useEffect(() => {
    if (!cart || !cart?.coffee_orders) return;
    const coffeePricePerOrder = [];

    for (const coffee of cart?.coffee_orders) {
      let coffeeDetails = coffeeList.find(
        target => target.id === coffee.coffee_id
      );

      if (coffeeDetails) {
        const pricePerCoffee = coffeeDetails.price * coffee.quantity;
        coffeePricePerOrder.push(pricePerCoffee);
      }
    }

    for (const order of cart?.coffee_orders) {
      for (const request of order.specialRequests) {
        let requestDetails = specialRequest?.find(
          target => target.id === request.specialRequestId
        );

        if (requestDetails) {
          const pricePerRequest = requestDetails.price;
          coffeePricePerOrder.push(pricePerRequest);
        }
      }
    }

    if (coffeePricePerOrder?.length)
      setTotalPrice(coffeePricePerOrder.reduce((a, b) => a + b));
  }, [cart]);

  const loginUser = useStore(state => state.loginUser);

  useEffect(() => {
    if (!loginUser) history.push("/");
  }, [loginUser]);

  const transactionDone = async () => {
    completeTransaction().then(newTransaction =>
      history.push(`/user/transactionRecord/${newTransaction.id}`)
    );
  };

  return (
    <StyledPage>
      <Header />
      {cart && totalPrice ? (
        <StyledSection>
          <div className="info-box">
            <span>Shop:</span>
            <span> {shopDetail?.name}</span>
            <span>Total Price: </span>
            <span>${totalPrice}</span>
            <span>Ready on:</span>

            <span>{cart.estimated_pickup_time?.slice(11, 16)}</span>
          </div>
          <ul>
            {cart?.coffee_orders?.map((order, index) => (
              <CoffeeOrderPreviewCard order={order} key={index} />
            ))}
          </ul>

          <WheatButton onClick={e => transactionDone()}> Pay</WheatButton>
          <WheatButton onClick={() => history.push("/user/coffeeList")}>
            {" "}
            Add another Coffee
          </WheatButton>
        </StyledSection>
      ) : (
        <h1>Loading</h1>
      )}

      <Footer />
    </StyledPage>
  );
}
