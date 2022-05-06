import React, { useEffect, useRef } from "react";
import type { LineGraphProps } from "./LineGraph.types";
import * as d3 from "d3";

import "./LineGraph.css";
import { scaleDivergingLog } from "d3";

interface Point {
  x: number;
  y: number;
}

const data: Point[] = [
  { x: 0, y: 10 },
  { x: 1, y: 15 },
  { x: 2, y: 20 },
  { x: 3, y: 25 },
  { x: 4, y: 30 },
  { x: 5, y: 35 },
  { x: 6, y: 40 },
  { x: 7, y: 45 },
  { x: 8, y: 12 },
  { x: 9, y: 16 },
  { x: 10, y: 32 },
  { x: 11, y: 28 },
];

export function LineGraph({
  className,
  styles,
  ...props
}: LineGraphProps): JSX.Element {
  const dimensions = {
    width: 550,
    height: 550,
    margin: {
      top: 30,
      right: 30,
      bottom: 60,
      left: 60,
    },
  };

  const svgRef = useRef(null);
  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  useEffect(() => {
    if (!data) return;

    const xScale = d3
      .scaleLinear<Point | any>()
      .domain([
        (d3.min(data, d => d.x) ?? 0) - 1,
        (d3.max(data, d => d.x) ?? 0) + 1,
      ])
      .range([0, width]);

    const yScale = d3
      .scaleLinear<Point | any>()
      .domain([
        (d3.min(data, d => d.y) ?? 0) - 10,
        (d3.max(data, d => d.y) ?? 0) + 10,
      ])
      .range([0, height]);

    const svgEl = d3.select(svgRef.current);

    svgEl.selectAll("*").remove();

    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSize(-height + margin.bottom);

    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    xAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "blaack")
      .attr("font-size", "0.75rem");

    const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-width);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    yAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "black")
      .attr("font-size", "0.75rem");

    const line = d3
      .line<Point>()
      .curve(d3.curveBundle)
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    svg
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", d => "#639")
      .attr("stroke-width", 3)
      .attr("d", d => line(data));

    console.log(data.flatMap(d => [[d.x, d.y]]));
  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
}

export default LineGraph;
