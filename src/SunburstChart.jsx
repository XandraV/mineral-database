import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { dataSunburst } from "./data/sunburstData";
import styled from "styled-components/macro";
import * as d3 from "d3";

const GroupBreadcrumb = styled.div`
  width: 7rem;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 1rem;
  padding: 0.4rem;
  background: ${(props) => props.color};
  margin-bottom: 0.3rem;
  text-align: center;
  :hover {
    box-shadow: 0px 0px 5px #00ffff;
    border: 1px solid #00ffff;

    @-webkit-keyframes vibrate-1 {
      0% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
      20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
      }
      40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
      }
      60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
      }
      80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
      }
      100% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
    }
    @keyframes vibrate-1 {
      0% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
      20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
      }
      40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
      }
      60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
      }
      80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
      }
      100% {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
    }
    -webkit-animation: vibrate-1 0.7s linear infinite both;
    animation: vibrate-1 0.7s linear infinite both;
  }
`;

const SubGroupBreadcrumb = styled.div`
  width: 4rem;
  color: white;
  font-size: 0.5rem;
  font-weight: bold;
  border-radius: 1rem;
  padding: 0.3rem;
  background: ${(props) => props.color};
  margin-bottom: 0.2rem;
  text-align: center;
`;

function SunburstChart() {
  const [selectedSubgroups, setSelectedSubgroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const svgHeight = 380;
  const svgWidth = 380;
  const radius = Math.min(svgWidth, svgHeight) / 2;
  const partition = d3.partition().size([2 * Math.PI, radius]);
  const root = d3.hierarchy(dataSunburst).sum(function (d) {
    return d.size;
  });

  partition(root);
  const createArc = d3.arc().cornerRadius(7);
  const groupLabels = root
    .descendants()
    .splice(1, 10)
    .map((d) => d.data.title);

  const color = d3
    .scaleLinear()
    .domain([0, 15, 55])
    .range([
      "hsl(300, 100%, 87%)",
      "hsl(260, 100%, 75%)",
      "hsl(211, 100%, 89%)",
    ]);

  function handleClick(group) {
    const parentGroup = dataSunburst.children.find((x) => x.title === group);
    setSelectedGroup(parentGroup.title);
    const childrenLabels = parentGroup.children.map((c) => c.title);
    setSelectedSubgroups(childrenLabels);
  }

  function fill(d, i) {
    const parentGroup = selectedGroup !== "";
    const parentGroupTitle = parentGroup && selectedGroup === d.data.title;
    const childGroups = selectedSubgroups.includes(d.data.title);
    if (i === 0) {
      return "none";
    }
    if (parentGroupTitle || childGroups) return color(i);
    if (parentGroup && !parentGroupTitle) return "#ededed";
    else return color(i);
  }

  return (
    <div>
      <Grid container spacing={9}>
        <Grid item>
          <SunburstAvatar selectedGroup={selectedGroup} />
          <svg
            width={svgWidth}
            height={svgHeight}
            style={{
              overflow: "visible",
              transform:
                "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")",
            }}
          >
            {root.descendants().map((d, i) => (
              <g
                key={`segment${i}`}
                transform={`translate(220 ${svgWidth / 2})`}
              >
                <path
                  className="arc"
                  d={createArc({
                    startAngle: d.x0,
                    endAngle: d.x1,
                    innerRadius: d.y0,
                    outerRadius: d.y1,
                  })}
                  fill={fill(d, i)}
                  style={{
                    stroke: "#fff",
                    display: d.depth == null ? "none" : "",
                  }}
                />
              </g>
            ))}
          </svg>
        </Grid>
        <Grid item style={{ maxHeight: 380 }}>
          <Grid container spacing={2}>
            <Grid item>
              {groupLabels.map((group, i) => (
                <GroupBreadcrumb
                  key={`maingroup-${i}`}
                  color={color(i)}
                  onClick={() => handleClick(group)}
                  style={{
                    boxShadow:
                      selectedGroup === group ? "0px 0px 5px #00ffff" : "",
                    border: selectedGroup === group ? "1px solid #00ffff" : "",
                  }}
                >
                  {group}
                </GroupBreadcrumb>
              ))}
            </Grid>
            <Grid item>
              {selectedSubgroups
                ? selectedSubgroups.map((group, i) => (
                    <SubGroupBreadcrumb
                      key={`subgroup-${i}`}
                      color={color(10 + i)}
                    >
                      {group}
                    </SubGroupBreadcrumb>
                  ))
                : ""}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function SunburstAvatar(props) {
  return (
    <Avatar
      alt="avatar"
      src={
        props.selectedGroup === ""
          ? "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          : `https://crystallizer.s3.eu-west-2.amazonaws.com/${props.selectedGroup.toLowerCase()}.svg`
      }
      style={{
        width: 100,
        height: 100,
        top: "13.5rem",
        left: "11.3rem",
        position: "absolute",
      }}
    />
  );
}

export default SunburstChart;
