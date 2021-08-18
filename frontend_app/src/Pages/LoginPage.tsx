import React, { useEffect } from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import LoginForm from "../Component/LoginPageComponent/LoginForm";
import useStore from "../store";
import { APP_COLOR } from "../consistent";
import { useHistory } from "react-router";

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
    height: 150px;
    object-fit: cover;
  }
`;

export default function LoginPage() {
  const loginUser = useStore((state) => state.loginUser);
  const selectRole = useStore((state) => state.selectRole);

  const history = useHistory();

  useEffect(() => {
    if (loginUser && loginUser !== "failToCreate" && loginUser.id)
      history.push(`/users`);
    else return;
  }, [loginUser]);

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
