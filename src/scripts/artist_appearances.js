import * as d3 from 'd3'
import autoComplete from 'autocomplete'
// import imgs from './../images/'
// d3.tip = d3Tip

const margin = { top: 50, left: 60, right: 60, bottom: 100 }
const width = 700 - margin.left - margin.right
const height = (3 / 7) * width - margin.top - margin.bottom

var t = d3
  .transition()
  .duration(1000)
  .ease(d3.easeLinear)

// let artists = [
//   'Drake',
//   'Future',
//   'Beyoncé',
//   'Frank Ocean',
//   'Nicki Minaj',
//   'Kanye West',
//   'Rihanna',
//   'Charli XCX',
//   'Rick Ross',
//   'Robyn'
// ]

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

// const input_form = d3
//   .select('#chart-3')
//   .append('input')
//   .attr('id', 'autoComplete')

const frame = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .call(responsivefy)

const svg = frame
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([200, 1])
  .range([0, width])

// const yPositionScale = d3
//   .scaleLinear()
//   .domain([0, 19])
//   .range([0, height])

const colorScale = d3.scaleSequential([2010, 2040], d3.interpolateRainbow)

Promise.all([
  d3.csv(require('../data/p4k_top200_2010.csv')),
  d3.csv(require('../data/artist_counts.csv'))
]).then(ready)

function ready([datapoints, artists]) {
  let artist_names = artists
    .sort(function(a, b) {
      const as = a.appearances + a.appearances_no_ft
      const bs = b.appearances + b.appearances_no_ft
      return as < bs ? 1 : as > bs ? -1 : 0
    })
    .map(d => d.artist)

  d3.select('#artistNames')
    .on('change', dropdownChange)
    .selectAll('option')
    .data(artist_names)
    .enter()
    .append('option')
    .attr('value', d => d)
    .text(d => d)

  svg
    // .select('.timeline')
    .append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', height / 2)
    .attr('y2', height / 2)
    .attr('stroke', 'grey')

  svg
    .append('text')
    .text('#200')
    .attr('id', 'worst')
    .attr('x', 0)
    .attr('y', height / 2)
    .attr('dy', 100)
    .attr('stroke', 'black')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'bottom')

  svg
    .append('text')
    .text('#1')
    .attr('id', 'best')
    .attr('x', width)
    .attr('y', height / 2)
    .attr('dy', 100)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'bottom')

  let songs = svg
    .selectAll('.song')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('x', d => xPositionScale(+d.rank))
    .attr('y', height / 2)
    .attr('class', 'song')
    .attr('width', width / 100)
    .attr('height', 0)
    .attr('fill', d => colorScale(d.year))
    .attr('stroke', 'black')
  // .style('opacity', 0)

  dropdownChange()
  // .style('opacity', 1)
}

function dropdownChange() {
  const new_artist = d3.select('#artistNames').property('value')
  d3.select('#artistName').text(new_artist)
  svg
    .selectAll('.song')
    .filter(function(d) {
      return d.artist === new_artist || d.features.includes(new_artist)
    })
    .transition()
    .duration(2000)
    .ease(d3.easeElastic)
    .attr('height', 0.8 * height)
    .attr('y', height * 0.1)

  svg
    .selectAll('.song')
    .filter(function(d) {
      return !(d.artist === new_artist || d.features.includes(new_artist))
    })
    .transition()
    .duration(300)
    .ease(d3.easeCubic)
    .attr('height', 0)
    .attr('y', height / 2)
  // .attr('y', d =>
  //   d.artist === new_artist || d.features.includes(new_artist)
  //     ? height * 0.1
  //     : height / 2
  // )
  // .attr('height', d =>
  //   d.artist === new_artist || d.features.includes(new_artist)
  //     ? 0.8 * height
  //     : 0
  // )
}
