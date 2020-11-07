import React, { FC } from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components/macro";

const ButtonWrapper = styled.span`
  button.bin {
    position: "absolute";
    @-webkit-keyframes slide-in-right {
      0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slide-in-right {
      0% {
        -webkit-transform: translateX(1000px);
        transform: translateX(1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }

    -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      1.2s both;
    animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s
      both;
  }
`;
type BinProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const BinButton: FC<BinProps> = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <IconButton className="bin" onClick={onClick}>
        <DeleteOutlinedIcon
          style={{ color: "white" }}
          className="material-icons"
        />
      </IconButton>
    </ButtonWrapper>
  );
};
export default BinButton;
