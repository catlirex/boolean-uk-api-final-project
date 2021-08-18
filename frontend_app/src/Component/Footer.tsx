import React from "react";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useHistory } from "react-router-dom";

const StyledFooter = styled.footer`
  justify-self: center;
  background-color: black;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridAutoFlow: "column",
    alignItems: "center",
    borderRadius: 0,
    width: "100%",
  },
}));

const ColoredButton = withStyles(() => ({
  root: {
    height: "40px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    margin: "0",
    borderRadius: 0,
    color: APP_COLOR.darkGray,
    backgroundColor: APP_COLOR.lightBrown,
    "&:hover": {
      backgroundColor: APP_COLOR.paleWheat,
    },
  },
}))(Button);

export default function Footer() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <StyledFooter>
      <div className={classes.root}>
        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
        >
          <ColoredButton onClick={() => history.push("/")}>
            <HomeIcon />
            Home
          </ColoredButton>
          <ColoredButton onClick={() => history.push("/shop")}>
            <ShoppingBasketIcon />
            Order Coffee
          </ColoredButton>
          <ColoredButton>
            <ConfirmationNumberIcon />
          </ColoredButton>
        </ButtonGroup>
      </div>
    </StyledFooter>
  );
}
