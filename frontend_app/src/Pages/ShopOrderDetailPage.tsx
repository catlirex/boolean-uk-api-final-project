import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import ShopOrderBody from "../Component/ShopComponent/ShopOrerBody";
import ShopUpdateStatusFooter from "../Component/ShopComponent/ShopUpdateStatusFooter";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";
import { useParams } from "react-router-dom";
import useStore, { TransactionHistory, CoffeeOrderType } from "../store";

export const ShopPageDiv = styled.div`
  display: grid;
  height: 84%;
  margin-top: 50px;
  background-color: ${APP_COLOR.wheat};
`;
type Params = {
  id: string;
};

export default function ShopOrderDetailPage() {
  const { id } = useParams<Params>();

  const [fullDetailHistory, setFullDetailHistory] =
    useState<TransactionHistory | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/transactions/${Number(id)}/orders`)
      .then((res) => res.json())
      .then((data) => setFullDetailHistory(data));
  }, [id]);

  return (
    <ShopPageDiv>
      <Header />
      <ShopOrderBody
        fullDetailHistory={fullDetailHistory}
        setFullDetailHistory={setFullDetailHistory}
      />
      <ShopUpdateStatusFooter
        fullDetailHistory={fullDetailHistory}
        setFullDetailHistory={setFullDetailHistory}
      />
    </ShopPageDiv>
  );
}
