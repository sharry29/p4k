import * as d3 from 'd3'
import autoComplete from 'autocomplete'
// import imgs from './../images/'
// d3.tip = d3Tip

const margin = { top: 50, left: 60, right: 60, bottom: 100 }
const width = 700 - margin.left - margin.right
const height = (4 / 7) * width - margin.top - margin.bottom

const RESTING_WIDTH = width / 50
d3.selection.prototype.moveToFront = function() {
  return this.each(function() {
    this.parentNode.appendChild(this)
  })
}
var t = d3
  .transition()
  .duration(1000)
  .ease(d3.easeLinear)

const top_artists = [
  'Drake (7 appearances)',
  'Beyoncé (5 appearances)',
  'Frank Ocean (4 appearances)',
  'Nicki Minaj (4 appearances)',
  'Kanye West (4 appearances)',
  'Rihanna (4 appearances)',
  'Future (3 appearances)',
  'Charli XCX (3 appearances)',
  'Rick Ross (3 appearances)',
  'Robyn (3 appearances)'
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
  let bottom_artist_names = artists
    // .filter(d => !top_artists.includes(d.artist))
    .sort(function(a, b) {
      // const as = a.appearances + a.appearances_no_ft
      // const bs = b.appearances + b.appearances_no_ft
      const as = a.artist.toLowerCase()
      const bs = b.artist.toLowerCase()
      return as > bs ? 1 : as < bs ? -1 : 0
    })
    .map(
      d =>
        d.artist +
        ` (${d.appearances} appearance${d.appearances == 1 ? '' : 's'})`
    )
  let artist_names = top_artists.concat(bottom_artist_names)

  d3.select('#artistNames')
    .on('change', dropdownChange)
    .selectAll('option')
    .data(artist_names)
    .enter()
    .append('option')
    .attr('value', d => d.split('(')[0])
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

  svg
    .append('text')
    .text('')
    .attr('id', 'songLabel')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom / 2)
    .attr('text-anchor', 'middle')

  let songs = svg
    .selectAll('g')
    .data(datapoints)
    .enter()
    .append('g')
    .attr('class', 'song')
    .attr(
      'transform',
      d => `translate(${xPositionScale(+d.rank)}, ${height * 0.1})`
    )

  songs
    .append('text')
    // .attr('x', d => xPositionScale(+d.rank))
    // .attr('y', height * 0.1)
    .attr('dy', -10)
    .attr('dx', width / 100)
    .text(d => `#${d.rank}`)
    .attr('transform', 'rotate(-35)')
    .attr('text-anchor', 'right')
    .attr('font-size', 11)
    .style('opacity', 0)

  let song_windows = songs.append('g')
  song_windows
    .append('image')
    .attr('height', height * 0.9)
    .attr('y', -height * 0.05)
    .attr('width', 0)
    .attr('x', -width / 10)

  song_windows
    .append('rect')
    // .attr('x', d => xPositionScale(+d.rank))
    .attr('y', height / 2)
    .attr('width', RESTING_WIDTH)
    .attr('height', 0)
    .attr('fill', d => colorScale(d.year))
    .attr('stroke', 'white')

  song_windows
    .on('mouseenter', function(d) {
      console.log('hello')
      const curr = d3
        .select(this)
        .select('rect')
        .attr('x')

      d3.select(this.parentNode).raise()

      d3.select(this)
        .select('rect')
        .transition()
        .duration(100)
        .ease(d3.easeLinear)
        .attr('width', width / 4)
        .attr('x', curr - width / 8)
        .attr('height', height * 0.95)
        .attr('y', -height * 0.05)
        .on('end', function() {
          d3.select(this.parentNode)
            .select('image')
            .raise()
            .attr('x', -width / 10)
            .attr('width', width / 5)
            .attr('xlink:href', d => d.img_link)
        })

      d3.select('#songLabel').text(`${d.song} (${d.year})`)
    })
    .on('mouseleave', function(d) {
      // d3.select(this.parentNode).lower()
      d3.select(this)
        .select('rect')
        .transition()
        .duration(100)
        .attr('x', 0)
        .attr('height', height * 0.8)
        .attr('y', 0)
        .attr('width', RESTING_WIDTH)

      d3.select(this.parentNode)
        .select('image')
        .transition()
        .duration(100)
        .attr('width', 0)
        .attr('x', 0)
        .on('end', function() {
          d3.select(this)
            .lower()
            .attr('xlink:href', null)
        })
      d3.select('#songLabel').text('')
    })
  // .style('opacity', 0)

  dropdownChange()
  // .style('opacity', 1)
}

function dropdownChange() {
  const new_artist = d3
    .select('#artistNames')
    .property('value')
    .split(')')[0]
    .trim()

  // d3.select('#artistName').text(new_artist)
  var toChange = svg.selectAll('.song').filter(function(d) {
    return d.artist === new_artist || d.features.includes(new_artist)
  })
  console.log(toChange)

  toChange
    .select('rect')
    .transition()
    .duration(2000)
    .ease(d3.easeElastic)
    .attr('height', 0.8 * height)
    .attr('y', 0)
  toChange.select('text').style('opacity', 1)

  toChange = svg.selectAll('.song').filter(function(d) {
    return !(d.artist === new_artist || d.features.includes(new_artist))
  })

  toChange
    .select('rect')
    .transition()
    .duration(300)
    .ease(d3.easeCubic)
    .attr('height', 0)
    .attr('y', height / 2)
  toChange
    .select('text')
    .transition()
    .duration(300)
    .ease(d3.easeLinear)
    .style('opacity', 0)

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
