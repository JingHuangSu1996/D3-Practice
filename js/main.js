const d3 = require('d3');
const DEFAULT_DATA = [0.01, 0.3, 0.01, 1.5, 2];

var result;

let execute = (myData = DEFAULT_DATA) => {
  let svg = d3.select('svg');

  const myScale = d3
    .scaleLinear()
    .domain([0, 1.5]) // domain defines the values that we expect in out dataset
    .range([0, 500])
    .clamp(true); // the range defines which output values we want from the scale.

  /**
   * Clamping
   *
   * What happens when you plot a value that's larger than your domain?
   * When it's feasible. you will get a value based on your mapping function
   * but it will exceed your screen coordinates, There is a way to avoid overplotting
   * by using `Clamping`, by manually assigning every value larger than the
   * extend of your domain to the max value of the domain. This can be very
   * helpful, but should always be done with care, you need to highlight
   * that you've broken the scale somehow.
   */
  svg
    .selectAll('rect')
    .data(myData)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (_, i) => i * 50 + 50)
    .attr('width', d => {
      console.log(myScale(d));
      return myScale(d);
    })
    .attr('height', 20)
    .style('fill', 'aliceblue');
};

execute();

console.log(result);
