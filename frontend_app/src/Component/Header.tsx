import React from "react";
import styled from "styled-components";
import appLogo from "../assets/app_logo.png";
import useStore from "../store";
import { APP_COLOR } from "../consistent";

const StyledHeader = styled.header`
  display: grid;
  grid-auto-flow: column;
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
  }
  h1 {
    font-size: 1rem;
    align-self: center;
    color: ${APP_COLOR.wheat};
  }
`;

export default function Header() {
  const loginUser = useStore((state) => state.loginUser);
  return (
    <StyledHeader>
      <img className="header-logo" src={appLogo} alt="logo" />
      <h1>Welcome back, {loginUser?.name}</h1>
    </StyledHeader>
  );
}
