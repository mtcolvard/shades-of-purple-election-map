import React, { useReducer, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import Optionsfield from './components/Optionsfield'
import Legend from './components/Legend'
import Tooltip from './components/Tooltip'
import electionData from './historicElectionResults.json'
const electionDataLayer = require('./electionResultsKeyed.json')
var d3 = require('d3')

mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'

const Maps = () => {

  const options = [
    {
      year: '2020',
      description: '2020 Election',
      property: 'pct_purple_2020',
      dem_data: 'dem_total_2020',
      rep_data: 'rep_total_2020',
      participation: "voter_turnout_2020",
      protest_vote: "protest_vote_2020",
    },
    {
      year: '2016',
      description: '2016 Election',
      property: 'pct_purple_2016',
      dem_data: 'dem_total_2016',
      rep_data: 'rep_total_2016',
      participation: "voter_turnout_2016",
      protest_vote: "protest_vote_2016"

    },
    {
      year: '2012',
      description: '2012 Election',
      property: 'pct_purple_2012',
      dem_data: 'dem_total_2012',
      rep_data: 'rep_total_2012',
      participation: "voter_turnout_2012",
      protest_vote: "protest_vote_2012"

    },
    {
      year: '2008',
      description: '2008 Election',
      property: 'pct_purple_2008',
      dem_data: 'dem_total_2008',
      rep_data: 'rep_total_2008',
      participation: "voter_turnout_2008",
      protest_vote: "protest_vote_2008"

    },
    {
      year: '2004',
      description: '2004 Election',
      property: 'pct_purple_2004',
      dem_data: 'dem_total_2004',
      rep_data: 'rep_total_2004',
      participation: "voter_turnout_2004",
      protest_vote: "protest_vote_2004"
    },
    {
      year: '2000',
      description: '2000 Election',
      property: 'pct_purple_2000',
      dem_data: 'dem_total_2000',
      rep_data: 'rep_total_2000',
      participation: "voter_turnout_2000",
      protest_vote: "protest_vote_2000"
    },
    {
      year: '1996',
      description: '1996 Election',
      property: 'pct_purple_1996',
      dem_data: 'dem_total_1996',
      rep_data: 'rep_total_1996',
      participation: "voter_turnout_1996",
      protest_vote: "protest_vote_1996"
    },
    {
      year: '1992',
      description: '1992 Election',
      property: 'pct_purple_1992',
      dem_data: 'dem_total_1992',
      rep_data: 'rep_total_1992',
      participation: "voter_turnout_1992",
      protest_vote: "protest_vote_1992"
    },
    {
      year: '1988',
      description: '1988 Election',
      property: 'pct_purple_1988',
      dem_data: 'dem_total_1988',
      rep_data: 'rep_total_1988',
      participation: "voter_turnout_2020",
      protest_vote: "protest_vote_2020"
    }
  ]

  const mapContainerRef = useRef(null)
  const [active, setActive] = useState(options[0])
  const [map, setMap] = useState(null)
  const activeRef = useRef(options[0])
  const tooltipRef = useRef(new mapboxgl.Popup({
    anchor: 'left',
    offset: 15,
    closeButton: false,
    closeOnClick: false,
    className: 'my-1'
  }))


  const fillColorExpression = ['interpolate', ['linear'], ['*', ['to-number', ['get', active.property]], 100], 0, '#ff0000', 100, '#0000ff']
  const fillOpacityExpression = ['case', ['boolean', ['feature-state', 'hover'], false], 1, 1]

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mtcolvard/ckiwk8jxb4vpf19pfm556o1dq',
      center: [-95.4, 37.6],
      zoom: 2.5
    })

    map.on('load', () => {
      map.addSource('vectorElectionNumbers', {
        'type': 'vector',
        'url': 'mapbox://mtcolvard.6ucwbkgb',
      })


   //    map.addLayer({
   //     'id': 'state-lines',
   //     'type': 'line',
   //     'source': 'vectorElectionNumbers',
   //     'source-layer': 'elections_vector_and_data',
   //     'layout': {
   //         'line-join': 'round',
   //         'line-cap': 'round'
   //     },
   //     'paint': {
   //         'line-color': ['feature-state', '#D8CAC1'],
   //         'line-width': ['feature-state', '1']
   //     }
   // })

    map.addLayer({
     'id': 'vector-fill-layer',
     'type': 'fill',
     'source': 'vectorElectionNumbers',
     'source-layer': 'elections_vector_and_data',
   })

    map.setPaintProperty('vector-fill-layer', 'fill-color', fillColorExpression)
    map.setPaintProperty('vector-fill-layer', 'fill-opacity', fillOpacityExpression)

    map.on('mouseenter', 'vector-fill-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer'
      })

    map.on('mouseleave', 'vector-fill-layer', (e) => {
      map.getCanvas().style.cursor = ''
    })

    let hoveredStateId = null
    map.on('mousemove', 'vector-fill-layer', (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId) {
          map.setFeatureState({
            source: 'vectorElectionNumbers',
            sourceLayer: 'elections_vector_and_data',
            id: hoveredStateId
          }, {
            hover: false
          })
        }

        hoveredStateId = e.features[0].id
        map.setFeatureState({
          source: 'vectorElectionNumbers',
          sourceLayer: 'elections_vector_and_data',
          id: hoveredStateId
        }, {
          hover: true
        })
      }
    })

    map.on('mouseleave', 'vector-fill-layer', () => {
      if (hoveredStateId) {
        map.setFeatureState({
          source: 'vectorElectionNumbers',
          sourceLayer: 'elections_vector_and_data',
          id: hoveredStateId
        }, {
            hover: false
          })
        tooltipRef.current
          .remove()
        }
      hoveredStateId = null
    })

    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point)
      if (features.length) {
        const feature = features[0]
        const tooltipNode = document.createElement('div')
        ReactDOM.render(<Tooltip feature={feature} active={activeRef}/>, tooltipNode)
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map)
      }
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
      map.setPaintProperty('vector-fill-layer', 'fill-color', fillColorExpression)
      map.setPaintProperty('vector-fill-layer', 'fill-opacity', fillOpacityExpression)
    }
  }

  const changeState = i => {
    setActive(options[i])
    activeRef.current = options[i]
    map.setPaintProperty('vector-fill-layer', 'fill-color', fillColorExpression)
    map.setPaintProperty('vector-fill-layer', 'fill-opacity', fillOpacityExpression)
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
