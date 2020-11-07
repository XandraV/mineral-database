import Paper from "@material-ui/core/Paper";
import styled from "styled-components/macro";

export const StyledPaper = styled(Paper)`
//   background-position: bottom;
//   background-repeat: no-repeat;
//   background-image: url("https://crystallizer.s3.eu-west-2.amazonaws.com/dashboardbackground.svg");
//  opacity: 0.7;
  background-color: #86a7f133;
  border: 0.09em solid white;
  border-radius: 0.6rem;
  padding: 10px 20px;
  text-align: center;
  font-size: 1rem;
  text-decoration: none;
  font-weight: bold;
  height: ${(props)=>props.height};
  color: #83769a;
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
