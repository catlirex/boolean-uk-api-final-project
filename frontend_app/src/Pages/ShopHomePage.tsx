import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import useStore from "../store";
import Header from "../Component/Header";
import ShopFooter from "../Component/ShopComponent/ShopFooter";
import { APP_COLOR } from "../consistent";
import ShopHomeBody from "../Component/ShopComponent/ShopHomeBody";
import { useHistory } from "react-router-dom";

const ShopPageDiv = styled.div`
  display: grid;
  height: 84%;
  margin-top: 50px;
  background-color: ${APP_COLOR.wheat};
`;

export default function ShopHomePage() {
  return (
    <ShopPageDiv>
      <Header />
      <ShopHomeBody />
      <ShopFooter />
    </ShopPageDiv>
  );
}
