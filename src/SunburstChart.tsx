import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import { dataSunburst } from "./data/sunburstdata";
import styled from "styled-components/macro";
import * as d3 from "d3";

const Wrapper = styled.div`
  display: flex;
  span {
    margin: auto 10px auto auto;
  }
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
  && {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 20px;
    border: 1px solid white;
    transition: 0.3s;
    cursor: pointer;
    justify-content: center;

    :hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const svgSize = 300;

const color = d3
  .scaleLinear<string>()
  .domain([0, 5, 10, 11, 30, 55])
  .range([
    "rgba(170,135,244)",
    "rgba(240, 244, 239)",
    "rgba(170,135,244)",
    "rgba(211, 79, 115)",
    "rgba(170,135,244)",
    "rgba(211, 79, 115)",
  ]);

const createArc = d3.arc().cornerRadius(7);

const SunburstChart = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubgroups, setSelectedSubgroups] = useState([""]);
  const radius = Math.min(svgSize, svgSize) / 2;
  const partition = d3.partition().size([2 * Math.PI, radius]);
  const root = d3.hierarchy(dataSunburst).sum((d: any) => {
    return d.size;
  });

  partition(root);
  const groupLabels = root
    .descendants()
    .splice(1, 10)
    .map((d) => d.data.title);

  function fill(d: any, i: number) {
    const parentGroup = selectedGroup !== "";
    const parentGroupTitle = parentGroup && selectedGroup === d.data.title;
    const childGroups = selectedSubgroups.includes(d.data.title);
    if (i === 0) {
      return "none";
    }
    if (parentGroupTitle || childGroups) return color(i);
    if (parentGroup && !parentGroupTitle) return "rgba(255,255,255,0.2";
    else return color(i);
  }

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

  return (
    <Wrapper>
      <span>
        {groupLabels.slice(0, 5).map((group: string, i: number) => (
          <GroupBreadcrumb
            key={`maingroup-${i}`}
            color={color(i)}
            onClick={() => handleClick(group)}
            style={{
              backgroundColor: selectedGroup === group && color(i),
            }}
          >
            {group.toUpperCase()}
          </GroupBreadcrumb>
        ))}
      </span>
      <span>
        {groupLabels.slice(5, 10).map((group: string, i: number) => (
          <GroupBreadcrumb
            key={`maingroup-${i}`}
            color={color(i)}
            onClick={() => handleClick(group)}
            style={{
              backgroundColor: selectedGroup === group && color(i),
            }}
          >
            {group.toUpperCase()}
          </GroupBreadcrumb>
        ))}
      </span>

      <svg
        width={svgSize}
        height={svgSize}
        style={{
          marginTop: 2,
          display: "inline-block",
          overflow: "visible",
          transform: "translate(" + svgSize / 2 + "," + svgSize / 2 + ")",
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
              transform={`translate(${svgSize / 2} ${svgSize / 2})`}
            >
              <path
                className="arc"
                d={
                  createArc({
                    startAngle: d.x0 + 0.01,
                    endAngle: d.x1 - 0.01,
                    innerRadius: d.y0,
                    outerRadius: d.y1 - 5,
                  })!
                }
                style={{
                  display: d.depth == null ? "none" : "",
                }}
                fill={i === hovered ? "#FFFAF3" : fill(d, i)}
                onMouseOver={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            </g>
          </Tooltip>
        ))}
      </svg>
    </Wrapper>
  );
};

export default SunburstChart;
