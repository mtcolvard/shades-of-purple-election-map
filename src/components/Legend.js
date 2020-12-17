import React, { useEffect} from 'react'
import electionData from '../historicElectionResults.json'
var _ = require('lodash')
var d3 = require('d3')


const Legend = (props) => {
  const stateKey = {
  '01': 'Alabama','02': 'Alaska', '04': 'Arizona', '05': 'Arkansas', '06': 'California', '08': 'Colorado', '09': 'Connecticut', '10': 'Delaware', '11': 'District of Columbia', '12': 'Florida', '13': 'Georgia', '15': 'Hawaii', '16': 'Idaho', '17': 'Illinois', '18': 'Indiana', '19': 'Iowa', '20': 'Kansas', '21': 'Kentucky', '22': 'Louisiana', '23': 'Maine', '24': 'Maryland', '25': 'Massachusetts', '26': 'Michigan', '27': 'Minnesota', '28': 'Mississippi', '29': 'Missouri', '30': 'Montana', '31': 'Nebraska', '32': 'Nevada', '33': 'New Hampshire', '34': 'New Jersey', '35': 'New Mexico', '36': 'New York', '37': 'North Carolina', '38': 'North Dakota', '39': 'Ohio', '40': 'Oklahoma', '41': 'Oregon', '42': 'Pennsylvania', '44': 'Rhode Island', '45': 'South Carolina', '46': 'South Dakota', '47': 'Tennessee', '48': 'Texas', '49': 'Utah', '50': 'Vermont', '51': 'Virginia', '53': 'Washington', '54': 'West Virginia', '55': 'Wisconsin', '56': 'Wyoming'}


  const electionYearDataDem = _.omit(electionData[props.active.dem_data], ['11'])
  const mostPartisanDemFIPS_id = _.maxBy(_.keys(electionYearDataDem), o => electionYearDataDem[o])
  const mostPartisanDemState = stateKey[mostPartisanDemFIPS_id]
  const mostPartisanDemStateVotePercent = electionYearDataDem[mostPartisanDemFIPS_id]

  const repElectionYearData = electionData[props.active.rep_data]
  const mostPartisanRepFIPS_id = _.maxBy(_.keys(repElectionYearData), o => repElectionYearData[o])
  const mostPartisanRepState = stateKey[mostPartisanRepFIPS_id]
  const mostPartisanRepStateVotePercent = repElectionYearData[mostPartisanRepFIPS_id]

  const purpleScale = d3.scaleLinear()
  .domain([0, 100])
  .range(['#FF0000', '#0000FF'])
  const demPurpleShade = (mostPartisanDemStateVotePercent/(mostPartisanDemStateVotePercent+(repElectionYearData[mostPartisanDemFIPS_id])))*100
  const repPurpleShade = (1-(mostPartisanRepStateVotePercent/((electionYearDataDem[mostPartisanRepFIPS_id])+mostPartisanRepStateVotePercent)))*100
  const demPurple = purpleScale(demPurpleShade)
  const repPurple = purpleScale(repPurpleShade)

  let legendProps = [[mostPartisanDemState, (_.floor(mostPartisanDemStateVotePercent*100)), demPurple], [mostPartisanRepState, (_.floor(mostPartisanRepStateVotePercent*100)), repPurple]]

  console.log('mostPartisanDemState', mostPartisanDemState, mostPartisanDemStateVotePercent, demPurpleShade)
  console.log('mostPartisanRepState', mostPartisanRepState, mostPartisanRepStateVotePercent, repPurpleShade)

  const renderLegendKeys = (stop, i) => {
    return (
            <div key={i} className="txt-s mb2">
              <span className="align-middle mr6">{`${stop[0]}`}</span>
              <span
              className="fr ml1 w24 h18 inline-block align-middle"
              style={{ backgroundColor: '#800080' }}
              />
              <span
              className="fr ml6 w24 h18 inline-block align-middle"
              style={{ backgroundColor: stop[2] }}
              />
              <span className="align-middle fr mr6 align-middle">{`${stop[1]}%`}</span>
            </div>
    )
  }


  // <table className='table'>
  //   <tbody>
  //     <tr>
  //       <td>
  //         <span>{`${stop[0]}`}</span>
  //       </td>
  //       <td>
  //         <span
  //         className="fr ml3 w24 h12 inline-block align-middle"
  //         style={{ backgroundColor: '#800080' }}
  //         />
  //       </td>
  //       <td>
  //         <span
  //         className="fr ml6 w24 h12 inline-block align-middle"
  //         style={{ backgroundColor: stop[2] }}
  //         />
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>

  return (
    <>
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax600">
        <div className="mb6">
          <h2 className="txt-bold txt-s block">{props.active.name}</h2>
          <p className="txt-s color-gray">{props.active.description}</p>
        </div>
        <div className="grid grid--gut4 flex-parent--stretch-cross">
          <div className="col col--4">
            <div className="h-full">
              <span className="txt-s txt-bold block"> Most Polarized </span>
            </div>
          </div>
          <div className="col col--8">
            <div className="h-full">
              {legendProps.map(renderLegendKeys)}
            </div>
          </div>
        </div>
        <div className="grid grid--gut4 flex-parent--stretch-cross">
          <div className="col col--4">
            <div className="h-full">
              <span className="txt-s txt-bold block"> Most Purple </span>
            </div>
          </div>
          <div className="col col--8">
            <div className="h-full">
              {legendProps.map(renderLegendKeys)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Legend
