import React, { useState, useEffect} from 'react'
import electionData from '../data_for_legend_calculations_minus_dc.json'
import _ from 'lodash'
var d3 = require('d3')

const Legend = (props) => {
  const stateKey = {
  '01': 'Alabama','02': 'Alaska', '04': 'Arizona', '05': 'Arkansas', '06': 'California', '08': 'Colorado', '09': 'Connecticut', '10': 'Delaware', '11': 'District of Columbia', '12': 'Florida', '13': 'Georgia', '15': 'Hawaii', '16': 'Idaho', '17': 'Illinois', '18': 'Indiana', '19': 'Iowa', '20': 'Kansas', '21': 'Kentucky', '22': 'Louisiana', '23': 'Maine', '24': 'Maryland', '25': 'Massachusetts', '26': 'Michigan', '27': 'Minnesota', '28': 'Mississippi', '29': 'Missouri', '30': 'Montana', '31': 'Nebraska', '32': 'Nevada', '33': 'New Hampshire', '34': 'New Jersey', '35': 'New Mexico', '36': 'New York', '37': 'North Carolina', '38': 'North Dakota', '39': 'Ohio', '40': 'Oklahoma', '41': 'Oregon', '42': 'Pennsylvania', '44': 'Rhode Island', '45': 'South Carolina', '46': 'South Dakota', '47': 'Tennessee', '48': 'Texas', '49': 'Utah', '50': 'Vermont', '51': 'Virginia', '53': 'Washington', '54': 'West Virginia', '55': 'Wisconsin', '56': 'Wyoming'}

  const [statePurpleRating, setStatePurpleRating] = useState({null: null})
  const [legendProps_mostRepublican, setLegendProps_mostRepublican] = useState([[null]])
  const [legendProps_mostDemocrat, setLegendProps_mostDemocrat] = useState([[null]])
  const [legendProps_mostPurpleState, setLegendProps_mostPurpleState] = useState([[null]])
  const [legendProps_scale] = useState([['Reference Spectrum:', null, null, '#800080']])

  const keysOfStateKey = Object.keys(stateKey)
  const electionYearDataDem = electionData[props.active.dem_data]
  const electionYearDataRep = electionData[props.active.rep_data]
  const electionYearVoterTurnout = _.ceil(electionData[props.active.participation]['155']*100, 3).toPrecision(3)
  const protestVote = _.ceil(electionData[props.active.protest_vote]['155']*100, 2).toPrecision(3)


  console.log('protestVote', protestVote)


  console.log('electionYearVoterTurnout', electionYearVoterTurnout)
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

    const legendProps_mostRepublican = [['Most Republican: ', mostPartisanRepState, (_.ceil(mostPartisanRepStateVotePercent*100)), repPurpleShade]]
    setLegendProps_mostRepublican(legendProps_mostRepublican)

    const legendProps_mostDemocrat = [['Most Democrat: ', mostPartisanDemState, (_.ceil(mostPartisanDemStateVotePercent*100)), demPurpleShade]]
    setLegendProps_mostDemocrat(legendProps_mostDemocrat)
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
    const plusMinus = '±'
    const centristVoteDifference = (_.ceil(mostPurpleStateVoteDifference*100, 2)).toString()

    const legendProps_mostPurpleState = [['Most Centrist: ', mostPurpleState, plusMinus.concat( centristVoteDifference), mostPurpleStatePurpleShade]]
    setLegendProps_mostPurpleState(legendProps_mostPurpleState)
  }

  const legendProps_otherInfo = [['Voter Turnout:', null, _.ceil(electionYearVoterTurnout, 4), null], [' Votes 3rd-Party:', null, protestVote, null]]



    const renderData = (item, i) => {
    return (
      <div key={i} className="txt-s mb2">
        <div className="grid gridLines grid--gut3  flex-parent flex-parent--row-reverse">
          <span
            className="col--1 h18 inline-block  flex-child"
            style={{ backgroundColor: '#800080' }}
          />
          <span
            className="col--1  h18 inline-block  flex-child"
            style={{ backgroundColor: item[3] }}
          />
          <span className="col--2  flex-child">{`${item[2]}%`}</span>
          <span className="col fl   flex-child">{`${item[1]}`}</span>
          <span className="col--4 txt-s txt-bold inline-block flex-child">{`${item[0]}`}</span>
        </div>
      </div>
    )
  }

  const renderScaleInfo = (item, i) => {
    return (
      <div key={i} className="txt-s mb2">
        <div className="grid gridLines grid--gut3 flex-parent flex-parent--row-reverse">
          <div className="col--2  h18 inline-block  flex-child" style={{ backgroundImage: 'linear-gradient(to right, #FF0000 0%,  #800080 50%, #0000FF 100%)'}}>
          </div>
          <span className="col ml-neg3 txt-s txt-bold inline-block flex-child">{`${item[0]}`}</span>
        </div>
      </div>
    )
  }


  const renderOtherInfo = (item, i) => {
    return(
      <div className="grid  gridLines grid--gut3 flex-parent flex-parent--row-reverse">
        <div className="col--2  h18 inline-block  flex-child" style={{ backgroundImage: '#FFFFFF'}}></div>
        <span className="col--2 txt-s  flex-child">{`${item[2]}%`}</span>
        <span className="col txt-s txt-bold  flex-child"></span>
        <span className="col ml-neg3 txt-s txt-bold inline-block flex-child">{`${item[0]}`}</span>
      </div>

    )
  }

  return (
    <>
      <div className="bg-white absolute bottom right mb24 py12 px12 shadow-darken10 round z1 wmax600">
        <div className="mb6">
          <h2 className="txt-bold txt-l mb6 ml-neg3">{props.active.description} </h2>
        </div>
        {legendProps_scale.map(renderScaleInfo)}
        {legendProps_mostRepublican.map(renderData)}
        {legendProps_mostDemocrat.map(renderData)}
        {legendProps_mostPurpleState.map(renderData)}
        <br />
        {legendProps_otherInfo.map(renderOtherInfo)}
      </div>
    </>
  )
}

export default Legend
