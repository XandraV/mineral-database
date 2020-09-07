import React from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components/macro";

const ButtonWrapper = styled.span`
  button.bin {
    position: "absolute";
    transition: all 0.3s ease 0s;
  }
  button.bin:hover {
    transform: translateY(-7px);
  }
`;

function BinButton(props) {
  return (
    <ButtonWrapper>
      <IconButton className="bin" onClick={props.onClick}>
        <DeleteOutlinedIcon
          style={{ color: "black" }}
          className="material-icons"
        />
      </IconButton>
    </ButtonWrapper>
  );
}
export default BinButton;
