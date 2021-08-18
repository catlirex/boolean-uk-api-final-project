import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useStore, { TransactionHistory } from "../store";
import TransactionHistoryCard from "./TransactionHistoryCard";
import { APP_COLOR } from "../consistent";

const StyledHistoryList = styled.ul`
  display: grid;
  gap: 10px;
  height: max-content;
  h2 {
    color: ${APP_COLOR.paleWheat};
    font-size: 1.2rem;
    padding: 20px 5px;
  }
`;

export default function TransactionList() {
  const loginUser = useStore((state) => state.loginUser);
  const history = useHistory();
  const fetchShops = useStore((state) => state.fetchShops);
  const userTransactionHistory = useStore(
    (state) => state.userTransactionHistory
  );
  const getUserTransactionHistory = useStore(
    (state) => state.getUserTransactionHistory
  );
  useEffect(() => {
    fetchShops();
    if (!loginUser) history.push("/");
    else getUserTransactionHistory();
  }, [loginUser]);

  return (
    <StyledHistoryList>
      {userTransactionHistory.length ? (
        userTransactionHistory.map((history: TransactionHistory, index) => (
          <TransactionHistoryCard history={history} key={index} />
        ))
      ) : (
        <h2>You have 0 transaction record</h2>
      )}
    </StyledHistoryList>
  );
}
