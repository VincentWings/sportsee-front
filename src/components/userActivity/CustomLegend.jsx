import PropTypes from "prop-types"

/**
 * CustomLegend component displays a legend for the daily activity chart.
 * It maps over the provided payload data and displays each entry with its respective color and value.
 * 
 * @component
 * @param {Object} props - The props for the CustomLegend component.
 * @param {Array} props.payload - The array of data to display in the legend.
 * @param {string} props.payload[].color - The color representing the activity in the legend.
 * @param {string} props.payload[].value - The name or value of the activity.
 * @returns {JSX.Element|null} The rendered legend or null if no data is provided.
 */

function CustomLegend({ payload }) {
  // Ensure payload exists and contains items before rendering the component
  if (!payload || payload.length === 0) return null

  return (
    <div className="custom-legend">
      {/* Title of the chart */}
      <h2 className="chart-title">Activité quotidienne</h2>

      {/* Iterate over the payload to render each legend item */}
      {payload.map((entry, index) => (
        <div key={index} className="chart-legend">
          {/* Display a small colored circle representing the data's color */}
          <div
            className="legend-color"
            style={{
              backgroundColor: entry.color // Dynamically set the background color based on the entry's color
            }}
          />
          
          {/* Display the legend text corresponding to the activity */}
          <span className="activity-chart--legend">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

// Prop validation for the component
CustomLegend.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired, // Color for the legend item
      value: PropTypes.string.isRequired // Text representing the activity
    })
  ).isRequired // The payload array must always be provided
}

export default CustomLegend // Exporting the CustomLegend component for use in other parts of the app