import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import useStore from "../store";
import { APP_COLOR } from "../consistent";

import { CoffeeType } from "../store";

import { removeDuplicateObjectFromArray } from "../helper";

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
`;

export default function CoffeeListComponent() {
  const coffeeList = useStore((store) => store.coffeeList);
  const fetchCoffeeList = useStore((store) => store.fetchCoffeeList);

  const uniqueCoffeeList = removeDuplicateObjectFromArray<CoffeeType>(
    coffeeList,
    "name"
  );

  useEffect(() => {
    fetchCoffeeList();
  }, [fetchCoffeeList]);
  return (
    <CoffeeLIstUl>
      {uniqueCoffeeList.map((coffee: CoffeeType) => (
        <CoffeeLIstDiv>
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
