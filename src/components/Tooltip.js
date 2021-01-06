import React from 'react'

const Tooltip = ({feature, active}) => {
  const { id, properties } = feature
  const {dem_data, rep_data } = active.current

  return (
    <div id={`tooltip-${id}`} className="mt-neg6 mb-neg12 ml-neg6 ">
      <div className= "txt-h5" >{properties.State}</div>
        <div className="inline-block w42 h18 color-gray-faint txt-h6 txt-bold px3"
          style={{ backgroundColor: '#FF0000' }}>
          {(properties[rep_data]*100).toFixed(1)}%</div>
        <br />
        <div className="inline-block w42 h18 color-gray-faint txt-h6 txt-bold px3"
          style={{ backgroundColor: '#0000FF' }}>
        {(properties[dem_data]*100).toFixed(1)}%</div>
    </div>
  )
}
export default Tooltip
