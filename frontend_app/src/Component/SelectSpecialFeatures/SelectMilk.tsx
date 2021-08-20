import React, { useEffect } from "react";
import styled from "styled-components";
import useStore from "../../store";
import { APP_COLOR } from "../../consistent";

const MilkDivEl = styled.div`
  display: grid;
  grid-auto-flow: column;

  align-items: center;

  padding: 0.5rem;

  gap: 5px;

  overflow-x: scroll;

  input[type="radio"].milk {
    opacity: 0;
  }

  input[type="radio"].milk:checked + label {
    display: grid;
    grid-auto-flow: column;

    background-color: ${APP_COLOR.lightBrown};
    box-shadow: inset 0 1px 6px rgba(41, 41, 41, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.05);
    cursor: default;
    color: ${APP_COLOR.darkGray};
    border: 3px solid #8b4513;
    text-shadow: 0 1px 1px rgba(40, 40, 40, 0.75);
    border-radius: 10px;
  }

  input[type="radio"].milk + label {
    display: grid;
    align-items: center;

    border: 1px solid #8b4513;
    border-radius: 10px;

    padding: 1rem;
    height: auto;
    width: auto;
  }

  input[type="radio"].milk:checked + label.btn:hover {
    background-color: inherit;
    background-position: 0 0;
    transition: none;
  }

  input[type="radio"].Regular + label {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  input[type="radio"].Large + label {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default function SelectMilk() {
  const specialRequest = useStore(store => store.specialRequest);

  const handleClick = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string;
    };
  };

  const milkOptions = specialRequest?.filter(
    request => request.type === "milk"
  );

  return (
    <MilkDivEl
      className="horizontal-scroll-wrapper milk-options squares"
      onChange={e => handleClick(e)}
    >
      {milkOptions?.map((option, index) => (
        <div key={index}>
          <input
            id={option.request.toString()}
            type="radio"
            name="milk"
            className="milk"
            value={option.id.toString()}
          />
          <label htmlFor={option.request.toString()}>{option.request}</label>
        </div>
      ))}
    </MilkDivEl>
  );
}
