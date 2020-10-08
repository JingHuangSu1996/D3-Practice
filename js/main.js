const d3 = require('d3');
const DEFAULT_DATA = [127, 61, 256, 71, 15, 23];

var result;

let execute = (myData = DEFAULT_DATA) => {
  let svg = d3.select('svg');
  // binding data using d3
  let bars = svg.selectAll('.bars').data(myData);

  // how do we handle new elements?
  // we start with transparent gray bars of width 0
  let newBars = bars
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (_, i) => i * 30 + 50)
    .attr('width', 0)
    .attr('height', 20)
    .style('opacity', 0)
    .classed('bars', true);

  // how do we handle things that are removed?
  // we increase opacity
  bars
    .exit()
    .style('opacity', 1)
    .transition()
    .duration(3000)
    .style('opacity', 0)
    .remove();

  console.log(newBars, bars);

  // we merge the new bars with existing one
  bars = newBars.merge(bars);

  console.log('----> after', bars);

  // how do we handle updates?
  // we transition towards a blue opaque bar with a data driven width
  bars
    .transition()
    .duration(3000)
    .attr('x', 0)
    .attr('y', (_, i) => i * 30 + 50)
    .attr('width', d => d)
    .attr('height', 20)
    .style('fill', 'aliceblue')
    .style('opacity', 1);
};

d3.select('#next').on('click', () =>
  execute([500, 100, 120])
);

execute();

console.log(result);
