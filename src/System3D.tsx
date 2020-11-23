import React, { FC } from "react";

type System3DProps = {
  system: string;
};

const System3D: FC<System3DProps> = ({ system }) => (
  <>
    {system === "" && (
      <div
        id="system-3d"
        style={{
          top: 600 / 2 + 60,
          left: window.innerWidth / 3 + 240,
          position: "absolute",
        }}
      >
        {/* <Group4OtherAtoms3D
          width={170}
          height={170}
        /> */}
      </div>
    )}
  </>
);
export default System3D;
