import React, { useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import useStore, { TransactionHistory, CoffeeOrderType } from "../store";
import CoffeeOrderCard from "../Component/CoffeeOrderCard";
import { APP_COLOR } from "../consistent";
import { Button, withStyles } from "@material-ui/core";

type Params = {
  id: string;
};

const WheatButton = withStyles(() => ({
  root: {
    float: "right",
    marginRight: "5px",
    height: "50px",
    fontSize: "0.8rem",
    width: "80px",
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

export default function TransactionDetailPage() {
  const { id } = useParams<Params>();
  const history = useHistory();
  const [fullDetailHistory, setFullDetailHistory] =
    useState<TransactionHistory | null>(null);
  const deleteTransaction = useStore((state) => state.deleteTransaction);

  useEffect(() => {
    fetch(`http://localhost:3000/transactions/${Number(id)}/orders`)
      .then((res) => res.json())
      .then((data) => setFullDetailHistory(data));
  }, [id]);

  console.log(fullDetailHistory);
  const shopList = useStore((state) => state.shops);
  const shopDetail = shopList.find(
    (target) => target.id === fullDetailHistory?.shop_id
  );
  const pricePreCoffeeOrder = fullDetailHistory?.coffeeOrder?.map(
    (order: CoffeeOrderType) => {
      if (!order.specialRequests?.length)
        return order.quantity * order.coffee.price;
      else {
        let price = 0;
        for (const request of order.specialRequests) {
          price += request.specialRequest.price * order.quantity;
        }
        return order.quantity * order.coffee.price + price;
      }
    }
  );
  const totalPrice = pricePreCoffeeOrder?.reduce((a, b) => a + b);

  const handleClick = async (e: React.SyntheticEvent) => {
    if (fullDetailHistory) {
      const complete = await deleteTransaction(fullDetailHistory.id);
      history.push("/user/transactionRecord");
    }
  };

  return (
    <StyledPage>
      <Header />
      {fullDetailHistory ? (
        <StyledSection>
          <div className="status-box">
            <span className="status">{fullDetailHistory.status}</span>
            {fullDetailHistory.status === "pending" ||
            fullDetailHistory.status === "processing" ? (
              <span>
                ReadyOn: {fullDetailHistory.estimated_pickup_time.slice(11, 16)}
              </span>
            ) : null}
          </div>
          <div className="info-box">
            <span>Shop:</span>
            <span> {shopDetail?.name}</span>
            <span>Total Price: </span>
            <span>${totalPrice}</span>
            <span>Date: </span>

            <span>
              {" "}
              {fullDetailHistory.transaction_time.slice(0, 10)}{" "}
              {fullDetailHistory.transaction_time.slice(11, 16)}
            </span>
          </div>
          <ul>
            {fullDetailHistory.coffeeOrder?.map((order, index) => (
              <CoffeeOrderCard order={order} key={index} />
            ))}
          </ul>
          {fullDetailHistory.status === "pending" ? (
            <WheatButton
              variant="contained"
              type="button"
              onClick={(e) => handleClick(e)}
            >
              Cancel order
            </WheatButton>
          ) : null}
        </StyledSection>
      ) : (
        <h1>Loading</h1>
      )}
      <Footer />
    </StyledPage>
  );
}
