import React from "react";
import styled from "styled-components";
import appLogo from "../assets/app_logo.png";
import useStore from "../store";
import { APP_COLOR } from "../consistent";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const ColoredButton = withStyles(() => ({
  root: {
    height: "40px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    margin: "0",
    borderRadius: 0,
    color: APP_COLOR.darkGray,
    backgroundColor: APP_COLOR.white,
    "&:hover": {
      backgroundColor: APP_COLOR.paleWheat,
    },
  },
}))(Button);

const StyledHeader = styled.header`
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  background-color: ${APP_COLOR.darkGray};
  align-items: center;
  position: fixed;
  top: 40px;
  width: 300px;

  .header-logo {
    height: 60px;
    width: 60px;
    justify-self: left;
    border-radius: 10px;
    padding: 5px;
    object-fit: cover;
    margin-right: 10px;
  }
  h1 {
    font-size: 1rem;
    align-self: center;
    color: ${APP_COLOR.wheat};
    margin-right: 5px;
  }
  span {
    font-size: 0.8rem;
    align-self: center;
    color: ${APP_COLOR.wheat};
    font-style: italic;
  }
  .button-container {
    width: 200px;
    text-align: right;
  }
  em {
    color: ${APP_COLOR.darkGray};
  }
`;

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const loginUser = useStore((state) => state.loginUser);
  return (
    <StyledHeader>
      <img className="header-logo" src={appLogo} alt="logo" />
      {location.pathname === "/user" ? (
        <h1>Welcome back, {loginUser?.name}</h1>
      ) : null}
      {location.pathname === "/user/shopList" ? (
        <h1>Step1: Select a shop</h1>
      ) : null}
      {location.pathname === "/user/coffeeList" ? (
        <h1>Step2: Select your coffee</h1>
      ) : null}
      {location.pathname.includes("/user/transactionRecord/") ? (
        <>
          <h1> Order details </h1>
          <span> (ID: {location.pathname.split("/")[3]}) </span>
        </>
      ) : null}
      {location.pathname.includes("/shop/order/") ? (
        <div className="button-container">
          <ColoredButton onClick={() => history.push("/shop")}>
            <em>Back</em>
          </ColoredButton>
        </div>
      ) : null}
    </StyledHeader>
  );
}
