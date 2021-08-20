import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import CoffeeDetailsComponent from "../Component/CoffeeDetailsComponent";
import useStore from "../store";

const DetailPageDiv = styled.div`
  height: 100%;
  width: 290px;

  border-radius: 10px;

  overflow-y: scroll;
`;

export default function CoffeeDetailsPage() {
  const loginUser = useStore(state => state.loginUser);
  const history = useHistory();

  useEffect(() => {
    if (!loginUser) history.push("/");
  }, [loginUser]);

  return (
    <DetailPageDiv>
      <CoffeeDetailsComponent />
    </DetailPageDiv>
  );
}
