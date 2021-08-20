import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";

const QuantityDiv = styled.div`
  display: grid;
  grid-template-columns: 30px 30px 30px;
  padding: 1rem 0 1rem 5rem;

  align-items: center;
  grid-gap: 1rem;

  button {
    align-self: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;

    background-color: ${APP_COLOR.lightBrown};
  }

  p {
    text-align: center;
  }
`;

export default function QuantityComponent() {
  const [count, setCount] = useState(1);

  return (
    <QuantityDiv>
      <button
        onClick={e => {
          e.preventDefault();
          if (count > 1) setCount(count - 1);
        }}
      >
        -
      </button>
      <input
        id={count.toString()}
        name="quantity"
        className="quantity"
        value={count}
        onChange={(e: React.SyntheticEvent) => {
          const target = e.target as typeof e.target & {
            value: number;
          };
          setCount(target.value);
        }}
      />
      <button
        onClick={e => {
          e.preventDefault();
          if (count < 10) setCount(count + 1);
        }}
      >
        +
      </button>
    </QuantityDiv>
  );
}
