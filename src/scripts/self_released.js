import * as d3 from 'd3'
// import d3Tip from 'd3-tip'
// import imgs from './../images/'
// d3.tip = d3Tip

const margin = { top: 50, left: 60, right: 60, bottom: 100 }
const width = 700 - margin.left - margin.right
const height = (7 / 7) * width - margin.top - margin.bottom

var t = d3
  .transition()
  .duration(1000)
  .ease(d3.easeLinear)

let labels = [
  'Self-released',
  'Columbia',
  'Interscope',
  'XL',
  'RCA',
  'Republic',
  'Def Jam',
  'Cash Money',
  'Epic'
]

function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style('width')),
    height = parseInt(svg.style('height')),
    aspect = width / height

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('perserveAspectRatio', 'xMinYMid')
    .call(resize)

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on('resize.' + container.attr('id'), resize)

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style('width'))
    svg.attr('width', targetWidth)
    svg.attr('height', Math.round(targetWidth / aspect))
    // svg.selectAll('.d3-tip').style('max-width', targetWidth / 2)
  }
}

const frame = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .call(responsivefy)
const svg = frame
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const bottom = frame
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top + height})`)

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 9])
  .range([0, width])
// .padding(0.01)

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 19])
  .range([0, height])
// .padding(0.01)
// const cDom = d3.range(0, 1, 0.1).map(d3.interpolateSinebow)
// console.log(cDom)
// const colorScale = d3
//   .scaleOrdinal()
//   .domain(labels)
//   .range(cDom)

const colorScale = d3.scaleSequential([2010, 2040], d3.interpolateRainbow)

Promise.all([d3.csv(require('../data/top200_labels.csv'))]).then(ready)

function ready([datapoints]) {
  // console.log(colorScale.range())
  let gs = svg
    .selectAll('.song')
    .data(datapoints)
    .enter()
    .append('g')

  gs.append('circle')
    // .attr('cx', d => xPositionScale(Math.floor((+d.rank - 1) / 20)))
    .attr('cx', d => xPositionScale((+d.rank - 1) % 10))
    .attr('cy', d => yPositionScale(Math.floor((+d.rank - 1) / 10)))
    .attr('r', width / 50)
    .attr('fill', 'lightgrey')
    .attr('stroke', 'grey')
    .style('opacity', 0.4)
  // .text(d => d.rank)

  gs.append('text')
    .attr('x', d => xPositionScale((+d.rank - 1) % 10))
    .attr('y', d => yPositionScale(Math.floor((+d.rank - 1) / 10)))
    // .attr('dy', width / 100)
    .text(d => `${d.rank}`)
    .attr('font-size', width / 50)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .style('opacity', '0')

  gs.on('mouseover', function() {
    d3.select(this)
      .select('text')
      .style('opacity', '1')
  })

  gs.on('mouseleave', function() {
    d3.select(this)
      .select('text')
      .transition()
      .duration(300)
      .style('opacity', '0')
  })

  bottom
    .append('text')
    .attr('id', 'label')
    .attr('x', width / 2)
    .attr('y', margin.bottom / 2)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', margin.bottom * 0.5)
  circleTransition(0)
}

let idx = 1
d3.interval(function() {
  circleTransition(idx)
  idx = (idx + 1) % labels.length
}, 3000)

function circleTransition(idx) {
  let newOnes = svg.selectAll('g').filter(function(d) {
    return [d[0], d[1], d[2]].includes(labels[idx])
  })

  let oldOnes = svg.selectAll('g').filter(function(d) {
    return ![d[0], d[1], d[2]].includes(labels[idx])
  })

  bottom
    .select('#label')
    .transition(t)
    .duration(1000)
    .on('start', function() {
      var t = d3
        .active(this)
        .style('opacity', 0)
        .remove()
      d3.select(this)
        .style('opacity', 0)
        .text(`${labels[idx]} (${newOnes._groups[0].length} songs)`)
        .transition(t)
        .style('opacity', 1)
        .transition()
        .delay(1000)
    })

  newOnes
    .select('circle')
    .transition(t)
    .duration(1000)
    .attr('fill', d => colorScale(d.year))
    .style('opacity', 1) // position the circle at 40 on the x axis
  // .attr('cy', 250) // position the circle at 250 on the y axis

  oldOnes
    .select('circle')
    .attr('fill', 'lightgrey')
    .style('opacity', 0.4)
}
