const d3 = require('d3');
const DEFAULT_DATA = [
  0.3,
  -0.8,
  0.01,
  -0.4,
  1.2,
  1.3,
  -0.2,
  -1.2,
  0.82,
  0.4,
  -0.2,
  0.3,
];

var result;

const HEIGHT = 400;
const WIDTH = 800;
const PADDING = 25;

/**
 * Axes
 *
 * Drawing Axes and legends is critical for data visualization
 * All of our examples, with the exception of the labelled bar
 * charts didn't really tell us about the abs values of the data
 * However Drawing axes well can be a lot of work. Fortunately
 * D3 has extnesive support for axes
 *
 *
 * this worked, we create a new axes by calling d3.axisBottom()
 *
 * ant tell it its value range by passing the relevant scale
 * We then append the scale to the svg with this call
 * `svg.append('g').call(xAxis)`, Now we can see that it
 * overlaps with our bar charts and that some of the number are cloase to the
 * edge of svg, To fix this we have to style the chart and add some margin
 *
 */
let execute = (myData = DEFAULT_DATA) => {
  const svg = d3
    .select('svg')
    .attr('width', WIDTH + 2 * PADDING)
    .attr('height', HEIGHT + 2 * PADDING);
  svg
    .append('rect')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr('transform', `translate(${PADDING}, ${PADDING})`)
    .style('stroke', 'none')
    .style('fill', '#eeeeee');

  let spacing = HEIGHT / myData.length;

  let min = d3.min(myData);
  let max = d3.max(myData);

  let xScale = d3
    .scaleLinear()
    .domain([min, max])
    .range([0, 800])
    .nice();

  let colorScale = d3
    .scaleLinear()
    .domain([min, 0, max])
    .range(['darkred', 'lightgray', 'aliceblue']);

  // create a new axis that has the ticks and labels on the bottom
  let xAxis = d3.axisBottom();

  // assign the scale to the axis
  xAxis.scale(xScale);

  svg
    .selectAll('rect')
    .data(myData)
    .enter()
    .append('rect')
    .attr('transform', `translate(${PADDING}, ${PADDING})`)
    .attr('x', d => xScale(Math.min(0, d))) // start at d if d is negative, else start at 0
    .attr('y', (_, i) => i * spacing + 5)
    .attr('width', d => {
      console.log(xScale(d), xScale(0));
      return Math.abs(xScale(d) - xScale(0));
    })
    .attr('height', 20)
    .style('fill', d => colorScale(d));

  svg
    .append('g')
    .classed('axis', true)
    .attr(
      'transform',
      `translate(${PADDING}, ${HEIGHT + PADDING})`
    )
    .call(xAxis);
};

execute();

console.log(result);
