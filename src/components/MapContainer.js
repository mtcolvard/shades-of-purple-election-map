import React, {useLayoutEffect, useCallback, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import './Map.css'

const MapContainer = () => {
  const mapContainerRef = useRef(null)


  const fillColorExpression = ['interpolate', ['linear'], ['*', ['to-number', ['get', active.property]], 100], 0, '#ff0000', 100, '#0000ff']
  const fillOpacityExpression = ['case', ['boolean', ['feature-state', 'hover'], false], 1, 1]
  const bounds = [[-122.121674, 21.199061], [-69.915619,48.365146]]

  // Initialize map when component mounts
  useLayoutEffect(() => {
  // if (mapContainerHeight) {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mtcolvard/ckiwk8jxb4vpf19pfm556o1dq',
      center: [-96.09, 38.83],
      zoom: 2.1,
      attributionControl: true,
      // trackResize: true,
      bounds: bounds,
      fitBoundsOptions: { padding: {left:15, right:15, top:15, bottom:0}}
    })

    // map.setPadding({left:1, right:1, top:1, bottom:1})
    map.scrollZoom.disable()

    map.addControl(new mapboxgl.AttributionControl({customAttribution: ['Data: census.gov','electproject.org']}))
    // const containerForBounds = map.cameraForBounds(bounds)
    // map.setZoom(containerForBounds[1])

    // map.resize()
    // map.setMaxBounds(bounds)
    // map.getCanvas()

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

    // map.onMapLoaded(event) {
    // event.map.resize()
    // }

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
      // if canvas.
    setMap(map)
  })
  return () => map.remove()
// }
  // Clean up on unmount
}, [])




// useEffect(() => {
//   checkSize()
// }, [mapContainerHeight])
//
// const checkSize = () => {
//   if (map) {
//     if (mapContainerHeight !== 225) {
//       map.resize()
//     }
//   }
// }

// const p0 = [0, 222.75]
// const p1 = [375, 543]
// map.fitScreenCoordinates(p0, p1, 0)


useEffect(() => {
  paint()
}, [active])

const paint = () => {
  if (map) {
    map.setPaintProperty('vector-fill-layer', 'fill-color', fillColorExpression)
    map.setPaintProperty('vector-fill-layer', 'fill-opacity', fillOpacityExpression)
  }
}

useEffect(() => {
  resizeMap()
}, [])

const resizeMap = () => {
  if (map) {
    const getMapContainer = document.querySelector('.map-container')
    mapContainerRef.current = getMapContainer.height
    map.resize()
  }
}

const changeState = i => {
  setActive(options[i])
  activeRef.current = options[i]
  map.setPaintProperty('vector-fill-layer', 'fill-color', fillColorExpression)
  map.setPaintProperty('vector-fill-layer', 'fill-opacity', fillOpacityExpression)
}

console.log('canvas', canvas)


  console.log('headerHeight', headerHeight)
  console.log('viewportHeight', viewportHeight)
  console.log('calculatedMapContainerHeight', calculatedMapContainerHeight)
  console.log('mapContainerHeight', mapContainerHeight)

  console.log('break', 0)

  // <div ref={mapContainerRef} className="map" style={{height: 100 + 'vh' - 215 + 'px' - height + 'px'}} />
  //
  // useEffect(() => {
  //   mapCanvasSizeRef.current = calculatedMapContainerHeight
  //   let mapboxglCanvas = document.getElementsByClassName('mapboxgl-canvas')
  //   // let mapboxglCanvas = document.getElementsByClassName('map-container')
  //   mapboxglCanvas.style.setProperty('--calculatedMapContainerHeight', mapCanvasSizeRef)
  // })

  // <div ref={mapContainerRef} className="map-container" style={{height: calculatedMapContainerHeight}} />

  // <div ref={mapContainerRef} className="map-container" style={{height: mapContainerHeight}} />

  return(
    <div ref={mapContainerRef} className="map-container" />
  )
}

export default MapContainer
