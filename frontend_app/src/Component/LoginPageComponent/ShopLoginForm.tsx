import { TextField, Button, withStyles } from "@material-ui/core";
import React from "react";
import { APP_COLOR } from "../../consistent";
import styled from "styled-components";
import useStore from "../../store";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
const ShopForm = styled.form`
  display: grid;
  place-items: center;
  align-content: center;
  gap: 10px;
  color: ${APP_COLOR.darkGray};

  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1rem;
  }
`;

export default function ShopLoginForm() {
  const loginError = useStore((state) => state.loginError);
  const setLoginShop = useStore((state) => state.setLoginShop);
  const loginShopTodayTransaction = useStore(
    (state) => state.loginShopTodayTransaction
  );
  const history = useHistory();

  useEffect(() => {
    if (loginShopTodayTransaction) history.push("/shop");
  }, [loginShopTodayTransaction]);

  function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoginShop(e);
  }
  return (
    <ShopForm onSubmit={(e) => handleLogin(e)}>
      <div className="tagline">
        <h1>We brew coffee</h1>
        {loginError === undefined ? (
          <h2>Shop Not found </h2>
        ) : (
          <h2>New order is pending</h2>
        )}
      </div>
      <div>
        <TextField
          name="postcode"
          id="postcode"
          label="Shop postcode"
          autoComplete="off"
          defaultValue=""
          variant="outlined"
          error={false}
          required
        />
      </div>
      <BlackButton variant="contained" color="primary" type="submit">
        Enter Shop
      </BlackButton>
    </ShopForm>
  );
}
