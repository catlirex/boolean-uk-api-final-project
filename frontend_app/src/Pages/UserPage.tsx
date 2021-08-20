import React from "react";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";

import Header from "../Component/Header";
import Footer from "../Component/Footer";
import HomeBody from "../Component/HomeBody";

const UserPageDiv = styled.div`
  display: grid;
  height: 84%;
  margin-top: 50px;
  background-color: ${APP_COLOR.wheat};
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
