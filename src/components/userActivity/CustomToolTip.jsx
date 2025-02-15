import PropTypes from "prop-types"

/**
 * CustomToolTip component displays a tooltip when hovering over the activity chart.
 * The tooltip shows the weight (kg) and calories (kcal) based on the provided data payload.
 * 
 * @component
 * @param {Object} props - The props for the CustomToolTip component
 * @param {boolean} props.active - Determines if the tooltip is visible
 * @param {Array} props.payload - The data array to populate the tooltip
 * @param {number} props.payload[].value - The value of the specific data point (weight in kg or calories in kcal)
 * @returns {JSX.Element|null} The rendered tooltip or null if the tooltip is inactive or has no data
 */
function CustomToolTip({ active = false, payload = [] }) {
  // If the tooltip is inactive or there is no data, don't render anything
  if (!active || !payload.length) return null

  return (
    <div className="activity-chart--tooltip">
      {/* Display weight in kg */}
      <span>{`${payload[0]?.value} kg`}</span>

      {/* Display calories in Kcal */}
      <span>{`${payload[1]?.value} Kcal`}</span>
    </div>
  )
}

// PropTypes for type validation
CustomToolTip.propTypes = {
  active: PropTypes.bool, // Tooltip visibility status
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number // Ensure the 'value' field in payload is a number
    })
  ) // Expect an array of objects with a 'value' key
}

export default CustomToolTip // Exporting the component for use in other parts of the app