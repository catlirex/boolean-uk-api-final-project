import React from "react";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";
import coffeeImg from "../assets/coffee_img_1.jpeg";
import takeaway from "../assets/hot_coffee_icon.jpeg";
import brewCoffee from "../assets/brew_coffee_icon.jpeg";
import { useHistory } from "react-router";
import useStore from "../store";

const UserHomeContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template:
    "new new" 150px
    "view reorder" 150px/
    1fr 1fr;

  padding: 10px;

  .new-order {
    grid-area: new;
  }
  .view-order {
    gird-area: view;
  }
  .reorder {
    grid-area: reorder;
  }
  .container {
    background-color: ${APP_COLOR.white};

    border-radius: 10px;
  }
  .container:hover {
    box-shadow: 0px 0px 10px 1px ${APP_COLOR.white};
  }

  .coffee-img {
    height: 100px;
    width: 100%;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  h1 {
    font-size: 1.5rem;
    color: ${APP_COLOR.darkGray};
    padding: 5px;
  }
  h2 {
    font-size: 1rem;
    color: ${APP_COLOR.darkGray};
    padding: 5px;
  }
`;

export default function HomeBody() {
  const history = useHistory();
  const loginUser = useStore((state) => state.loginUser);

  return (
    <UserHomeContainer>
      <div
        className="new-order container"
        onClick={() => history.push(`/shop/${loginUser?.id}`)}
      >
        <img className="coffee-img" src={coffeeImg} alt="coffee image" />
        <h1>Make your order</h1>
      </div>

      <div className="view-order container">
        <img className="coffee-img" src={brewCoffee} alt="coffee image" />

        <h2>View order Status</h2>
      </div>
      <div className="reorder container">
        <img className="coffee-img" src={takeaway} alt="coffee image" />
        <h2>One Click Reorder</h2>
      </div>
    </UserHomeContainer>
  );
}
