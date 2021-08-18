import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import TransactionList from "../Component/TransactionList";
import styled from "styled-components";

const TransactionListPageDiv = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 80px 1fr 50px;
`;

export default function TransactionListPage() {
  return (
    <TransactionListPageDiv>
      <Header />
      <TransactionList />
      <Footer />
    </TransactionListPageDiv>
  );
}
