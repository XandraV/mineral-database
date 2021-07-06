import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components/macro';

const StyledButton = styled(Button)`
  && {
    background: transparent;
    border-radius: 20px;
    border: 2px solid #ffb1cf;
    color: white;
    height: 40px;
    width: 120px;
    padding-top: 0 20px;
    font-weight: bold;
    :hover {
      background: rgba(255, 255, 255, 0.1);
    }

    @-webkit-keyframes slide-in-left {
      0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slide-in-left {
      0% {
        -webkit-transform: translateX(-1000px);
        transform: translateX(-1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
        opacity: 1;
      }
    }

    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      1s both;
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both;
  }
`;
type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const SearchButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <StyledButton
      variant='contained'
      className='button-create'
      onClick={onClick}
    >
      Search
    </StyledButton>
  );
};
export default SearchButton;
