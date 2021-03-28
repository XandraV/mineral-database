import React, { FC } from "react";
import Orthorhombic3D from "./Orthorhombic3D";
import Trigonal3D from "./Trigonal3D";
import Hexagonal3D from "./Hexagonal3D";
type System3DProps = {
  system: string;
};

const System3D: FC<System3DProps> = ({ system }) => (
  <>
    {system === "Orthorhombic" ||
      system === "Tetragonal" ||
      (system === "Isometric" && (
        <div id="system-3d">
          <Orthorhombic3D width={170} height={170} />
        </div>
      ))}
    {system === "Triclinic" ||
      system === "Monoclinic" ||
      (system === "Trigonal" && (
        <div id="system-3d">
          <Trigonal3D width={170} height={170} />
        </div>
      ))}
    {system === "Hexagonal" && (
      <div id="system-3d">
        <Hexagonal3D width={170} height={170} />
      </div>
    )}
  </>
);
export default System3D;
