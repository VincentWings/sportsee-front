import PropTypes from "prop-types"
import "./CustomToolTip.css"

/**
 * CustomToolTip component that displays the session length in a tooltip.
 * 
 * This component is designed to be used with chart libraries like Recharts to
 * display the length of a session when hovering over a chart item.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.active - Determines if the tooltip is active and should be displayed
 * @param {Array} props.payload - The data passed to the tooltip, typically containing the session length
 * @returns {JSX.Element|null} The tooltip with session length or null if not active or no data
 */
function CustomToolTip({ active, payload }) {
  // Check if the tooltip should be visible and if there's data to display
  if (active && payload && payload.length) {
    return (
      <div className="session-length-chart--tooltip">
        {/* Display the session length in minutes */}
        <span>{payload[0].value + " min"}</span>
      </div>
    )
  }

  // If no data or not active, return null (no tooltip)
  return null
}

// Prop validation for the component
CustomToolTip.propTypes = {
  active: PropTypes.bool, // Determines if the tooltip is active
  payload: PropTypes.arrayOf(PropTypes.object) // Data passed to the tooltip
}

export default CustomToolTip