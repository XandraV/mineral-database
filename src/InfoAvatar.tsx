import React, { FC } from "react";
import Avatar from "@material-ui/core/Avatar";

type AvatarProps = {
  width: number;
  height: number;
  top: number;
  left: number;
  keyWord: string;
};

const InfoAvatar: FC<AvatarProps> = ({ width, height, top, left, keyWord }) => {
  return (
    <Avatar
      alt="avatar"
      src={
        keyWord === ""
          ? "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          : `https://crystallizer.s3.eu-west-2.amazonaws.com/${keyWord.toLowerCase()}.svg`
      }
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        top: `${top}px`,
        left: `${left}px`,
        position: "absolute",
      }}
    />
  );
};

export default InfoAvatar;
