import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import Optionsfield from './components/Optionsfield'
import Legend from './components/Legend'
import electionData from './historicElectionResults.json'
var _ = require('lodash')
var d3 = require('d3')


mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'

const Maps = () => {

  const options = [
    {
      name: '2020',
      description: '2020 Election',
      property: '2020_dem_perc',
      dem_data: 'dem_total_2020',
      rep_data: 'rep_total_2020'
    },
    {
      name: '2016',
      description: '2016 Election',
      property: '2016_dem_perc',
      dem_data: 'dem_total_2016',
      rep_data: 'rep_total_2016'

    },
    {
      name: '2012',
      description: '2012 Election',
      property: '2012_dem_perc',
      dem_data: 'dem_total_2012',
      rep_data: 'rep_total_2012'

    },
    {
      name: '2008',
      description: '2008 Election',
      property: '2008_dem_perc',
      dem_data: 'dem_total_2008',
      rep_data: 'rep_total_2008'

    },
    {
      name: '2004',
      description: '2004 Election',
      property: '2004_dem_perc',
      dem_data: 'dem_total_2004',
      rep_data: 'rep_total_2004'

    },
    {
      name: '2000',
      description: '2000 Election',
      property: '2000_dem_perc',
      dem_data: 'dem_total_2000',
      rep_data: 'rep_total_2000'

    },
    {
      name: '1996',
      description: '1996 Election',
      property: '1996_dem_perc',
      dem_data: 'dem_total_1996',
      rep_data: 'rep_total_1996'

    },
    {
      name: '1992',
      description: '1992 Election',
      property: '1992_dem_perc',
      dem_data: 'dem_total_1992',
      rep_data: 'rep_total_1992'

    },
    {
      name: '1988',
      description: '1988 Election',
      property: '1988_dem_perc',
      dem_data: 'dem_total_1988',
      rep_data: 'rep_total_1988'
    }
  ]

  const mapContainerRef = useRef(null)
  const [active, setActive] = useState(options[0])
  const [map, setMap] = useState(null)

  const fillColorExpression = ['interpolate', ['linear'], ['*', ['to-number', ['get', active.property]], 100], 0, '#ff0000', 100, '#0000ff']

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mtcolvard/ckiq46ygw162e17nkl6jgkccj',
      center: [-95.4, 37.6],
      zoom: 2.5
    })

    map.on('load', () => {
      map.addSource('vectorElectionNumbers', {
        'type': 'vector',
        'data': 'mapbox://styles/mtcolvard/ckiq46ygw162e17nkl6jgkccj',
      })

      map.addLayer({
          'id': 'purple-maps-master-edit-geojs-9gxg35',
          'type': 'fill',
          'source': 'vectorElectionNumbers',
          'source-layer': 'purple-maps-master-edit-geojs-9gxg35',
      })

      map.setPaintProperty('purple-maps-master-edit-geojs-9gxg35', 'fill-color', fillColorExpression
      )
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
      map.setPaintProperty('purple-maps-master-edit-geojs-9gxg35', 'fill-color', fillColorExpression)
    }
  }

  const changeState = i => {
    setActive(options[i])
    map.setPaintProperty('purple-maps-master-edit-geojs-9gxg35', 'fill-color', fillColorExpression)
  }
// This is a map that show the votes of the American people.  The shades of the map are a mix of primary red and primary blue depending on the proportion of votes cast in each state. ..how each state voted

  return (
    <div>
      <div className="wrapper">
        <header className='header'>
        <h1 className='headline'>
          <div className='lineOne'> We are not as polarized as the Electoral College map leads us to believe.<br /><br />
          <span className='lineOne'> There are no red states or blue states.</span><br /><br />
          <span className='lineTwo'>Only the United States.</span><br /><br />
          <span className='lineThree'>And everywhere you look, it's shades of purple.</span>
          </div>
        </h1>
        </header>
        <div className='main'>
        <Legend active={active} />
        <Optionsfield
          options={options}
          property={active.property}
          changeState={changeState}
        />
        </div>
      </div>
      <div ref={mapContainerRef} className='map-container' />
    </div>
  )
}

export default Maps
