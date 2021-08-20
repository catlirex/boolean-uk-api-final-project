import React from "react";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import useStore, { TransactionHistory } from "../../store";

const StyledShopFooter = styled.footer`
  justify-self: center;
  background-color: black;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 296px;
  position: fixed;
  top: 585px;
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

const GreenButton = withStyles(() => ({
  root: {
    width: "150px",
    height: "80px",
    fontSize: "1.3rem",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    margin: "0",
    borderRadius: 0,
    color: APP_COLOR.darkGray,
    backgroundColor: "#AAFF80",
    "&:hover": {
      backgroundColor: "#66FF19",
      color: APP_COLOR.darkGray,
    },
  },
  disabled: {
    backgroundColor: APP_COLOR.paleWheat,
  },
}))(Button);

const YellowButton = withStyles(() => ({
  root: {
    width: "150px",
    height: "80px",
    fontSize: "1.3rem",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    margin: "0",
    borderRadius: 0,
    color: APP_COLOR.darkGray,
    backgroundColor: "#FFFF99",
    "&:hover": {
      backgroundColor: "#FFFF33",
      color: APP_COLOR.darkGray,
    },
  },
}))(Button);

type Params = {
  id: string;
};

type Props = {
  fullDetailHistory: TransactionHistory | null;
  setFullDetailHistory: (state: TransactionHistory) => void;
};

export default function ShopUpdateStatusFooter({
  fullDetailHistory,
  setFullDetailHistory,
}: Props) {
  const classes = useStyles();
  const { id } = useParams<Params>();
  const updateStatus = useStore((state) => state.updateStatus);

  const handleClick = (status: string) => {
    updateStatus(parseInt(id), status);
    setFullDetailHistory({ ...fullDetailHistory, status });
  };

  return (
    <StyledShopFooter>
      <div className={classes.root}>
        <ButtonGroup
          variant="contained"
          aria-label="contained primary button group"
        >
          <YellowButton onClick={() => handleClick("ready")}>
            Ready
          </YellowButton>
          <GreenButton onClick={() => handleClick("collected")}>
            Collected
          </GreenButton>
        </ButtonGroup>
      </div>
    </StyledShopFooter>
  );
}
