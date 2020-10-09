const d3 = require('d3');
console.log(colorbrewer);

let DEFAULT_DATA = [
  {
    product: 'Apples',
    tons: 10123,
    type: 'fruit',
  },
  {
    product: 'Bananas',
    tons: 12000,
    type: 'fruit',
  },
  {
    product: 'Plums',
    tons: 8441,
    type: 'fruit',
  },
  {
    product: 'Bread',
    tons: 1911,
    type: 'grocery',
  },
  {
    product: 'Cereals',
    tons: 1011,
    type: 'grocery',
  },
  {
    product: 'Beer',
    tons: 9011,
    type: 'alcohol',
  },
  {
    product: 'Wine',
    tons: 8041,
    type: 'alcohol',
  },
];

const types = ['grocery', 'fruit', 'alcohol'];

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

var result;

/**
 *
 * More Complex data
 *
 * 1. How to access data in objects
 * 2. How to sort data
 * 3. How to properly deal with padding in an SVG.
 * 4. How to use a scale with bands to evenly space the bars
 * 5. How to update a scale
 * 6. How to ensure object consistency for transition
 * with the key function of data mapping
 */
let svg = d3
  .select('#chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr(
    'transform',
    `translate(${margin.left}, ${margin.top})`
  );

let execute = (data = DEFAULT_DATA) => {
  const textWidth = 80;
  const animationDuration = 2000;
  const max = d3.max(data, d => d.tons);
  const colorScale = d3
    .scaleOrdinal()
    .domain(types)
    .range(colorbrewer.Accent[4]);

  const xScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([0, width - textWidth])
    .nice();

  const yScale = d3
    .scaleBand()
    .range([0, height])
    .padding(0.1);

  xAxis = d3.axisBottom();
  xAxis.scale(xScale);

  svg
    .append('g')
    .classed('axis', true)
    .attr('transform', `translate(${textWidth},${height})`)
    .call(xAxis);

  // here we update the yscale and set the domain to `product`
  yScale.domain(data.map(d => d.product));

  let barGroups = svg
    .selectAll('.barGroup')
    /**
     * here we tell D3 how to know which objects are the
     * same thing between updates
     */
    .data(data, function (d) {
      return d.product;
    });

  /**
   * ===================
   *       Enter
   * ===================
   */
  let barGroupsEnter = barGroups
    .enter()
    .append('g')
    .classed('barGroup', true)
    .attr('transform', d => {
      console.log(`translate(0, ${yScale(d.product)})`);
      return `translate(0, ${yScale(d.product)})`;
    });

  // entering with transparent text and rects of width 0
  barGroupsEnter.append('text').attr('opacity', 0);
  barGroupsEnter.append('rect').attr('width', 0);

  // remove
  barGroups.exit().remove();

  barGroups = barGroups.merge(barGroupsEnter);

  barGroups
    .select('text')
    .text(d => d.product)
    .attr('x', textWidth - 10)
    .attr('dy', yScale.bandwidth() / 2)
    .attr('text-anchor', 'end')
    .attr('alignment-baseline', 'middle')
    .transition()
    .duration(animationDuration)
    .attr('opacity', 1);

  barGroups
    .select('rect')
    .attr('x', textWidth)
    .attr('height', yScale.bandwidth())
    .style('fill', function (d) {
      return colorScale(d.type);
    })
    .transition()
    .duration(animationDuration)
    .attr('width', function (d) {
      return xScale(d.tons);
    });

  barGroups
    .transition()
    .duration(animationDuration)
    .attr('transform', function (d) {
      return `translate(0, ${yScale(d.product)})`;
    });
};

d3.select('#sort-select').on('change', function (e) {
  console.log(e);
  let active = e.target.value;
  DEFAULT_DATA = DEFAULT_DATA.sort(function (a, b) {
    switch (active) {
      case 'product':
      // fall through to type
      case 'type':
        if (a[active] < b[active]) {
          return -1;
        } else if (a[active] > b[active]) {
          return 1;
        } else {
          return 0;
        }

      case 'weight':
        return b.tons - a.tons;

      default:
        return b.tons - a.tons;
    }
  });
  execute();
});
console.log(result);
