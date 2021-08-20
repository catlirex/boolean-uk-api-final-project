import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import useStore from "../store";
import { APP_COLOR } from "../consistent";

import { CoffeeType } from "../store";

import { removeDuplicateObjectFromArray } from "../helper";
import { useHistory } from "react-router-dom";

const CoffeeLIstDiv = styled.div`
  display: grid;
  align-items: center;
  gap: 10px;

  background-color: ${APP_COLOR.paleWheat};

  height: 100%;

  padding: 1rem;
  border-radius: 10px;

  list-style-type: none;

  .coffee-image {
    height: 100px;
    width: 100px;
    object-fit: cover;
  }
  .coffee-name {
    font-size: 1rem;
    text-align: center;
    font-weight: 300;
    font-variant-caps: petite-caps;
  }
`;
const CoffeeLIstUl = styled.ul`
  display: grid;
  align-items: center;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 20px;
  height: 100%;

  overflow-y: scroll;
  overflow-style: none;

  scroll-behavior: smooth;

  padding: 0.5rem;

  margin-right: auto;
  margin-left: auto;

  .container:hover {
    box-shadow: 0px 0px 5px 0.5px ${APP_COLOR.white};
  }
`;

export default function CoffeeListComponent() {
  const coffeeList = useStore(store => store.coffeeList);
  const fetchCoffeeList = useStore(store => store.fetchCoffeeList);

  const selectedCoffee = useStore(store => store.selectedCoffee);
  const setSelectedCoffee = useStore(store => store.setSelectedCoffee);

  const uniqueCoffeeList = removeDuplicateObjectFromArray<CoffeeType>(
    coffeeList,
    "name"
  );

  const history = useHistory();

  const handleSubmit = (coffee: CoffeeType) => {
    setSelectedCoffee(coffee.name);
    history.push("/user/coffeeDetails");
  };

  useEffect(() => {
    fetchCoffeeList();
  }, [fetchCoffeeList]);
  return (
    <CoffeeLIstUl>
      {uniqueCoffeeList.map((coffee: CoffeeType, index) => (
        <CoffeeLIstDiv
          key={index}
          onClick={() => {
            handleSubmit(coffee);
          }}
          className="container"
        >
          <div className="coffee-image">
            <img
              src={coffee.image}
              alt={coffee.name}
              width="100%"
              height="100%"
            />
          </div>
          <div className="coffee-name">
            <h3>{coffee.name}</h3>
          </div>
        </CoffeeLIstDiv>
      ))}
    </CoffeeLIstUl>
  );
}
