  import React, {useLayoutEffect, useCallback, useRef, useEffect, useState } from 'react'
  import ReactDOM from 'react-dom'
  import _ from 'lodash'
  import axios from 'axios'
  import mapboxgl from 'mapbox-gl'
  import './Map.css'
  import Maps from './Maps'


  const Scaffold = () => {
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
    const calculatedMapContainerHeight = viewportHeight - headerHeight - 190
    console.log('mapContainerWidth', mapContainerWidth)
    const [isUpdated, setIsUpdated] = useState(false)
    const [canvasHeightValue, setCanvasHeightValue] = useState('100px')
    // const [cssCheck, setCssCheck] = useState(null)

    useEffect(() => {
      async function updateCSSVariables() {
        setMapContainerHeight(calculatedMapContainerHeight)
        setMapCanvasHeight(calculatedMapContainerHeight)
        setIsUpdated(false)
        // const canvasElement = document.querySelector('canvas')
        const cssCheck = await document.documentElement.style.setProperty(`--${mapCanvasHeight}`, mapContainerHeight)
        const cssCanvasHeight = document.querySelector('canvas')
        const cssValues = window.getComputedStyle(cssCanvasHeight)


        // getComputedStyle(canvasElement).getPropertyValue('--mapCanvasHeight')
        // setCanvasHeightValue(cssCheck)
        setIsUpdated(true)
        console.log('cssCheck', cssValues.getPropertyValue('height'))
      }
      updateCSSVariables()
    }, [])

    const [mapCanvasHeight, setMapCanvasHeight] = useState(mapContainerHeight)
    const [mapCanvasWidth, setMapCanvasWidth] = useState(mapContainerWidth)
    const [mapVisibility, setMapVisibility] = useState('false')
    // const updateCSSVariables = () => {

        // element.style.setProperty(`--${mapCanvasHeight}`, mapContainerHeight)
    //     document.documentElement.style.setProperty(`--${mapCanvasWidth}`, viewportWidth)
      // }

    // const [canvas, setCanvas] = useState(null)
    // const [inspectMapContainer, setInspectMapContainer] = useState(null)
    // const [gl, setGL] = useState(null)
    //
    // useEffect(() => {
    //   setCanvas(document.querySelector('.mapboxgl-canvas'))
    //   setInspectMapContainer(document.querySelector('.map-container'))
    //   // setGL(canvas.getContext("webgl"))
    // }, [])

  return(
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
      {isUpdated ? <Maps/> : <canvas className='mapboxgl-canvas'>Loading...</canvas>}
      </div>
    </div>
  )
}
export default Scaffold
