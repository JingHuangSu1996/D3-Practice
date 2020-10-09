/**
 * Groupings: Handling Nested Elements
 *
 * In many cases we want to apply data not directly to low-level SVG elements
 * but instead use a hierachy of elements. For the bar chart, for example
 * we might want to add a label showing the actual value, there are two
 * approaches to doing this.
 *
 * 1. Laying out the numbers and the bars independently so that they match up.
 * 2. Using a group element to define the commonalities between the bars and the number.
 *
 * The latter is the better approach, as we only have to define the
 * common aspects of the group once, This might not make much of
 * difference for labels and bars, but we could also add tick marks
 * on the bar charts, an overlay for highlights
 */
const d3 = require('d3');
const DEFAULT_DATA = [127, 61, 256, 71, 15, 23];

var result;

let execute = (myData = DEFAULT_DATA) => {
  let svg = d3.select('svg');
  let barHeight = 30;

  let barGroups = svg.selectAll('.barGroup').data(myData);

  /**
   * ==================================
   *             Initialize
   * ==================================
   */

  // append new g element for each data point
  let barGroupsEnter = barGroups
    .enter()
    .append('g')
    .classed('barGroup', true);

  // appending and initializing the rects
  barGroupsEnter
    .append('rect')
    .attr('width', 0)
    .attr('height', 20)
    .style('fill', 'gray');

  // appending empty text elements
  barGroupsEnter.append('text');

  // taking care of removeing element
  barGroups
    .exit()
    .style('opacity', 1)
    .transition()
    .duration(3000)
    .style('opacity', 0)
    .remove();

  // merge selections
  barGroups = barGroups.merge(barGroupsEnter);

  // ==== takeing care of update ====
  barGroups.attr(
    'transform',
    (_, i) => `translate(0, ${i * barHeight})`
  );

  barGroups
    .select('rect')
    .transition()
    .duration(3000)
    .attr('width', d => d)
    .style('fill', 'aliceblue')
    .attr('opacity', 1);

  barGroups
    .select('text')
    .attr('transform', d => `translate(${d + 5}, 0)`)
    .text(d => d)
    .attr('dy', barHeight / 2)
    .attr('opacity', 0)
    .transition()
    .delay(2000)
    .duration(1000)
    .attr('opacity', 1);
};

d3.select('#next').on('click', () =>
  execute([500, 100, 120])
);

execute();

console.log(result);
