import * as d3 from 'd3'
import d3Tip from 'd3-tip'
// import imgs from './../images/'
d3.tip = d3Tip

const margin = { top: 50, left: 60, right: 60, bottom: 50 }
const width = 700 - margin.left - margin.right
const height = (4 / 7) * width - margin.top - margin.bottom

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

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .call(responsivefy)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleBand()
  .range([0, width])
  .paddingInner(0)
  .paddingOuter(0.1)
const colorScale = d3.scaleSequential([2010, 2019], d3.interpolateRainbow)

Promise.all([d3.csv(require('../data/p4k_top200_2010.csv'))]).then(ready)

function ready([datapoints]) {
  let nested = d3
    .nest()
    .key(d => +d.year)
    .entries(datapoints)

  let numbers = d3.range(d3.max(nested, d => d.values.length))

  let stackedYears = d3
    .stack()
    .keys(numbers)
    .value((d, i) => (i < d.values.length ? 1 : 0))(nested)

  var xPositionScale = d3
    .scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1)

  var yPositionScale = d3.scaleLinear().rangeRound([height, 0])

  xPositionScale.domain(
    nested
      .map(function(d) {
        return d.key
      })
      .sort()
  )
  yPositionScale.domain([0, d3.max(nested, d => d.values.length)]).nice()

  colorScale.domain([0, 30])

  svg
    .append('g')
    .selectAll('g')
    .data(stackedYears)
    .enter()
    .append('g')
    .attr('stroke', 'white')
    .selectAll('rect')
    .data(function(d, i) {
      return d
    })
    .enter()
    .append('rect')
    .attr('x', function(d) {
      return xPositionScale(d.data.key)
    })
    .attr('y', function(d) {
      return yPositionScale(d[1])
    })
    .attr('height', function(d) {
      return yPositionScale(d[0]) - yPositionScale(d[1])
    })
    .attr('width', xPositionScale.bandwidth())
    .attr('class', d => 'y' + d.data.key)
    .attr('fill', function(d) {
      return colorScale(+d.data.key)
    })

  d3.selectAll('rect').each(function(d, i) {
    const idx = Math.floor(i / 10)
    d3.select(this).attr(
      'id',
      idx < d.data.values.length
        ? d.data.values[idx].song.replace(/ |\.|\[|\]/g, '').toLowerCase()
        : ''
    )
  })

  const yAxis = d3
    .axisRight(yPositionScale)
    .tickValues([5, 10, 15, 20, 25, 28])
    .tickSize(width)
  svg
    .append('g')
    .lower()
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .selectAll('.tick line')
    .attr('stroke', 'grey')
    .attr('stroke-width', 3)
    .style('stroke-dasharray', '1 5')
    .lower()

  svg.selectAll('.tick text').attr('font-size', 14)

  const xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  svg.selectAll('.domain').style('opacity', 0)
  svg.selectAll('g.axis.x-axis line').style('opacity', 0)
  svg
    .selectAll('g.axis.x-axis text')
    .data(stackedYears)
    .attr('fill', (_, i) => colorScale(i))
    .attr('font-size', 14)

  var windowWidth = parseInt(
    d3.select(svg.node().parentNode.parentNode).style('width')
  )

  if (windowWidth > 600) {
    Promise.all([require('../images/covers/*.jpg')]).then(doTooltips)
  } else {
    Promise.all([require('../images/covers/*.jpg')]).then(doSmallTTs)
  }
}

function doTooltips([imgs]) {
  let updated = d3
    .selectAll('rect')
    .data()
    .map(function(d, i) {
      return {
        0: d[0],
        1: d[1],
        year: d.data.key,
        data: d.data.values[Math.floor(i / 10)]
      }
    })

  let tip = d3
    .tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
      const s = d.data.song
      const a = d.data.artist
      const r = d.data.rank
      const i = imgs[r]

      return `<p class='important'>${s} by ${a}</p><p>(Rank #${r})</p><img src="${i}">`
    })

  /* Invoke the tip in the context of your visualization */
  svg.call(tip)
  svg
    .selectAll('rect')
    .data(updated)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}

function doSmallTTs([imgs]) {
  let updated = d3
    .selectAll('rect')
    .data()
    .map(function(d, i) {
      return {
        0: d[0],
        1: d[1],
        year: d.data.key,
        data: d.data.values[Math.floor(i / 10)]
      }
    })

  let tip = d3
    .tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
      const s = d.data.song
      const a = d.data.artist
      const r = d.data.rank
      const i = imgs[r]

      return `<p class='important'>${s} by ${a}</p><p>(Rank #${r})</p><img src="${i}">`
    })
    .style('left', function(d) {
      return '0px'
    })
    .style('top', '0px')

  /* Invoke the tip in the context of your visualization */
  svg.call(tip)
  svg
    .selectAll('rect')
    .data(updated)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}
