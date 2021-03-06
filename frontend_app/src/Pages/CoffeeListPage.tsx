import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CoffeeListComponent from "../Component/CoffeeListComponent";
import useStore from "../store";
import styled from "styled-components";

import Header from "../Component/Header";
import Footer from "../Component/Footer";

const StyledCoffeeListPage = styled.div`
  height: 84%;
  margin-top: 50px;
`;

export default function CoffeeList() {
  const loginUser = useStore((state) => state.loginUser);
  const history = useHistory();

  useEffect(() => {
    if (!loginUser) history.push("/");
  }, [loginUser]);
  return (
    <StyledCoffeeListPage>
      <Header />
      <CoffeeListComponent />
      <Footer />
    </StyledCoffeeListPage>
  );
}
