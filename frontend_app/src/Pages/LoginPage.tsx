import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import LoginForm from "../Component/LoginPageComponent/LoginForm";
import useStore from "../store";
import { APP_COLOR } from "../consistent";

const SquareButton = withStyles(() => ({
  root: {
    height: "50px",
    width: "200px",
    color: APP_COLOR.darkGray,
    backgroundColor: APP_COLOR.lightBrown,
    "&:hover": {
      backgroundColor: APP_COLOR.paleWheat,
    },
  },
}))(Button);

const LoginPageDiv = styled.div`
  display: grid;
  gap: 20px;
  height: 100%;
  color: ${APP_COLOR.wheat};
  .select-role-buttons {
    display: grid;
    gap: 10px;
    place-content: center;
  }
  .logo {
    width: 100%;
    padding: 0;
  }
`;

export default function LoginPage() {
  const selectRole = useStore((state) => state.selectRole);
  return (
    <LoginPageDiv>
      <header>
        <img className="logo" src="./src/assets/app_logo.png" alt="app-logo" />
      </header>
      <LoginForm />

      <div className="select-role-buttons">
        <SquareButton variant="contained" onClick={() => selectRole("user")}>
          User{" "}
        </SquareButton>
        <SquareButton variant="contained" onClick={() => selectRole("shop")}>
          Shop Owner
        </SquareButton>
      </div>
    </LoginPageDiv>
  );
}
