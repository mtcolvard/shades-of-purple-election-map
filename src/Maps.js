import React, { useRef, useEffect, useState } from 'react'
// import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'
// import Legend from './components/Legend'
import Optionsfield from './components/Optionsfield'
// import electionNumbers from './election_data_join.geojson'
// import election_result_2020 from './election_results_2020'

mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'

const Maps = () => {
  const options = [
    {
      name: '2020',
      description: '2020 Election Results',
      property: '2020_dem_perc',
    },
    {
      name: '2016',
      description: '2016 Election Results',
      property: '2016_dem_perc',
    },
    {
      name: '2012',
      description: '2012 Election Results',
      property: '2012_dem_perc',
    },
    {
      name: '2008',
      description: '2008 Election Results',
      property: '2008_dem_perc',
    },
    {
      name: '2004',
      description: '2004 Election Results',
      property: '2004_dem_perc',
    },
    {
      name: '2000',
      description: '2000 Election Results',
      property: '2000_dem_perc',
    },
    {
      name: '1996',
      description: '1996 Election Results',
      property: '1996_dem_perc',
    },
    {
      name: '1992',
      description: '1992 Election Results',
      property: '1992_dem_perc',
    },
    {
      name: '1988',
      description: '1988 Election Results',
      property: '1988_dem_perc',
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
    // let newdata = new Map()

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
  //
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
          <div className='lineOne'> There are no red states or blue states.<br /><br />
          <span className='lineTwo'>Only the United States.</span><br /><br />
          <span className='lineThree'>Shades of Purple</span>
          </div>
        </h1>
        </header>
        <article className='main'>
        <Optionsfield
          options={options}
          property={active.property}
          changeState={changeState}
        />
        </article>
      </div>
      <div ref={mapContainerRef} className='map-container' />
    </div>
  )
}

export default Maps

// election_result_2020.forEach((election_result) => {
//   const dem_result = election_result['2020_dem_pct']
//   const id = election_result['FIPS']
//   newdata[id] = { '2020_dem_pct': dem_result
//   }
// })
//
// const initLayers = () => {
//   map.addSource('vectorElectionNumbers', {
//     'type': 'vector',
//     'data': 'mapbox://styles/mtcolvard/ckifazn3008wo19o2faxvjc7c',
//   })
//
//   map.addLayer({
//     'id': 'results_2020',
//     'type': 'fill',
//     'source': 'vectorElectionNumbers',
//     'source-layer': 'results_new',
//     'paint': {
//       'fill-color': ['feature-state', 'color']
//     }
//   })
//
//   const setStatesColor = () => {
//     for (let key in newdata) {
//       map.setFeatureState({
//         'source': 'vectorElectionNumbers',
//         'sourceLayer': 'result_new',
//         'id': key
//       }, {
//         'color': newdata[key]['2020_dem_pct']
//       })
//     }
//   }
//   const setAfterLoad = (e) => {
//     if(e.sourceId === 'vectorElectionNumbers' && e.isSourceLoaded) {
//       setStatesColor()
//       map.off('sourcedata', setAfterLoad)
//     }
//   }
//
//   if (map.isSourceLoaded('vectorElectionNumbers')) {
//     setStatesColor()
//   } else {
//     map.on('sourcedata', setAfterLoad)
//   }
// }
// initLayers()
