import React, { FC } from "react";
import Orthorhombic3D from "./Orthorhombic3D";
type System3DProps = {
  system: string;
};

const System3D: FC<System3DProps> = ({ system }) => (
  <>
    {system === "" && (
      <div
        id="system-3d"
        style={{
          top: 600 / 2 + 70,
          left: window.innerWidth / 3 + 230,
          position: "absolute",
        }}
      >
        <Orthorhombic3D width={170} height={170} />
      </div>
    )}
  </>
);
export default System3D;
