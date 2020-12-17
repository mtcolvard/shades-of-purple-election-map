// const initLayers = () => {
//   // set our color scale using d3
//   const blueScale = d3.scaleLinear()
//     .domain([0, 100])
//     .range(['#bad2f0', '#1868d1']);
//
//   const redScale = d3.scaleLinear()
//       .domain([0, 100])
//       .range(['#f2cbcb', '#be2d1e']);
//
//   // add vector tile
//   map.addSource('counties', {
//     'type': 'vector',
//     'url': 'mapbox://lobenichou.cil176kr'
//   });
//
//   // add layer with feature-state
//   map.addLayer({
//      'id': 'counties-join',
//      'type': 'fill',
//      'source': 'counties',
//      'source-layer': 'uscountiesnew',
//      'paint': {
//        'fill-color': ['feature-state', 'color']
//      }
//  }, 'waterway-label');
//
//   // join the data to the vector tiles
//    const setCountiesColor = () => {
//      for (let key in newdata) {
//          map.setFeatureState({
//             source: 'counties',
//             sourceLayer: 'uscountiesnew',
//             id: key
//          }, {
//              'color': newdata[key]['winner'] === 'dem' ? blueScale(newdata[key]['diff']) : redScale(newdata[key]['diff'])
//          })
//      }
//   }
// }
//
//
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
// let hoveredStateId = null;
//
// map.on('mousemove', 'counties-join', (e) => {
//   map.getCanvas().style.cursor = 'pointer';
//   if (e.features.length > 0) {
//     if (hoveredStateId) {
//       // set the hover attribute to false with feature state
//       map.setFeatureState({
//         source: 'counties',
//         id: hoveredStateId
//       }, {
//         hover: false
//       });
//     }
//
//     hoveredStateId = e.features[0].id;
//     // set the hover attribute to true with feature state
//     map.setFeatureState({
//       source: 'counties',
//       id: hoveredStateId
//     }, {
//       hover: true
//     });
//   }
// });
