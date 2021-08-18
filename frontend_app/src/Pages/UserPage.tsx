import React from "react";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";

import Header from "../Component/Header";
import Footer from "../Component/Footer";
import HomeBody from "../Component/HomeBody";

const UserPageDiv = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 80px 1fr 50px;
  background-color: ${APP_COLOR.wheat};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export default function UserPage() {
  return (
    <UserPageDiv>
      <Header />
      <HomeBody />
      <Footer />
    </UserPageDiv>
  );
}
