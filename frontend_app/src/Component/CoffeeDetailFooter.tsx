import React from "react";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";
import { Button, withStyles } from "@material-ui/core";

const SquareButton = withStyles(() => ({
  root: {
    height: "50px",
    width: "150px",
    color: APP_COLOR.darkGray,
    backgroundColor: APP_COLOR.lightBrown,
    "&:hover": {
      backgroundColor: APP_COLOR.paleWheat,
    },
  },
}))(Button);

const CoffeeDetailsFooterEl = styled.div`
  text-align: center;

  grid-gap: 0.5rem;

  padding: 0.5rem 0.5rem;
  background-color: ${APP_COLOR.darkGray};

  width: 296px;

  h3 {
    color: ${APP_COLOR.wheat};
    text-decoration: underline;
  }
`;

export default function CoffeeDetailsFooter() {
  return (
    <CoffeeDetailsFooterEl>
      <SquareButton type="submit" variant="contained">
        Add to Order
      </SquareButton>
    </CoffeeDetailsFooterEl>
  );
}
