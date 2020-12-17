import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import Optionsfield from './components/Optionsfield'
import Legend from './components/Legend'
import Tooltip from './components/Tooltip'
import electionData from './historicElectionResults.json'
import electionDataLayer from './electionResultsKeyed.json'
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
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15, closeButton: false,
            closeOnClick: false}))

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
      axios.get('./mtsElectionData.geojson')
      map.addSource('vectorElectionNumbers', {
        'type': 'vector',
        'data': 'mapbox://mtcolvard.7kwx6btv',
        // 'promoteId': 'GEOID'
      })

      map.addLayer({
          'id': 'purple-maps-master-edit-geojs-9gxg35',
          'type': 'fill',
          'source': 'vectorElectionNumbers',
          'source-layer': 'purple-maps-master-edit-geojs-9gxg35',
          'fill-opacity': [
            'case', ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
          ]
      })

      map.setPaintProperty('purple-maps-master-edit-geojs-9gxg35', 'fill-color', fillColorExpression
      )

      // // map.addLayer({
      // //     'id': 'state-line',
      // //     'type': 'line',
      // //     'source': 'vectorElectionNumbers',
      // //     'source-layer': 'purple-maps-master-edit-geojs-9gxg35',
      // //     'layout': {
      // //         'line-join': 'round',
      // //         'line-cap': 'round'
      // //     },
      // //     'paint': {
      // //         'line-color': '#D8CAC1',
      // //         'line-width': 1
      // //     }
      // // })
      //
      //
      //
      // const loadDataIntoFeatureState = () => {
      //   for (let key in electionDataLayer) {
      //     map.setFeatureState({
      //       source: 'vectorElectionNumbers',
      //       sourceLayer: 'purple-maps-master-edit-geojs-9gxg35',
      //       id: key
      //     },
      //     {
      //       state:  electionDataLayer[key]['State'],
      //       dem_total_1988:  electionDataLayer[key]['dem_total_1988'],
      //       rep_total_1988:  electionDataLayer[key]['rep_total_1988'],
      //       protest_vote_1988:  electionDataLayer[key]['protest_vote_1988'],
      //       dem_total_1992:  electionDataLayer[key]['dem_total_1992'],
      //       rep_total_1992:  electionDataLayer[key]['rep_total_1992'],
      //       protest_vote_1992:  electionDataLayer[key]['protest_vote_1992'],
      //       dem_total_1996:  electionDataLayer[key]['dem_total_1996'],
      //       rep_total_1996:  electionDataLayer[key]['rep_total_1996'],
      //       protest_vote_1996:  electionDataLayer[key]['protest_vote_1996'],
      //       dem_total_2000:  electionDataLayer[key]['dem_total_2000'],
      //       rep_total_2000:  electionDataLayer[key]['rep_total_2000'],
      //       protest_vote_2000:  electionDataLayer[key]['protest_vote_2000'],
      //       dem_total_2004:  electionDataLayer[key]['dem_total_2004'],
      //       rep_total_2004:  electionDataLayer[key]['rep_total_2004'],
      //       protest_vote_2004:  electionDataLayer[key]['protest_vote_2004'],
      //       dem_total_2008:  electionDataLayer[key]['dem_total_2008'],
      //       rep_total_2008:  electionDataLayer[key]['rep_total_2008'],
      //       protest_vote_2008:  electionDataLayer[key]['protest_vote_2008'],
      //       dem_total_2012:  electionDataLayer[key]['dem_total_2012'],
      //       rep_total_2012:  electionDataLayer[key]['rep_total_2012'],
      //       protest_vote_2012:  electionDataLayer[key]['protest_vote_2012'],
      //       dem_total_2016:  electionDataLayer[key]['dem_total_2016'],
      //       rep_total_2016:  electionDataLayer[key]['rep_total_2016'],
      //       protest_vote_2016: electionDataLayer[key]['protest_vote_2016'],
      //       dem_total_2020: electionDataLayer[key]['dem_total_2020'],
      //       rep_total_2020: electionDataLayer[key]['rep_total_2020'],
      //       protest_vote_2020: electionDataLayer[key]['protest_vote_2020']
      //     })
      //   }
      // }
      // loadDataIntoFeatureState()


    map.on('mouseenter', e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer'
      }
    })

    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = ''
    })
    let hoveredStateId = null
    map.on('mousemove', 'purple-maps-master-edit-geojs-9gxg35', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['purple-maps-master-edit-geojs-9gxg35']})
      // if (features.length) {
      //   const feature = features[0]
      //   const tooltipNode = document.createElement('div')
      //
      //   ReactDOM.render(
      //     <Tooltip
      //       feature={feature}
      //       dem_vote={active.dem_data}
      //       rep_vote={active.rep_data}
      //       />, tooltipNode)
      //
      //   tooltipRef.current
      //     .setLngLat(e.lngLat)
      //     .setDOMContent(tooltipNode)
      //     .addTo(map)
      // }

      if (e.features.length > 0) {
        if (hoveredStateId) {
          map.featureState({
            source: 'vectorElectionNumbers',
            sourceLayer: 'purple-maps-master-edit-geojs-9gxg35',
            id: hoveredStateId
          }, {
            hover: false
          })
        }
        hoveredStateId = e.features[0].id
        map.setFeatureState({
          source: 'vectorElectionNumbers',
          sourceLayer: 'purple-maps-master-edit-geojs-9gxg35',
          id: hoveredStateId
        }, {
          hover: true
        })
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
