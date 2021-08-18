import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

import styled from "styled-components";
import ShopCards from "../Component/ShopCards";
import useStore from "../store";

const ShopPageDiv = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 80px 1fr 50px;
`;

export default function ShopPage() {
  const loginUser = useStore((state) => state.loginUser);
  const history = useHistory();

  useEffect(() => {
    if (!loginUser) history.push("/");
  }, [loginUser]);

  return (
    <ShopPageDiv>
      <Header />

      <ShopCards />
      <Footer />
    </ShopPageDiv>
  );
}
