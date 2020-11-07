import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import StyledList from "./StyledList";
import Tooltip from "@material-ui/core/Tooltip";
import { dataSunburst } from "./data/sunburstdata";
import styled from "styled-components/macro";
import * as d3 from "d3";

const Wrapper = styled.div`
  .title {
    position: absolute;
    font-size: 0.5rem;
    margin-top: 3.8rem;
    margin-left: 3.2rem;
  }
  .title,
  path {
    @-webkit-keyframes roll-in-right {
      0% {
        -webkit-transform: translateX(800px) rotate(540deg);
        transform: translateX(800px) rotate(540deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0) rotate(0deg);
        transform: translateX(0) rotate(0deg);
        opacity: 1;
      }
    }
    @keyframes roll-in-right {
      0% {
        -webkit-transform: translateX(800px) rotate(540deg);
        transform: translateX(800px) rotate(540deg);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0) rotate(0deg);
        transform: translateX(0) rotate(0deg);
        opacity: 1;
      }
    }

    -webkit-animation: roll-in-right 1s ease-out both;
    animation: roll-in-right 1s ease-out both;
  }
`;

const GroupBreadcrumb = styled(ListItem)<any>`
  width: 4.5rem;
  height: 1rem;
  color: #83769a;
  background: #add8e66e;
  font-size: 0.5em;
  font-weight: bold;
  padding: 0.4rem;
  margin-bottom: 0.3rem;
  border-radius: 0.8rem;
  border: 1px solid white;
  :hover {
    background: ${(props) => props.color};
    box-shadow: 0px 0px 5px grey;
  }
`;

const SunburstChart = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubgroups, setSelectedSubgroups] = useState([""]);
  const svgHeight = 130;
  const svgWidth = 130;
  const radius = Math.min(svgWidth, svgHeight) / 2;
  const partition = d3.partition().size([2 * Math.PI, radius]);
  const root = d3.hierarchy(dataSunburst).sum((d: any) => {
    return d.size;
  });

  partition(root);
  const createArc = d3.arc().cornerRadius(7);
  const groupLabels = root
    .descendants()
    .splice(1, 10)
    .map((d) => d.data.title);

  const color = d3
    .scaleLinear<string>()
    .domain([0, 15, 55])
    .range(["rgb(255, 148, 189)", "hsl(211, 100%, 89%)", "#ecba70"]);

  const handleClick = (group: string) => {
    const parentGroup = dataSunburst.children.find((x) => x.title === group);
    if (selectedGroup === parentGroup!.title) {
      setSelectedGroup("");
      setSelectedSubgroups([]);
    } else {
      setSelectedGroup(parentGroup!.title);
      const childrenLabels = parentGroup!.children.map((c) => c.title);
      setSelectedSubgroups(childrenLabels);
    }
  };

  function fill(d: any, i: number) {
    const parentGroup = selectedGroup !== "";
    const parentGroupTitle = parentGroup && selectedGroup === d.data.title;
    const childGroups = selectedSubgroups.includes(d.data.title);
    if (i === 0) {
      return "none";
    }
    if (parentGroupTitle || childGroups) return color(i);
    if (parentGroup && !parentGroupTitle) return "transparent";
    else return color(i);
  }

  return (
    <Wrapper>
      <span className="title">Groups</span>
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{
          marginTop: 2,
          display: "inline-block",
          overflow: "visible",
          transform: "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")",
        }}
      >
        {root.descendants().map((d: any, i: number) => (
          <Tooltip
            key={`group-${i}`}
            title={`${d.data.title}`}
            aria-label="haha"
            placement={i < 5 || (i < 34 && i > 10) ? "right" : "left"}
            color={"white"}
          >
            <g
              key={`segment${i}`}
              transform={`translate(${svgHeight / 2} ${svgWidth / 2})`}
            >
              <path
                className="arc"
                d={
                  createArc({
                    startAngle: d.x0,
                    endAngle: d.x1,
                    innerRadius: d.y0,
                    outerRadius: d.y1,
                  })!
                }
                fill={fill(d, i)}
                style={{
                  stroke: "#fff",
                  display: d.depth == null ? "none" : "",
                }}
              />
            </g>
          </Tooltip>
        ))}
      </svg>
      <StyledList>
        {groupLabels.slice(0, 5).map((group: string, i: number) => (
          <GroupBreadcrumb
            key={`maingroup-${i}`}
            color={color(i)}
            onClick={() => handleClick(group)}
            style={{
              backgroundColor: `${selectedGroup === group && color(i)}`,
            }}
          >
            {group.toUpperCase()}
          </GroupBreadcrumb>
        ))}
      </StyledList>
      <StyledList>
        {groupLabels.slice(5, 10).map((group, i) => (
          <GroupBreadcrumb
            key={`maingroup-${i}`}
            color={color(i)}
            onClick={() => handleClick(group)}
            style={{
              backgroundColor: `${selectedGroup === group && color(i)}`,
            }}
          >
            {group.toUpperCase()}
          </GroupBreadcrumb>
        ))}
      </StyledList>
    </Wrapper>
  );
};

export default SunburstChart;
