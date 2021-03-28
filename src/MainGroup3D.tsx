import React, { FC } from "react";
import Group4OtherAtoms3D from "./Group4OtherAtoms3D";
import Group3OtherAtoms3D from "./Group3OtherAtoms3D";
import Group2OtherAtoms3D from "./Group2OtherAtoms3D";
import { getMainGroupColor } from "./helpers";
type GroupProps = {
  groupName: string;
};

const fourOtherAtoms = [
  "Silicates",
  "Arsenates",
  "Phosphates",
  "Sulfates",
  "Vanadates",
];
const threeOtherAtoms = ["Carbonates", "Borates", "Nitrates"];
const twoOtherAtoms = ["Sulfides", "Oxides"];

const MainGroup3D: FC<GroupProps> = ({ groupName }) => (
  <>
    {fourOtherAtoms.includes(groupName) && (
      <div
        id="maingroup-3d"
      >
        <Group4OtherAtoms3D
          color={getMainGroupColor(groupName)}
          width={170}
          height={170}
        />
      </div>
    )}

    {twoOtherAtoms.includes(groupName) && (
      <div
        id="maingroup-3d"
      >
        <Group2OtherAtoms3D
          color={getMainGroupColor(groupName)}
          width={170}
          height={170}
        />
      </div>
    )}

    {threeOtherAtoms.includes(groupName) && (
      <div
        id="maingroup-3d"
      >
        <Group3OtherAtoms3D
          width={170}
          height={170}
          color={getMainGroupColor(groupName)}
        />
      </div>
    )}
  </>
);
export default MainGroup3D;
