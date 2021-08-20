import React, { useEffect } from "react";
import useStore, { TransactionHistory, CoffeeOrderType } from "../store";
import styled from "styled-components";

type Props = {
  order: CoffeeOrderType;
};

const StyledOrderCard = styled.li`
  display: grid;
  grid-template-columns: 1fr 80px;
  padding: 5px;
  .coffee-info-box {
    align-self: center;
  }
  .coffee-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  h2 {
    font-size: 1.3rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

export default function CoffeeOrderCard({ order }: Props) {
  const { quantity, specialRequests, coffee } = order;
  return (
    <StyledOrderCard>
      <div className="coffee-info-box">
        <h2>
          {coffee.name}
          {quantity > 1 ? " x " + quantity : null}
        </h2>
        <p>{coffee.size}</p>

        {specialRequests?.length
          ? specialRequests.map((request) => (
              <p key={request.id}>
                {request.specialRequest.request} {request.specialRequest.type}
              </p>
            ))
          : null}
      </div>
      <img className="coffee-image" src={coffee.image} alt={coffee.name} />
    </StyledOrderCard>
  );
}
