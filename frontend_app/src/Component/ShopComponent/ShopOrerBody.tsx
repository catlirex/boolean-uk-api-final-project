import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import useStore, { TransactionHistory, CoffeeOrderType } from "../../store";
import CoffeeOrderCard from "../CoffeeOrderCard";
import { APP_COLOR } from "../../consistent";
import { Button, withStyles } from "@material-ui/core";

const WheatButton = withStyles(() => ({
  root: {
    float: "right",
    marginRight: "5px",
    height: "80px",
    fontSize: "0.8rem",
    width: "80px",
    color: APP_COLOR.darkGray,
    backgroundColor: APP_COLOR.paleRed,
    "&:hover": {
      backgroundColor: APP_COLOR.paleWheat,
    },
  },
}))(Button);

const StyledPage = styled.div`
  height: 100%;
  width: 300px;
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
    background-color: ${(props) => props.color};
  }
  .status {
    font-size: 1.5rem;
  }
  .info-box {
    padding: 10px 0;
    display: grid;
    grid-template-columns: 50px 1fr;
    height: 100px;
  }
  .info-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 100px;
    justify-items: center;
    align-items: center;
  }
`;
type Props = {
  fullDetailHistory: TransactionHistory | null;
  setFullDetailHistory: (state: TransactionHistory) => void;
};
export default function ShopOrderBody({
  fullDetailHistory,
  setFullDetailHistory,
}: Props) {
  const updateStatus = useStore((state) => state.updateStatus);
  const [totalPrice, setTotalPrice] = useState(0);

  const shopList = useStore((state) => state.shops);
  const shopDetail = shopList.find(
    (target) => target.id === fullDetailHistory?.shop_id
  );

  useEffect(() => {
    if (!fullDetailHistory) return;
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
    if (pricePreCoffeeOrder?.length)
      setTotalPrice(pricePreCoffeeOrder.reduce((a, b) => a + b));
  }, [fullDetailHistory]);

  const handleClick = async () => {
    if (!fullDetailHistory) return;
    updateStatus(fullDetailHistory.id, "processing");
    if (fullDetailHistory)
      setFullDetailHistory({ ...fullDetailHistory, status: "processing" });
  };

  return (
    <StyledPage>
      {fullDetailHistory && totalPrice ? (
        <StyledSection
          color={
            fullDetailHistory.status === "collected"
              ? "#AAFF80"
              : APP_COLOR.wheat
          }
        >
          <div className="status-box">
            <span className="status">{fullDetailHistory.status}</span>
            {fullDetailHistory.status === "pending" ||
            fullDetailHistory.status === "processing" ? (
              <span>
                ReadyOn: {fullDetailHistory.estimated_pickup_time.slice(11, 16)}
              </span>
            ) : null}
          </div>
          <div className="info-container">
            <div className="info-box">
              <span>Price: </span>
              <span>${totalPrice}</span>
              <span>Date: </span>

              <span>
                {" "}
                {fullDetailHistory.transaction_time.slice(0, 10)}{" "}
                {fullDetailHistory.transaction_time.slice(11, 16)}
              </span>
            </div>
            {fullDetailHistory.status === "pending" ? (
              <WheatButton
                variant="contained"
                type="button"
                onClick={(e) => handleClick()}
              >
                Process Order
              </WheatButton>
            ) : null}
          </div>
          <ul>
            {fullDetailHistory.coffeeOrder?.map((order, index) => (
              <CoffeeOrderCard order={order} key={index} />
            ))}
          </ul>
        </StyledSection>
      ) : (
        <h1>Loading</h1>
      )}
    </StyledPage>
  );
}
