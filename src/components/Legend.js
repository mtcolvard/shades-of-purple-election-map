
import React, { useEffect} from 'react';
var _ = require('lodash')

const Legend = (props) => {
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


  // useEffect(() => {
  //   maxKey()
  //   testData()
  // }, [])

  // let maxKey = () => { _.max(Object.keys(props.active.election), o => props.active.election[o])}
  //
  // const testData = () => {
  //   console.log('maxKey', stateKey[0][maxKey])
  //
  //  }

  // const renderLegendKeys = (election, i) => {
  //   return (
  //     <div key={i} className="txt-s">
  //       <span
  //         className="mr6 round-full w12 h12 inline-block align-middle"
  //         style={{ backgroundColor: election[1] }}
  //       />
  //       <span>{`${stateKey[maxKey].toLocaleString()}`}</span>
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
        <div className="mb6">
          <h2 className="txt-bold txt-s block">{props.active.name}</h2>
          <p className="txt-s color-gray">{props.active.description}</p>
        </div>

      </div>
    </>
  );
};

export default Legend;

// <div  className="txt-s">
//   <span
//     className="mr6 round-full w12 h12 inline-block align-middle"
//     style={{ backgroundColor: '#FF0000' }}
//   />
//   <span>{`${stateKey[maxKey]}`}</span>
// </div>
