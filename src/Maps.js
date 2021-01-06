import React, {useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import Optionsfield from './components/Optionsfield'
import Legend from './components/Legend'
import Tooltip from './components/Tooltip'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

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
  const activeRef = useRef(options[0])
  const [active, setActive] = useState(options[0])
  const [map, setMap] = useState(null)

  const tooltipRef = useRef(new mapboxgl.Popup({
    // anchor: 'left',
    offset: 15,
    closeButton: true,
    closeOnClick: false,
    className: 'my-1'
  }))

  const fillColorExpression = ['interpolate', ['linear'], ['*', ['to-number', ['get', active.property]], 100], 0, '#ff0000', 100, '#0000ff']
  const fillOpacityExpression = ['case', ['boolean', ['feature-state', 'hover'], false], 1, 1]
  const bounds = [[-122.121674, 21.199061], [-69.915619,48.365146]]


  useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mtcolvard/ckiwk8jxb4vpf19pfm556o1dq',
        center: [-96.09, 38.83],
        zoom: 2.1,
        attributionControl: true,
        trackResize: true,
        doubleClickZoom: false,
        touchZoomRotate: false,
        touchPitch: false,
        pitchWithRotate: false,
        clickTolerance: '20px',
        dragPan: false,
        dragRotate:false,
        scrollZoom: false,
        bounds: bounds,
        fitBoundsOptions: { padding: {left:20, right:20, top:5, bottom:5}}
      })
      // map.scrollZoom.disable()

      map.addControl(new mapboxgl.AttributionControl({customAttribution: ['Data: census.gov','electproject.org'], compact: true}), 'bottom-left')

      map.on('load', () => {
        map.addSource('vectorElectionNumbers', {
          'type': 'vector',
          'url': 'mapbox://mtcolvard.9cx8ngi9',
        })

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

      // map.on('touchstart', (e) => {
      //   e.preventDefault()
      // })

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
          // tooltipNode.setAttribute('style', 'margin-right: -24px;')
          ReactDOM.render(<Tooltip feature={feature} active={activeRef}/>, tooltipNode)
          tooltipRef.current
            .setLngLat(e.lngLat)
            .setDOMContent(tooltipNode)
            .addTo(map)
          }
        })
      setMap(map)
    })
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
  // <h1 className='lineOne py12-mm align-center w-full'> We are much less polarized than the Electoral College map leads us to believe.
  // </h1>

  // <h1 className='lineOne py12-mm align-center w-full'> We are much less polarized than an Electoral College map makes us believe.
  // </h1>
  // <h1 className='lineOne py12-mm align-center w-full'> The United States is much less polarized than an <br/> Electoral College map makes us to believe.
  // </h1>



  // <h1 className='lineOne py12-mm align-center w-full'> We are much less polarized than an  <br/> Electoral College map would make us believe.
  // </h1>



  return (
    <div className="divOne">
      <div className="divTwo">
        <div className="flex-parent flex-parent--column">
        <div className="hmin240">
        </div>
        <div ref={mapContainerRef} className="map-container align-middle hmin240 h300-mm mt18-mm mb30-mm mx36-mm  flex-child" />
        </div>
        </div>
      </div>
  )
}

export default Maps

// <div className="flex-child z5 z1-mm bg-white shadow-darken10 round  mr3-mm mb3-mm  mx30-mm">
