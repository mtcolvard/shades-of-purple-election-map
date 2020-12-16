import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'
import Optionsfield from './components/Optionsfield'
import Legend from './components/Legend'
import electionData from './historicElectionResults.json'
var _ = require('lodash')


mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'

const Maps = () => {

  const options = [
    {
      name: '2020',
      description: '2020 Election Results',
      property: '2020_dem_perc',
      dem_data: 'dem_total_2020',
      rep_data: 'rep_total_2020'
    },
    {
      name: '2016',
      description: '2016 Election Results',
      property: '2016_dem_perc',
      dem_data: 'dem_total_2016',
      rep_data: 'rep_total_2016'

    },
    {
      name: '2012',
      description: '2012 Election Results',
      property: '2012_dem_perc',
      dem_data: 'dem_total_2012',
      rep_data: 'rep_total_2012'

    },
    {
      name: '2008',
      description: '2008 Election Results',
      property: '2008_dem_perc',
      dem_data: 'dem_total_2008',
      rep_data: 'rep_total_2008'

    },
    {
      name: '2004',
      description: '2004 Election Results',
      property: '2004_dem_perc',
      dem_data: 'dem_total_2004',
      rep_data: 'rep_total_2004'

    },
    {
      name: '2000',
      description: '2000 Election Results',
      property: '2000_dem_perc',
      dem_data: 'dem_total_2000',
      rep_data: 'rep_total_2000'

    },
    {
      name: '1996',
      description: '1996 Election Results',
      property: '1996_dem_perc',
      dem_data: 'dem_total_1996',
      rep_data: 'rep_total_1996'

    },
    {
      name: '1992',
      description: '1992 Election Results',
      property: '1992_dem_perc',
      dem_data: 'dem_total_1992',
      rep_data: 'rep_total_1992'

    },
    {
      name: '1988',
      description: '1988 Election Results',
      property: '1988_dem_perc',
      dem_data: 'dem_total_1988',
      rep_data: 'rep_total_1988'
    }
  ]

  const stateKey = {
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut',
  '10': 'Delaware',
  '11': 'District of Columbia',
  '12': 'Florida',
  '13': 'Georgia',
  '15': 'Hawaii',
  '16': 'Idaho',
  '17': 'Illinois',
  '18': 'Indiana',
  '19': 'Iowa',
  '20': 'Kansas',
  '21': 'Kentucky',
  '22': 'Louisiana',
  '23': 'Maine',
  '24': 'Maryland',
  '25': 'Massachusetts',
  '26': 'Michigan',
  '27': 'Minnesota',
  '28': 'Mississippi',
  '29': 'Missouri',
  '30': 'Montana',
  '31': 'Nebraska',
  '32': 'Nevada',
  '33': 'New Hampshire',
  '34': 'New Jersey',
  '35': 'New Mexico',
  '36': 'New York',
  '37': 'North Carolina',
  '38': 'North Dakota',
  '39': 'Ohio',
  '40': 'Oklahoma',
  '41': 'Oregon',
  '42': 'Pennsylvania',
  '44': 'Rhode Island',
  '45': 'South Carolina',
  '46': 'South Dakota',
  '47': 'Tennessee',
  '48': 'Texas',
  '49': 'Utah',
  '50': 'Vermont',
  '51': 'Virginia',
  '53': 'Washington',
  '54': 'West Virginia',
  '55': 'Wisconsin',
  '56': 'Wyoming'}


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

 useEffect(() => {
   testData()
 })

  const testData = () => {

    // const demElectionYearData = electionData[active.dem_data]
    const demElectionYearData = _.omit(electionData[active.dem_data], ['11'])

    const repElectionYearData = electionData[active.rep_data]
    _.omit(repElectionYearData, ['11'])


    const mostPartisanDemFIPS = _.maxBy(_.keys(demElectionYearData), o => demElectionYearData[o])
    const mostPartisanDemState = stateKey[mostPartisanDemFIPS]
    const mostPartisanDemStatePercent = demElectionYearData[mostPartisanDemFIPS]

    const mostPartisanRepFIPS = _.maxBy(_.keys(repElectionYearData), o => repElectionYearData[o])
    const mostPartisanRepState = stateKey[mostPartisanRepFIPS]
    const mostPartisanRepStatePercent = repElectionYearData[mostPartisanRepFIPS]

    console.log('mostPartisanDemState', mostPartisanDemState, mostPartisanDemStatePercent)
    console.log('mostPartisanRepState', mostPartisanRepState, mostPartisanRepStatePercent )

  }


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
        <Legend active={active} stops={active.election} />
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
