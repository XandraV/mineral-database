import React from "react";
import styled from "styled-components/macro";

const ImgWrapper = styled.div`
  padding-top: 0.5em;
`;

function Icon() {
  return (
    <ImgWrapper>
      <img
        alt="icon"
        src={`https://crystallizer.s3.eu-west-2.amazonaws.com/crystallizer.ico`}
        width={50}
        height={50}
      />
    </ImgWrapper>
  );
}
export default Icon;
