import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { Button, Card } from "ui";

const BAR_WIDTH = 50;
const BAR_HEIGHT = 50;
const CHART_WIDTH = 600;
const CHART_HEIGHT = 150;

export default function Index() {
  const verticalBarChartRef = useRef<SVGSVGElement | null>(null);
  const horizontalBarChartRef = useRef<SVGSVGElement | null>(null);
  const dataArray = [90, 80, 34, 75, 102, 68, 21, 8, 19, 104, 79];

  // Vertical bar graph
  useEffect(() => {
    if (!window || !verticalBarChartRef) return;
    d3.select(verticalBarChartRef.current)
      .selectAll("rect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * BAR_WIDTH)
      .attr("y", d => CHART_HEIGHT - d)
      .attr("height", d => d)
      .attr("width", BAR_WIDTH)
      .attr("stroke-width", "1px")
      .attr("stroke", "#369")
      .attr("fill", "#396");

    d3.select(horizontalBarChartRef.current)
      .selectAll("rect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("x", (d, i) => BAR_HEIGHT)
      .attr("y", (d, i) => i * BAR_HEIGHT)
      .attr("height", BAR_HEIGHT)
      .attr("width", d => d)
      .attr("stroke-width", "1px")
      .attr("stroke", "#369")
      .attr("fill", "#396");
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Card.Header title="Horizontal bar charts with D3" />
        <div className="flex justify-center align-center">
          <div className="m-8">
            <svg ref={horizontalBarChartRef} width={CHART_WIDTH} height={BAR_HEIGHT * dataArray.length - 1}></svg>
          </div>
        </div>
      </Card>
      <Card>
        <Card.Header title="Vertical bar charts with D3" />
        <div className="flex justify-center align-center">
          <div className="m-8">
            <svg ref={verticalBarChartRef} width={BAR_WIDTH * dataArray.length - 1} height={CHART_HEIGHT}></svg>
          </div>
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
