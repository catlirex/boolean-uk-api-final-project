import React from "react";
import styled from "styled-components";
import appLogo from "../assets/app_logo.png";
import useStore from "../store";
import { APP_COLOR } from "../consistent";
import { useLocation } from "react-router-dom";

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
`;

export default function Header() {
  const location = useLocation();
  console.log(location.pathname.split("/"));
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
    </StyledHeader>
  );
}
