import React from 'react'

const Tooltip = (props) => {
  const { id, properties } = props.feature
  const { year, dem_data, rep_data } = props.active
  console.log(dem_data)

  // <div className='flex-parent flex-parent--center-main '>
    // </div>


  return (
    <div id={`tooltip-${id}`}>
      <div className= "flex-child mr6 align-middle txt-h5">{properties.STUSPS}: {year}</div>
        <div className=" mr6 w42 h18 inline-block color-gray-faint txt-h6 txt-bold px3 align-middle"
          style={{ backgroundColor: '#FF0000' }}>
          {(properties[rep_data]*100).toFixed(1)}%</div>
        <br />
        <div className="flex-child mr6 w42 h18 inline-block color-gray-faint txt-h6 txt-bold px3 align-middle"
        style={{ backgroundColor: '#0000FF' }}>
      {(properties[dem_data]*100).toFixed(1)}%</div>
        <br />

    </div>
  )
}
export default Tooltip
