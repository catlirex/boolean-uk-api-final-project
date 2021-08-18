import React from "react";

import styled from "styled-components";

import ShopCards from "../Component/ShopCards";

const ShopPageDiv = styled.div`
  display: grid;
`;

export default function ShopPage() {
  return (
    <ShopPageDiv>
      {/* header */}
      {/* body */}
      <ShopCards />
      {/* footer */}
    </ShopPageDiv>
  );
}
