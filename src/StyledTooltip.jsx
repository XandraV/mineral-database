import React from "react";
import styled from "styled-components/macro";

const TooltipWrapper = styled.div`
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  position: absolute;
  text-align: center;
  width: 6rem;
  font-size: 0.7rem;
  height: 2.5rem;
  padding: 0.2rem;
  background: lightsteelblue;
  border-radius: 8px;
  color: white;
`;

const StyledTooltip = ({ ...props }) => {
  return (
    <TooltipWrapper hovered={props.hovered} left={props.left} top={props.top}>
      {props.children}
    </TooltipWrapper>
  );
};

export default StyledTooltip;
