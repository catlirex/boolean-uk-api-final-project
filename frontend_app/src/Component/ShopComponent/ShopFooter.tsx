import React from "react";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useStore from "../../store";

const StyledShopFooter = styled.footer`
  justify-self: center;
  background-color: black;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 296px;
  position: fixed;
  top: 623px;
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
    color: APP_COLOR.paleWheat,
    backgroundColor: APP_COLOR.darkGray,
    "&:hover": {
      backgroundColor: APP_COLOR.paleWheat,
      color: APP_COLOR.darkGray,
    },
  },
}))(Button);

export default function ShopFooter() {
  const setOrderFilter = useStore((state) => state.setOrderFilter);
  const history = useHistory();
  const classes = useStyles();

  return (
    <StyledShopFooter>
      <div className={classes.root}>
        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
        >
          <ColoredButton onClick={() => setOrderFilter("pending")}>
            Pending
          </ColoredButton>
          <ColoredButton onClick={() => setOrderFilter("urgent")}>
            <strong>!Urgent!</strong>
          </ColoredButton>
          <ColoredButton onClick={() => setOrderFilter("all")}>
            Today's
          </ColoredButton>
        </ButtonGroup>
      </div>
    </StyledShopFooter>
  );
}
