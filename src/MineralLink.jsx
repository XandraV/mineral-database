import React from "react";
import { Link} from "react-router-dom";
import styled from "styled-components/macro";
const LinkWrapper = styled.span`
  a.link {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
`;

function MineralLink(props) {
  return (
    <LinkWrapper>
      <Link
        className="link"
        to="/mineral-results"
        onClick={props.onClick
        }
      >
        {props.children}
      </Link>
    </LinkWrapper>
  );
}
export default MineralLink;
