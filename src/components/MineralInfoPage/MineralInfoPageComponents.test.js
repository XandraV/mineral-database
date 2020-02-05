import React from "react";
import {
  SubGroupInfo,
  SystemInfo,
  GroupInfo,
  SpecificGravityInfo,
  GroupCircle
} from "./MineralInfoPageComponents";
import renderer from "react-test-renderer";

const testMineral = require("./../../data.json").minerals[0];
const testImage = `https://crystallizer.s3.eu-west-2.amazonaws.com/yellow.svg`;

describe(`Info page canvas element `, () => {
  it("group circle matches snapshot.", () => {
    const groupCircle = renderer.create(
      <GroupCircle
        mineralGroupImage={testImage}
        chosenCreatedMineral={testMineral}
      />
    );
    expect(groupCircle.toJSON()).toMatchSnapshot();
  });

  it("sub-group popup matches snapshot.", () => {
    const subGroupPopUp = renderer.create(<SubGroupInfo />);
    expect(subGroupPopUp.toJSON()).toMatchSnapshot();
  });

  it("group popup matches snapshot.", () => {
    const groupPopUp = renderer.create(<GroupInfo />);
    expect(groupPopUp.toJSON()).toMatchSnapshot();
  });

  it("systemInfo popup matches snapshot.", () => {
    const systemInfoPopUp = renderer.create(<SystemInfo />);
    expect(systemInfoPopUp.toJSON()).toMatchSnapshot();
  });

  it("specific gravity popup matches snapshot.", () => {
    const gravityPopUp = renderer.create(<SpecificGravityInfo />);
    expect(gravityPopUp.toJSON()).toMatchSnapshot();
  });
});
