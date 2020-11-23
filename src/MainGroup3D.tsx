import React, { FC } from "react";
import Group4OtherAtoms3D from "./Group4OtherAtoms3D";
import Group3OtherAtoms3D from "./Group3OtherAtoms3D";
import Group2OtherAtoms3D from "./Group2OtherAtoms3D";

type GroupProps = {
  groupName: string;
};

function getColor(groupName: string) {
  switch (groupName) {
    case "Silicates":
      return "#ff4081";
    case "Arsenates":
      return "#ffd54f";
    case "Phosphates":
      return "#aeea00";
    case "Sulfates":
      return "#eeff41";
    case "Vanadates":
      return "#ff8a65";
    case "Oxides":
      return "#448aff";
    case "Sulfides":
      return "#ffea00";
    case "Carbonates":
      return "#a1887f";
    case "Borates":
      return "#ff1744";
    case "Nitrates":
      return "#64ffda";
    default:
      return "lightgrey";
  }
}
//add borates to carbonates create mix

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
        style={{
          left: window.innerWidth / 3 - 90,
          top: 600 / 2 + 50,
          position: "absolute",
        }}
      >
        <Group4OtherAtoms3D
          color={getColor(groupName)}
          width={170}
          height={170}
        />
      </div>
    )}

    {twoOtherAtoms.includes(groupName) && (
      <div
        id="maingroup-3d"
        style={{
          left: window.innerWidth / 3 - 90,
          top: 600 / 2 + 25,
          position: "absolute",
        }}
      >
        <Group2OtherAtoms3D
          color={getColor(groupName)}
          width={170}
          height={170}
        />
      </div>
    )}

    {threeOtherAtoms.includes(groupName) && (
      <div
        id="maingroup-3d"
        style={{
          left: window.innerWidth / 3 - 90,
          top: 600 / 2 + 50,
          position: "absolute",
        }}
      >
        <Group3OtherAtoms3D
          width={170}
          height={170}
          color={getColor(groupName)}
        />
      </div>
    )}
  </>
);
export default MainGroup3D;
