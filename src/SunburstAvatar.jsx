import React from "react";
import Avatar from "@material-ui/core/Avatar";
function SunburstAvatar(props) {
  return (
    <Avatar
      alt="Something"
      src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${props.hoveredCell.title
        .toString()
        .toLowerCase()}.svg`}
      style={{ width: 200, height: 200 }}
    />
  );
}
export default SunburstAvatar;
