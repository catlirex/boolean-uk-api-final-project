import React from "react";
import useStore, { TransactionHistory } from "../../store";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import { CoffeeOrderType } from "../../store";
import { Button, withStyles } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

type Props = {
  order: TransactionHistory;
};

const HistoryLi = styled.li`
  background-color: ${APP_COLOR.wheat};
  padding: 0 10px;
  border-radius: 5px;
  display: grid;
  grid-template-rows: 40px auto;
  gap: 5px;
  color: ${APP_COLOR.white};

  .status-box {
    color: ${APP_COLOR.darkGray};
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: ;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
    font-variant: petite-caps;
  }
  .status {
    font-size: 1.5rem;
  }
  .info-container {
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr 80px;
  }
`;

const SquareButton = withStyles(() => ({
  root: {
    height: "80px",
    width: "80px",
    fontSize: "0.8rem",
    color: APP_COLOR.darkGray,
    backgroundColor: APP_COLOR.paleWheat,
    "&:hover": {
      backgroundColor: APP_COLOR.lightBrown,
    },
  },
}))(Button);

export default function OrderCard({ order }: Props) {
  const { id, status, estimated_pickup_time, coffeeOrder } = order;
  const pickUpTime = estimated_pickup_time.slice(11, 16);
  const updateStatus = useStore((state) => state.updateStatus);
  const history = useHistory();

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    updateStatus(id, "processing");
  };

  return (
    <HistoryLi
      onClick={() => {
        history.push(`/shop/order/${id}`);
      }}
    >
      <div className="status-box">
        <span className="status">{status}</span>
        {status === "pending" || status === "processing" ? (
          <span>ReadyOn:{pickUpTime}</span>
        ) : null}
      </div>
      <div className="info-container">
        <div>
          <p>Transaction ID: {id}</p>
          {coffeeOrder?.map((oneCoffee: CoffeeOrderType, index) => (
            <p key={index}>
              {" "}
              {oneCoffee.coffee?.name} X {oneCoffee.quantity}{" "}
            </p>
          ))}
        </div>
        {status === "pending" ? (
          <SquareButton onClick={(e) => handleClick(e)}>
            Accept& Process
          </SquareButton>
        ) : null}
      </div>
    </HistoryLi>
  );
}
