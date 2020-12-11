import React, { useRef, useEffect, useState } from 'react'
// import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'
// import Legend from './components/Legend'
import Optionsfield from './components/Optionsfield'
// import electionNumbers from './election_data_join.geojson'
import election_results_2020 from './2020_election_results.json'

mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'


const Map = () => {
  const options = [
    {
      name: '2016',
      description: '2016 Election Results',
      // property: 'Purple Maps State Results edit_dem_total',
      property: '2016_dem_pct',
      stops: [[0, '#FF0000'],[100, '#0000FF']]
    },
    {
      name: '2012',
      description: '2012 Election Results',
      property: '2012_dem_pct',
      stops: [[0, '#FF0000'],[100, '#0000FF']]

    }
  ]
  const mapContainerRef = useRef(null)
  const [active, setActive] = useState(options[0])
  const [map, setMap] = useState(null)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mtcolvard/ckifazn3008wo19o2faxvjc7c',
      center: [-95.4, 37.6],
      zoom: 2.5
    })

    // let data_2020 = new Map()

    map.on('load', () => {
      // getJSON('./election_results_2020.json', (err, data) => {
      //   if(err !== null) {
      //     console.log('error fetching file')
      //   } else {
      //     data.forEach((election_result) => {
      //
      //     })
      //   }
      // }
      // election_results_2020.forEach((election_result) => {
      //   election_result['FIPS'] = election_result['2020_dem_pct']
      // }
      map.addSource('vectorElectionNumbers', {
        'type': 'vector',
        'data': 'mapbox://styles/mtcolvard/ckifazn3008wo19o2faxvjc7c',
      })

      map.addLayer(
        {
          'id': 'historical-pres-elections-state',
          'type': 'fill',
          'source': 'vectorElectionNumbers',
          'source-layer': 'historical-pres-elections-state',
          'paint': {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['*',['to-number',['get', active.property]],100],
              0, '#ff0000', 100, '#0000ff'
            ]
          }
        })

      map.setPaintProperty('historical-pres-elections-state', 'fill-color', {
        property: active.property,
        stops: active.stops
      })

      // map.addSource('jsonElectionNumbers', {
      //   'type': 'geojson',
      //   'data': electionNumbers
      // })
      //
      // map.addLayer(
      //   {
      //     'id': '2020-pres-elections-state',
      //     'type': 'fill',
      //     'source': 'jsonElectionNumbers',
      //     'paint': {
      //       'fill-color': [
      //         'interpolate',
      //         ['linear'],
      //         ['*',['to-number',['get', active.property]],100],
      //         0, '#ff0000', 100, '#0000ff'
      //       ]
      //     }
      //   })
      //
      // map.setPaintProperty('2020-pres-elections-state', 'fill-color', {
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
      map.setPaintProperty('historical-pres-elections-state', 'fill-color', {
        property: active.property,
        stops: active.stops
      })
    }
  }
  //
  const changeState = i => {
    setActive(options[i])
    map.setPaintProperty('historical-pres-elections-state', 'fill-color', {
      property: active.property,
      stops: active.stops
    })
  }
// This is a map that show the votes of the American people.  The shades of the map are a mix of primary red and primary blue depending on the proportion of votes cast in each state. ..how each state voted
  return (
    <div>
      <div>
        <h1 className='headline'>
          <div className='lineOne'> There are no red states or blue states.<br /><br />
          <span className='lineTwo'>Only the United States.</span><br /><br />
          <span className='lineThree'>Shades of Purple</span>
          </div>
        </h1>
      </div>
      <div ref={mapContainerRef} className='map-container' />
      <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      />
    </div>
  )
}

export default Map

// <Legend active={active} stops={active.stops} />
//
