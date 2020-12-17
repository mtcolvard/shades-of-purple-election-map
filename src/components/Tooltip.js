import React from 'react'

const Tooltip = ({ feature }, props) => {
  const { id } = feature.properties

  return (
    <div id={`tooltip-${id}`}>
      <strong>{feature.properties.state}</strong>
      <br />
      <strong>{feature.properties[props.dem_data]}</strong>
      <strong>{feature.properties[props.rep_data]}</strong>
      </div>
  )
}

export default Tooltip
