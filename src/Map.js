import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import Legend from './components/Legend'
import Optionsfield from './components/Optionsfield'
import './Map.css'
import election_data from './election_data.json'
import data from './state_geometry.json'

mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'


const Map = () => {
  const options = [
    {
      name: 'Population',
      description: 'Estimated total population',
      property: 'pop_est',
      stops: [
        [0, '#f8d5cc'],
        [1000000, '#f4bfb6'],
        [5000000, '#f1a8a5'],
        [10000000, '#ee8f9a'],
        [50000000, '#ec739b'],
        [100000000, '#dd5ca8'],
        [250000000, '#c44cc0'],
        [500000000, '#9f43d7'],
        [1000000000, '#6e40e6']
      ]
    },
    {
      name: 'GDP',
      description: 'Estimate total GDP in millions of dollars',
      property: 'gdp_md_est',
      stops: [
        [0, '#f8d5cc'],
        [1000, '#f4bfb6'],
        [5000, '#f1a8a5'],
        [10000, '#ee8f9a'],
        [50000, '#ec739b'],
        [100000, '#dd5ca8'],
        [250000, '#c44cc0'],
        [5000000, '#9f43d7'],
        [10000000, '#6e40e6']
      ]
    }
  ]
  const mapContainerRef = useRef(null)
  const [active, setActive] = useState(options[0])
  const [map, setMap] = useState(null)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mtcolvard/ckhp8n7eg01mn19p7qkyeda6c',
      center: [-95.4, 37.6],
      zoom: 3.5
    })

    map.on('load', () => {
      map.addSource('data', {
        type: 'geojson',
        data: 'FeatureCollection',
        // features: [],
      })

      // map.setLayoutProperty('purple-maps-data-join-2-6th2yr (1)', 'text-field', [
      //   'format',
      //   ['get', 'NAME'],
      //   { 'font-scale': 1.2 },
      //   '\n',
      //   {},
      //   ['get', 'STATEFP'],
      //   {
      //     'font-scale': 0.8,
      //     'text-font': [
      //       'literal',
      //       ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
      //     ]
      //   }
      // ])

      // map.addLayer(
      //   {
      //     id: 'data',
      //     type: 'fill',
      //     source: 'data'
      //   },
      //   'STATEFP'
      // )

      // map.setPaintProperty('STATEFP', 'fill-color', {
      //   property: active.property,
      //   stops: active.stops
      // })

      setMap(map)
    })

    // Clean up on unmount
    return () => map.remove()
  }, [])

  useEffect(() => {
    paint()
  }, [active])

  const paint = () => {
    if (map) {
      map.setPaintProperty('data', 'fill-color', {
        property: active.property,
        stops: active.stops
      })
    }
  }

  const changeState = i => {
    setActive(options[i])
    map.setPaintProperty('data', 'fill-color', {
      property: active.property,
      stops: active.stops
    })
  }

  let data = [{ "code": "ROU", "hdi": 0.811 },
    { "code": "RUS", "hdi": 0.816 },
    { "code": "SRB", "hdi": 0.787 },
    { "code": "SVK", "hdi": 0.855 },
    { "code": "SVN", "hdi": 0.896 },
    { "code": "ESP", "hdi": 0.891 },
    { "code": "SWE", "hdi": 0.933 },
    { "code": "CHE", "hdi": 0.944 },
    { "code": "HRV", "hdi": 0.831 },
    { "code": "CZE", "hdi": 0.888 },
    { "code": "DNK", "hdi": 0.929 },
    { "code": "EST", "hdi": 0.871 },
    { "code": "FIN", "hdi": 0.92 },
    { "code": "FRA", "hdi": 0.901 },
    { "code": "DEU", "hdi": 0.936 },
    { "code": "GRC", "hdi": 0.87 },
    { "code": "ALB", "hdi": 0.785 },
    { "code": "AND", "hdi": 0.858 },
    { "code": "AUT", "hdi": 0.908 },
    { "code": "BLR", "hdi": 0.808 },
    { "code": "BEL", "hdi": 0.916 },
    { "code": "BIH", "hdi": 0.768 },
    { "code": "BGR", "hdi": 0.813 },
    { "code": "MKD", "hdi": 0.757 },
    { "code": "MLT", "hdi": 0.878 },
    { "code": "MDA", "hdi": 0.7 },
    { "code": "MNE", "hdi": 0.814 },
    { "code": "NLD", "hdi": 0.931 },
    { "code": "NOR", "hdi": 0.953 },
    { "code": "POL", "hdi": 0.865 },
    { "code": "PRT", "hdi": 0.847 },
    { "code": "HUN", "hdi": 0.838 },
    { "code": "ISL", "hdi": 0.935 },
    { "code": "IRL", "hdi": 0.938 },
    { "code": "ITA", "hdi": 0.88 },
    { "code": "LVA", "hdi": 0.847 },
    { "code": "LIE", "hdi": 0.916 },
    { "code": "LTU", "hdi": 0.858 },
    { "code": "LUX", "hdi": 0.904 },
    { "code": "UKR", "hdi": 0.751 },
    { "code": "GBR", "hdi": 0.922 } ]

  map.on('load', function () {

  // Add source for country polygons using the Mapbox Countries tileset
  // The polygons contain an ISO 3166 alpha-3 code which can be used to for joining the data
  // https://docs.mapbox.com/vector-tiles/reference/mapbox-countries-v1
  map.addSource('countries', {
  type: 'vector',
  url: 'mapbox://mapbox.country-boundaries-v1'
  })

  // Build a GL match expression that defines the color for every vector tile feature
  // Use the ISO 3166-1 alpha 3 code as the lookup key for the country shape
  var matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']]

  // Calculate color values for each country based on 'hdi' value
  data.forEach(function (row) {

  // Convert the range of data values to a suitable color
  var green = row['hdi'] * 255
  var color = 'rgb(0, '+ green + ', 0)'

  matchExpression.push(row['code'], color)

  })

  // Last value is the default, used where there is no data
  matchExpression.push('rgba(0, 0, 0, 0)')

  // Add layer from the vector tile source to create the choropleth
  // Insert it below the 'admin-1-boundary-bg' layer in the style
  map.addLayer({
  'id': 'countries-join',
  'type': 'fill',
  'source': 'countries',
  'source-layer': 'country_boundaries',
  'paint': {
  'fill-color': matchExpression
  }
  }, 'admin-1-boundary-bg')

  })

  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
      <Legend active={active} stops={active.stops} />
      <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      />
    </div>
  )
}

export default Map
