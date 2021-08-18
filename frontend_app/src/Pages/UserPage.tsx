import React from "react";

import styled from "styled-components";

import ShopCards from "../Component/ShopCards";

const UserPageDiv = styled.div`
  display: grid;
`;

export default function UserPage() {
  return (
    <UserPageDiv>
      {/* header */}
      {/* body */}
      <ShopCards />
      {/* footer */}
    </UserPageDiv>
  );
}
