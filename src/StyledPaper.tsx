import Paper from "@material-ui/core/Paper";
import styled from "styled-components/macro";

type PaperProps = {
  height: string;
};

//#b7adc7
export const StyledPaper = styled(Paper)<PaperProps>`
  &&.MuiPaper-rounded {
    background: #86a7f133;
    border: 0.09em solid white;
    border-radius: 8px;
    padding: 10px 20px;
    text-align: center;
    font-size: 1rem;
    text-decoration: none;
    font-weight: bold;
    height: ${(props) => props.height};
    color: #83769a;
  }
  @-webkit-keyframes fade-in-left {
    0% {
      -webkit-transform: translateX(-50px);
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes fade-in-left {
    0% {
      -webkit-transform: translateX(-50px);
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }

  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;
