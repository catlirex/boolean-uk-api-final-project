import React, { Key } from "react";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";
import useStore, { TransactionHistory, CoffeeOrderType } from "../store";
import takeaway from "../assets/hot_coffee_icon.png";

const HistoryLi = styled.li`
  background-color: ${APP_COLOR.wheat};
  border-radius: 5px;
  display: grid;
  grid-template-rows: 40px auto;
  gap: 5px;
  min-height: 100px;
  .status-box {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: ${APP_COLOR.white};
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
  .info {
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr 80px;
  }
  p {
    font-size: 1rem;
    font-variant-caps: all-petite-caps;
  }
  .icon {
    width: 40px;
    height: 40px;
  }
  .reorder {
    text-align: center;
    align-self: center;
  }
  .reorder p {
    border: 2px solid ${APP_COLOR.lightBrown};
    background-color: ${APP_COLOR.darkGray};
    color: ${APP_COLOR.white};
    border-radius: 2px;
    padding: 5px;
  }
`;
type Props = {
  history: TransactionHistory;
};

export default function TransactionHistoryCard({ history }: Props) {
  const shopList = useStore((state) => state.shops);
  const {
    status,
    estimated_pickup_time,
    id,
    shop_id,
    transaction_time,
    coffeeOrder,
  } = history;
  const shopDetail = shopList.find((target) => target.id === shop_id);
  const pickUpTime = estimated_pickup_time.slice(11, 16);

  return (
    <HistoryLi>
      <div className="status-box">
        <span className="status">{status}</span>
        {status === "pending" ? <span>ReadyOn:{pickUpTime}</span> : null}
      </div>
      <div className="info">
        <div>
          <p>Shop:</p>
          <span> {shopDetail?.name}</span>
          <p>Coffee:</p>
          {coffeeOrder?.map((order: CoffeeOrderType, index: Key) => (
            <span key={index}> {order.coffee?.name}, </span>
          ))}
        </div>

        <div className="reorder">
          <img className="icon" src={takeaway} alt="takeaway icon" />
          <p>Reorder</p>
        </div>
      </div>
    </HistoryLi>
  );
}
