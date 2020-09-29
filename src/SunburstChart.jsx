import React, { useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Grid from "@material-ui/core/Grid";
// import SunburstBreadcrumbs from "./SunburstBreadcrumbs";
import { dataSunburst } from "./data/sunburstData";
// import { Hint, Sunburst } from "react-vis";
import styled from "styled-components/macro";
import * as d3 from "d3";

function SunburstChart() {
  const svgHeight = 380;
  const svgWidth = 380;
  const radius = Math.min(svgWidth, svgHeight) / 2;
  const partition = d3.partition().size([2 * Math.PI, radius]);
  const root = d3.hierarchy(dataSunburst).sum(function (d) {
    return d.size;
  });

  partition(root);
  const createArc = d3.arc();
console.log(root.descendants().length)
  const color = d3
  .scaleLinear()
  .domain([0, 15, 55])
  .range(["hsl(300, 100%, 87%)", "hsl(260, 100%, 75%)", "hsl(211, 100%, 89%)"]);

  return (
    <div>
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{
          overflow: "visible",
          transform: "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")",
        }}
      >
        {root.descendants().map((d, i) => (
          <g transform={`translate(${radius} ${svgWidth / 2})`}>
            <path
              className="arc"
              d={createArc({
                startAngle: d.x0,
                endAngle: d.x1,
                innerRadius: d.y0,
                outerRadius: d.y1,
              })}
              fill={i === 0 ? "none" : color(i)}
              style={{
                stroke: "#fff",
                display: d.depth == null ? "none" : "",
              }}
            />
          </g>
        ))}

        {/* <text
          transform={`translate(${createArc.centroid(data)})`}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="black"
          fontSize="10"
        >
          {"hi"}
        </text> */}
      </svg>
    </div>
  );
}
// const StyledHint = styled.div`
//   display: "flex";
//   color: black;
//   background: white;
//   align-items: "center";
//   padding: 5px;
//   border-radius: 5px;

//   .inner {
//     height: 10px;
//     width: 10px;
//   }
// `;

// const StyledAvatar = styled.div`
//   margin-top: -300px;
//   padding-left: 125px;
//   color: black;
//   position: absolute;
// `;

// function SunburstChart() {
//   const [hoveredCell, setHoveredCell] = useState(false);
//   const [hoveredParent, setHoveredParent] = useState(false);

//   return (
//     <Grid container spacing={2}>
//       <Grid item>
//         <Sunburst
//           hideRootNode
//           colorType="literal"
//           data={dataSunburst}
//           height={400}
//           width={450}
//           style={{
//             stroke: "#fff",
//             text: { color: "#ffffff" },
//           }}
//           onValueMouseOver={(v) => {
//             setHoveredCell(v.x && v.y ? v : false);
//             setHoveredParent(v.parent.data);
//           }}
//         >
//           {hoveredCell ? (
//             <Hint
//               value={{
//                 x: hoveredCell.x,
//                 y: hoveredCell.y,
//               }}
//             >
//               <StyledHint>
//                 <div className="inner" />
//                 {hoveredCell.title}
//               </StyledHint>
//             </Hint>
//           ) : null}
//         </Sunburst>
//         {hoveredCell ? <SunburstAvatar hoveredCell={hoveredCell} /> : null}
//       </Grid>
//       <Grid item>
//         <div>
//           {hoveredCell ? (
//             <SunburstBreadcrumbs
//               hoveredCell={hoveredCell}
//               hoveredParent={hoveredParent}
//             />
//           ) : null}
//         </div>
//       </Grid>
//     </Grid>
//   );
// }

// function SunburstAvatar(props) {
//   return (
//     <StyledAvatar>
//       <Avatar
//         alt="avatar"
//         src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${props.hoveredCell.title
//           .toString()
//           .toLowerCase()}.svg`}
//         style={{ width: 200, height: 200 }}
//       />
//     </StyledAvatar>
//   );
// }

export default SunburstChart;
