import React, {useLayoutEffect, useCallback, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import MapContainer from './components/MapContainer'
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

  const activeRef = useRef(options[0])
  const [active, setActive] = useState(options[0])
  const [map, setMap] = useState(null)


  const tooltipRef = useRef(new mapboxgl.Popup({
    anchor: 'left',
    offset: 15,
    closeButton: false,
    closeOnClick: false,
    className: 'my-1'
  }))

  const [headerHeight, setHeaderHeight] = useState(0)
  const measureHeaderRef = useCallback(node => {
    if (node !== null) {
      setHeaderHeight(node.getBoundingClientRect().height)
    }
  }, [])

  // const [mapContainerWidth, setMapContainerWidth] = useState(null)
  const mapContainerWidth = window.innerWidth
  const [mapContainerHeight, setMapContainerHeight] = useState(null)
  const viewportHeight = document.body.clientHeight
  const calculatedMapContainerHeight = viewportHeight - headerHeight - 215
  console.log('mapContainerWidth', mapContainerWidth)

  useEffect(() => {
    setMapContainerHeight(calculatedMapContainerHeight)
  }, [mapContainerHeight])

  useEffect(() => {
    setCSSVariables()
  }, [])

  // const [canvas, setCanvas] = useState(230)
  // setCanvas(canvas)


  const mapCanvasHeight = null
  const mapCanvasWidth = null
  console.log('mapCanvasWidth', mapCanvasWidth)
  console.log('mapCanvasHeight', mapCanvasHeight)
  // const mapCanvasWidth = 375
  const setCSSVariables = () => {
      document.documentElement.style.setProperty(`--${mapCanvasHeight}`, mapContainerHeight)
      document.documentElement.style.setProperty(`--${mapCanvasWidth}`, mapContainerWidth)
      // element.style.setProperty(`--${mapCanvasHeight}`, mapContainerHeight)
  //     document.documentElement.style.setProperty(`--${mapCanvasWidth}`, viewportWidth)
    }



  const [canvas, setCanvas] = useState(null)
  const [gl, setGL] = useState(null)

  useEffect(() => {
    setCanvas(document.querySelector('.mapboxgl-canvas'))
    // setGL(canvas.getContext("webgl"))
  }, [])
  const resizeCanvasToDisplaySize = (canvas) => {
    const displayHeight = mapContainerHeight
    const displayWidth = mapContainerWidth
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight
    if (needResize) {
      canvas.width = displayWidth
      canvas.height = displayHeight
    }
    return needResize
  }



  return (
  <div className="divOne">
    <div className="divTwo">
      <div ref={measureHeaderRef}>
        <div  className='headline '>
          <h1 className='lineOne pb12 align-center '> We are much less polarized than the Electoral College map leads us to believe.
          </h1>
        </div>
        <div className='mt6'>
          <h4 className='lineTwo txt-h4 txt-h2-mm align-center '> There are no <span className="red-state"> red</span><span> states or  </span><span className="blue-state">blue</span> states.</h4>
          <h4 className="lineTwo txt-h4 txt-h2-mm align-center ">Mostly, we're shades of purple.</h4>
        </div>
      </div>
      {mapCanvasHeight &&
        <MapContainer
          map={map}
          active={active}
        />
      }

        <div className="absolute bottom right-mm  w-full w-auto-mm z5 z1-mm bg-white shadow-darken10 round  mr3-mm mb3-mm  ">
          <div>
            <Optionsfield
              options={options}
              property={active.property}
              changeState={changeState}
              classNames={"toggle-group toggle-group--s relative bottom mb3 border border--2 border--white bg-white shadow-darken10 z2"}
            />
          </div>
          <div>
            <Legend active={active} classNames={" right-mm z5 py12 px24  "} />
          </div>
      </div>
    </div>
  </div>
  )
}

export default Maps
