import React, { useRef, useEffect, useState } from 'react'
// import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'
// import Legend from './components/Legend'
import Optionsfield from './components/Optionsfield'
import electionNumbers from'./election_data_join.geojson'

mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'


const Map = () => {
  const options = [
    {
      name: '2020',
      description: '2020 Election Results',
      // property: 'Purple Maps State Results edit_dem_total',
      property: '2016_dem_pct',
    },
    {
      name: '2016',
      description: '2016 Election Results',
      property: '2012_dem_pct',
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

    map.on('load', () => {
      map.addSource('stateBoundaries', {
        'type': 'vector',
        'url': 'mapbox://styles/mtcolvard/ckifazn3008wo19o2faxvjc7c',
      })
      //
      map.addLayer({
        'id': 'purpleShade',
        'type': 'fill',
        'source': 'stateBoundaries',
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

      // map.addSource('electionNumbers', {
      //   'type': 'geojson',
      //   'data': electionNumbers
      // })
// this addLayer version works
      // map.addLayer(
      //   {
      //     'id': 'purpleShade',
      //     'type': 'fill',
      //     'source': 'electionNumbers',
      //     // 'source-layer': 'purple-maps-data-join-2-6th2yr',
      //     'paint': {
      //       'fill-color': [
      //         'interpolate',
      //         ['linear'],
      //         ['*',['to-number',['get','Purple Maps State Results edit_dem_total']],100],
      //         0, '#ff0000', 100, '#0000ff'
      //       ]
      //     }
      //   })
// this addLayer version is experimental
      // map.addLayer(
      //   {
      //     'id': 'purpleShade',
      //     'type': 'fill',
      //     'source': 'electionNumbers',
      //     'paint': {
      //           'fill-color': [
      //             'interpolate',
      //             ['linear'],
      //             ['*',['to-number',['get', active.property]],100],
      //             0, '#ff0000', 100, '#0000ff'
      //           ]
      //         }
      //   })
      //
      map.setPaintProperty('purpleShade', 'fill-color', {
        property: active.property
      })

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
      map.setPaintProperty('purpleShade', 'fill-color', {
        property: active.property
      })
    }
  }
  //
  const changeState = i => {
    setActive(options[i])
    map.setPaintProperty('purpleShade', 'fill-color', {
      property: active.property
    })
  }

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
