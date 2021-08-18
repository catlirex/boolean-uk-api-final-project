import { TextField, Button, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { APP_COLOR } from "../../consistent";
import styled from "styled-components";
import useStore from "../../store";
import { useState } from "react";

const BlackButton = withStyles(() => ({
  root: {
    height: "30px",
    width: "200px",
    color: APP_COLOR.wheat,
    backgroundColor: APP_COLOR.darkGray,
    "&:hover": {
      backgroundColor: APP_COLOR.black,
    },
  },
}))(Button);

const UserForm = styled.form`
  display: grid;
  place-items: center;
  color: ${APP_COLOR.darkGray};

  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1rem;
  }
`;

export default function UserLoginForm() {
  const setLogInUser = useStore((state) => state.setLogInUser);
  const setNewUser = useStore((state) => state.setNewUser);
  const loginUser = useStore((state) => state.loginUser);
  const loginError = useStore((state) => state.loginError);
  const [phone, setPhone] = useState<null | string>(null);
  const [name, setName] = useState(undefined);

  function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    setLogInUser(e);
  }

  function handleNewUser(e: React.SyntheticEvent) {
    e.preventDefault();
    setNewUser(name, phone);
  }

  return (
    <UserForm onSubmit={(e) => handleLogin(e)}>
      <div className="tagline">
        <h1>We brew for you</h1>
        {loginError === undefined ? (
          <h2>User Not found </h2>
        ) : loginError === "failToCreate" ? (
          <h2>User exist, click login</h2>
        ) : (
          <h2>Click and collect in 5 mins</h2>
        )}
      </div>
      <TextField
        name="phone"
        id="phone"
        label="phone"
        autoComplete="off"
        defaultValue=""
        variant="outlined"
        error={false}
        onChange={(e: React.SyntheticEvent) => setPhone(e.target.value)}
        required
      />
      <TextField
        name="name"
        id="name"
        label="name (new user)"
        autoComplete="off"
        defaultValue=""
        variant="outlined"
        onChange={(e: React.SyntheticEvent) => setName(e.target.value)}
        error={false}
      />
      <BlackButton variant="contained" color="primary" type="submit">
        Enter
      </BlackButton>
      <BlackButton
        variant="contained"
        color="primary"
        type="button"
        onClick={(e) => handleNewUser(e)}
      >
        Register New User
      </BlackButton>
    </UserForm>
  );
}
