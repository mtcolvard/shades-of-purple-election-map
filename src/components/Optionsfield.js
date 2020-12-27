import React from "react"
// props.useTooltip(i)

const Optionsfield = (props) => {
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container toggle-group--s">
        <input
          onChange={() =>
            props.changeState(i)
        }
          checked={option.property === props.property}
          name="toggle-small"
          type="radio"
        />
        <div className="toggle toggle--s txt-s  px12-mm toggle--active-white toggle-padding">
          {option.year}
        </div>
      </label>
    )
  }
  return (
    <div className={props.classNames}>
      {props.options.map(renderOptions)}
    </div>
  )
}

export default Optionsfield
