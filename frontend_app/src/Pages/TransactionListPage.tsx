import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import TransactionList from "../Component/TransactionList";
import styled from "styled-components";

const TransactionListPageDiv = styled.div`
  height: 84%;
  margin-top: 50px;

  overflow-y: scroll;
  overflow-style: none;

  scroll-behavior: smooth;
  margin-bottom: 200px;
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
