import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { Button, Card } from "ui";

const BAR_WIDTH = 50;
const BAR_HEIGHT = 50;
const CHART_WIDTH = 600;
const CHART_HEIGHT = 150;

export default function Index() {
  const progressBarChartRef = useRef<HTMLDivElement | null>(null);

  const dataArray = [90, 80, 34, 75, 102, 68, 21, 8, 19, 104, 79];
  const dataArrayMax = Math.max(...dataArray);

  // Vertical bar graph
  useEffect(() => {
    if (!window || !progressBarChartRef) return;
    const progress = d3
      .select(progressBarChartRef.current)
      .selectAll("svg")
      .data(dataArray)
      .enter()
      .append("svg")
      .attr("class", "rounded-md")
      .attr("width", CHART_WIDTH)
      .attr("height", BAR_HEIGHT);

    progress
      .append("rect")
      .attr("class", "bg")
      .attr("fill", "#00000033")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", CHART_WIDTH)
      .attr("height", BAR_HEIGHT);

    console.log((CHART_WIDTH * dataArrayMax) / dataArrayMax);

    let max = d3.max(dataArray) || CHART_WIDTH;
    let scale = d3.scaleLinear().domain([0, 100]).range([0, max]);

    progress
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", d => scale(d))
      .attr("height", BAR_HEIGHT)
      .attr("fill", "#639");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <Card>
        <Card.Header title="Progress chart with D3" />
        <div className="flex justify-center align-center">
          <div ref={progressBarChartRef} className="m-8 gap-2 flex flex-col rounded"></div>
        </div>
      </Card>
      <Card>
        <Card.Header title="Card header" />
        <div className="h-36 w-36"></div>
        <div>
          <Button>Button</Button>
        </div>
      </Card>
    </div>
  );
}
