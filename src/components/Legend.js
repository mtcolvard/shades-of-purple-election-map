import React, { useState, useEffect} from 'react'
import electionData from '../historicElectionResults.json'
var _ = require('lodash')
var d3 = require('d3')


const Legend = (props) => {
  const stateKey = {
  '01': 'Alabama','02': 'Alaska', '04': 'Arizona', '05': 'Arkansas', '06': 'California', '08': 'Colorado', '09': 'Connecticut', '10': 'Delaware', '11': 'District of Columbia', '12': 'Florida', '13': 'Georgia', '15': 'Hawaii', '16': 'Idaho', '17': 'Illinois', '18': 'Indiana', '19': 'Iowa', '20': 'Kansas', '21': 'Kentucky', '22': 'Louisiana', '23': 'Maine', '24': 'Maryland', '25': 'Massachusetts', '26': 'Michigan', '27': 'Minnesota', '28': 'Mississippi', '29': 'Missouri', '30': 'Montana', '31': 'Nebraska', '32': 'Nevada', '33': 'New Hampshire', '34': 'New Jersey', '35': 'New Mexico', '36': 'New York', '37': 'North Carolina', '38': 'North Dakota', '39': 'Ohio', '40': 'Oklahoma', '41': 'Oregon', '42': 'Pennsylvania', '44': 'Rhode Island', '45': 'South Carolina', '46': 'South Dakota', '47': 'Tennessee', '48': 'Texas', '49': 'Utah', '50': 'Vermont', '51': 'Virginia', '53': 'Washington', '54': 'West Virginia', '55': 'Wisconsin', '56': 'Wyoming'}

  const [statePurpleRating, setStatePurpleRating] = useState({null: null})
  const [legendProps_mostPartisan, setLegendProps_mostPartisan] = useState([[null]])
  const [legendProps_mostPurpleState, setLegendProps_mostPurpleState] = useState([[null]])

  const keysOfStateKey = Object.keys(stateKey)
  const electionYearDataDem = _.omit(electionData[props.active.dem_data], ['11'])
  const electionYearDataRep = electionData[props.active.rep_data]

  useEffect(() => {
    findMostPolarizedStates()
  }, [props.active])

  useEffect(() => {
    findleastPolarizedState()
  }, [props.active])

  const purpleScale = d3.scaleLinear()
  .domain([0, 100])
  .range(['#FF0000', '#0000FF'])

  const findMostPolarizedStates = () => {

    const mostPartisanDemFIPS_id = _.maxBy(_.keys(electionYearDataDem), o => electionYearDataDem[o])
    const mostPartisanRepFIPS_id = _.maxBy(_.keys(electionYearDataRep), o => electionYearDataRep[o])
    const mostPartisanDemState = stateKey[mostPartisanDemFIPS_id]
    const mostPartisanRepState = stateKey[mostPartisanRepFIPS_id]
    const mostPartisanDemStateVotePercent = electionYearDataDem[mostPartisanDemFIPS_id]
    const mostPartisanRepStateVotePercent = electionYearDataRep[mostPartisanRepFIPS_id]
    const mostPartisanDemColorRatio = (mostPartisanDemStateVotePercent/(mostPartisanDemStateVotePercent+(electionYearDataRep[mostPartisanDemFIPS_id])))*100
    const mostPartisanRepColorRatio = (1-(mostPartisanRepStateVotePercent/((electionYearDataDem[mostPartisanRepFIPS_id])+mostPartisanRepStateVotePercent)))*100
    const demPurpleShade = purpleScale(mostPartisanDemColorRatio)
    const repPurpleShade = purpleScale(mostPartisanRepColorRatio)

    let legendProps_mostPartisan = [[mostPartisanRepState, (_.floor(mostPartisanRepStateVotePercent*100)), repPurpleShade], [mostPartisanDemState, (_.floor(mostPartisanDemStateVotePercent*100)), demPurpleShade]]
    setLegendProps_mostPartisan(legendProps_mostPartisan)
  }

  const findleastPolarizedState = () => {

    keysOfStateKey.forEach((stateId) => {
      statePurpleRating[stateId] = Math.abs(electionYearDataDem[stateId] - electionYearDataRep[stateId]).toFixed(6)
    })

    const lowestPurpleValue = _.minBy(_.values(statePurpleRating))
    const mostPurpleStateFIPS_id = Object.keys(statePurpleRating).find(mostPurpleStateFIPS_id => statePurpleRating[mostPurpleStateFIPS_id] === lowestPurpleValue)

    const mostPurpleState = stateKey[mostPurpleStateFIPS_id]
    const mostPurpleStateVoteDifference = Math.abs(electionYearDataDem[mostPurpleStateFIPS_id]-electionYearDataRep[mostPurpleStateFIPS_id])


    const mostPurpleStateColorRatio = (electionYearDataDem[mostPurpleStateFIPS_id]/(electionYearDataDem[mostPurpleStateFIPS_id]+(electionYearDataRep[mostPurpleStateFIPS_id])))*100
    const mostPurpleStatePurpleShade = purpleScale(mostPurpleStateColorRatio)


    const legendProps_mostPurpleState = [[mostPurpleState, (_.floor(mostPurpleStateVoteDifference*100, 3)), mostPurpleStatePurpleShade]]
    setLegendProps_mostPurpleState(legendProps_mostPurpleState)
  }


  console.log('legendProps_mostPurpleState', legendProps_mostPurpleState)
  // console.log('mostPartisanDemState', mostPartisanDemState, mostPartisanDemStateVotePercent, mostPartisanDemColorRatio)
  // console.log('mostPartisanRepState', mostPartisanRepState, mostPartisanRepStateVotePercent, mostPartisanRepColorRatio)

  const renderMostPartisanInfo = (stop, i) => {
    return (
            <div key={i} className="txt-s mb2">
              <span className="mr6 ml6 align-middle">{`${stop[0]}`}</span>
              <span
                className="fr ml1 w24 h18 inline-block align-middle"
                style={{ backgroundColor: '#800080' }}
              />
              <span
                className="fr ml6 w24 h18 inline-block align-middle"
                style={{ backgroundColor: stop[2] }}
              />
              <span className="fr mr6 ml6 align-middle">{`${stop[1]}%`}</span>
            </div>
    )
  }

  const renderMostPurpleInfo = (stop, i) => {
    return (
          <div key={i} className="txt-s mb2">
            <span className="mr6 ml6 align-middle">{`${stop[0]}`}</span>
            <span
              className="fr ml1 w24 h18 inline-block align-middle"
              style={{ backgroundColor: '#800080' }}
            />
            <span
              className="fr ml6 w24 h18 inline-block align-middle"
              style={{ backgroundColor: stop[2] }}
            />
            <span className="fr mr6 ml6 align-middle">{`${stop[1]}%`}</span>
            </div>
    )
  }
  // <span className="txt-s txt-bold block  align-middle">Polarized </span>

  return (
    <>
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax600">
        <div className="mb6">
          <h2 className="txt-bold txt-m mb6 block">{props.active.description}</h2>
        </div>
        <div className="grid grid--gut6 w300 flex-parent--stretch-cross">
          <div className="col col--4">
            <div className="h-full">
              <span className="txt-s txt-bold block  align-middle">Most Polarized:</span>
            </div>
          </div>
          <div className="col col--8">
            <div className="h-full">
              {legendProps_mostPartisan.map(renderMostPartisanInfo)}
            </div>
          </div>
        </div>
        <div className="grid grid--gut6 flex-parent--stretch-cross">
          <div className="col col--4">
            <div className="h-full">
              <span className="txt-s txt-bold block align-middle">Most Purple:</span>
            </div>
          </div>
          <div className="col col--8">
            <div className="h-full">
              {legendProps_mostPurpleState.map(renderMostPurpleInfo)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Legend
