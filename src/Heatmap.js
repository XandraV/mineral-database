import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { heatmapData } from "./heatmapdata";
import { scaleLinear } from "d3-scale";
import {
  XYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  LabelSeries,
  Hint
} from "react-vis";

class LabeledHeatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }

  render() {
    const heatMapLabelsX = [
      "H",
      "C",
      "N",
      "O",
      "F",
      "P",
      "S",
      "K",
      "I",
      "Na",
      "Mg",
      "Al",
      "Si",
      "Cl",
      "Ca",
      "V",
      "Cr",
      "Mn",
      "Fe",
      "Cu",
      "Zn",
      "As",
      "Zr",
      "Mo"
    ];

    const heatMapLabelsY = heatMapLabelsX;
    const data = heatMapLabelsX.reduce((acc, letter1, idx) => {
      return acc.concat(
        heatMapLabelsY.map((letter2, jdx) => ({
          x: `${letter2}1`,
          y: `${letter1}2`,
          cellValue: heatmapData.find(
            el => el.x === `${letter1}1` && el.y === `${letter2}2`
          ).cellValue,
          color: heatmapData.find(
            el => el.x === `${letter1}1` && el.y === `${letter2}2`
          ).cellValue
        }))
      );
    }, []);

    const { min, max } = data.reduce(
      (acc, row) => ({
        min: Math.min(acc.min, row.color),
        max: Math.max(acc.max, row.color)
      }),
      { min: Infinity, max: -Infinity }
    );
    const { value } = this.state;
    const exampleColorScale = scaleLinear()
      .domain([min, (min + max) / 2, max])
      .range(["lightBlue", "pink", "orange"]);

    if (this.props.mineral != null) {
      const results3 = [];
      const myarray2 = this.props.mineral.formula;
      for (var i = 0; i < myarray2.length - 1; i++) {
        for (var j = i + 1; j < myarray2.length; j++) {
          results3.push([
            myarray2[i].replace(/,/g, ""),
            myarray2[j].replace(/,/g, "")
          ]);
        }
      }

      const indecesArray = [];
      for (const item of results3) {
        indecesArray.push(
          data.reduce(
            (arr, ob, i) => (
              ((ob.x.split(/(\d+)/)[0] === item[0] &&
                ob.y.split(/(\d+)/)[0] === item[1]) ||
                (ob.y.split(/(\d+)/)[0] === item[0] &&
                  ob.x.split(/(\d+)/)[0] === item[1])) &&
                arr.push(i),
              arr
            ),
            []
          )
        );
      }
      const finalIndecesArray = indecesArray.filter(Boolean).flat();

      data.forEach(function(element) {
        if (
          finalIndecesArray.includes(data.indexOf(element)) &&
          element.color !== 0
        ) {
          element.color = 1500;
          element.color = 1500;
        } else {
          element.color = 0;
          element.cellValue = "";
        }
      });
    }
    return (
      <XYPlot
        xType="ordinal"
        xDomain={heatMapLabelsX.map(letter => `${letter}1`)}
        yType="ordinal"
        yDomain={heatMapLabelsY.map(letter => `${letter}2`).reverse()}
        margin={40}
        width={800}
        height={800}
      >
        <XAxis
          orientation="top"
          tickFormat={t => {
            return `${t.split(/(\d+)/)[0]}`;
          }}
        />
        <YAxis
          tickFormat={t => {
            return `${t.split(/(\d+)/)[0]}`;
          }}
        />
        <HeatmapSeries
          colorType="literal"
          getColor={d => exampleColorScale(d.color)}
          style={{
            stroke: "white",
            strokeWidth: "2px",
            rectStyle: {
              rx: 10,
              ry: 10
            }
          }}
          className="heatmap-series-example"
          data={data}
          onValueMouseOver={v => this.setState({ value: v })}
          onSeriesMouseOut={v => this.setState({ value: false })}
        />
        <LabelSeries
          style={{ pointerEvents: "none" }}
          data={data}
          labelAnchorX="middle"
          labelAnchorY="baseline"
          getLabel={d => `${d.cellValue}`}
        />
        {value ? (
          <Hint value={value}>
            <HintContentHeatMap value={value} />
          </Hint>
        ) : null}
      </XYPlot>
    );
  }
}

export function HintContentHeatMap({ value }) {
  const { x, y, color } = value;
  if (color !== 0) {
    return (
      <div>
        {hintRowHeatMap({
          numberOfMinerals: color,
          components: `${x.split(/(\d+)/)[0]} and ${y.split(/(\d+)/)[0]}`
        })}
        ,
      </div>
    );
  } else {
    return null;
  }
}

function hintRowHeatMap({ numberOfMinerals, components }) {
  return (
    <Paper
      style={{
        backgroundColor: "rgb(105,105,105)",
        alignItems: "center",
        borderRadius: 4,
        padding: 8,
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
      }}
    >
      <div style={{ fontSize: "12px", color: "white" }}>
        {numberOfMinerals}
        {numberOfMinerals > 1 ? " minerals" : " mineral"}
        {" contain"}
      </div>
      <div style={{ fontSize: "12px", color: "white" }}>{components}</div>
    </Paper>
  );
}

export default LabeledHeatmap;
