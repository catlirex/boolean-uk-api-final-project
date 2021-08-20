import React, { useEffect, useState } from "react";
import { APP_COLOR } from "../consistent";
import useStore, { CoffeeOrderType, SpecialRequest } from "../store";
import styled from "styled-components";

type Props = {
  order: CoffeeOrderType;
};

const StyledOrderCard = styled.li`
  display: grid;
  grid-template-columns: 1fr 80px;
  padding: 5px;
  margin-bottom: 10px;
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
  button {
    float: right;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${APP_COLOR.paleWheat};
    border: none;
  }
`;

export default function CoffeeOrderPreviewCard({ order }: Props) {
  const { quantity, specialRequests, coffee_id } = order;
  const cart = useStore(state => state.cart);
  const setCart = useStore(state => state.setCart);

  const coffeeList = useStore(store => store.coffeeList);
  const coffee = coffeeList.find(coffee => coffee.id === coffee_id);

  const specialRequestList = useStore(state => state.specialRequest);
  const [selectedRequestDetail, setSelectedRequestDetail] = useState<
    SpecialRequest[]
  >([]);

  useEffect(() => {
    let data = [];
    for (const request of specialRequests) {
      let detail = specialRequestList?.find(
        target => target.id === request.specialRequestId
      );
      if (detail) data.push(detail);
    }
    setSelectedRequestDetail(data);
  }, [specialRequests]);

  const removeCoffee = () => {
    const newCart = {
      ...cart,
      coffee_orders: cart?.coffee_orders?.filter(
        target => target.coffee_id !== coffee_id
      ),
    };
    setCart(newCart);
  };

  return (
    <StyledOrderCard>
      <div className="coffee-info-box">
        <h2>
          {coffee?.name}
          {quantity > 1 ? " x " + quantity : null}
        </h2>
        <p>{coffee?.size}</p>

        {selectedRequestDetail.length
          ? selectedRequestDetail.map(request => (
              <p key={request.id}>
                {request.request} {request.type}
              </p>
            ))
          : null}
      </div>
      <div>
        <button onClick={() => removeCoffee()}> X </button>
        <img className="coffee-image" src={coffee?.image} alt={coffee?.name} />
      </div>
    </StyledOrderCard>
  );
}
