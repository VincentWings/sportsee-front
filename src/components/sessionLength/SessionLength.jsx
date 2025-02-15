import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from "recharts"
import { getUserAverageSessions } from "../../service/MockData"
import CustomToolTip from "./CustomToolTip"

import "./SessionLength.css"

/**
 * SessionLength component to display average session length over a week.
 * This component fetches session data, formats it, and displays it in a line chart.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.userId - The ID of the user whose session data is displayed
 * @returns {JSX.Element} The line chart displaying the session length data
 */
const SessionLength = ({ userId }) => {
  // State to hold session data, loading state, and errors
  const [data, setData] = useState([])  // Stores the session data to be displayed
  const [loading, setLoading] = useState(true)  // Tracks loading state
  const [error, setError] = useState(null)  // Stores any error messages

  /**
   * Fetches session data when the component mounts or when userId changes.
   * It maps days of the week to their corresponding abbreviations.
   * 
   * The fetched data is formatted before being stored in state.
   */
  useEffect(() => {
    const dayToWeekday = {
      1: "L",
      2: "M",
      3: "M",
      4: "J",
      5: "V",
      6: "S",
      7: "D"
    }

    // Async function to fetch session data
    const fetchData = async () => {
      try {
        const userSessions = await getUserAverageSessions(userId)
        // Check if data is available
        if (!userSessions || !userSessions.sessions) {
          throw new Error("Aucune donnée de session trouvée.")
        }

        // Format the session data, adding the weekday abbreviation
        const formattedData = [
          { weekday: "", sessionLength: 0 }, // Start placeholder
          ...userSessions.sessions.map((session) => ({
            ...session,
            weekday: dayToWeekday[session.day]
          })),
          { weekday: "", sessionLength: 0 } // End placeholder
        ]

        setData(formattedData) // Update state with formatted data
      } catch (err) {
        setError(err.message) // Handle errors
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchData() // Call the fetch function
  }, [userId]) // Re-run this effect when userId changes

  // Display loading message or error if applicable
  if (loading) return <p>Chargement des données...</p>
  if (error) return <p>{error}</p>

  /**
   * Custom cursor component for the chart hover effect.
   * 
   * This component creates a transparent rectangle to indicate the active region 
   * when hovering over the chart.
   * 
   * @component
   * @param {Object} props - Component props
   * @param {Array} props.points - Points from the chart where the cursor is active
   * @param {number} props.width - Width of the chart container
   * @param {number} props.height - Height of the chart container
   * @returns {JSX.Element} A rectangle representing the cursor hover effect
   */
  const CustomCursor = ({ points, width, height }) => {
    if (!points || points.length === 0) return null
    const { x } = points[0]
    const rightMargin = 20

    return (
      <Rectangle 
        x={x} 
        y={0} 
        width={width - x + rightMargin} 
        height={height * 2} 
        fill="rgba(0, 0, 0, 0.1)" // Transparent background with opacity 0.1
      />
    )
  }

  // Prop validation for CustomCursor
  CustomCursor.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    height: PropTypes.number
  }

  // Main component render
  return (
    <div className="session-length-chart">
      <h2 className="chart-title">
        <span className="white-color">Durée moyenne des sessions</span>
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 24, right: -20, left: -20, bottom: 5 }}>
          <Tooltip content={<CustomToolTip />} cursor={<CustomCursor />} />
          
          {/* Line representing session length */}
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#colorUv)"
            strokeWidth={3}
            activeDot={{
              stroke: "#ffffff",
              strokeWidth: 4,
              r: 2
            }}
            dot={false} // Disable dots on the line
          />

          {/* X-Axis displaying weekdays */}
          <XAxis
            dataKey="weekday"
            tick={{ fontSize: "0.75rem", fontWeight: 500, fill: "#ffffff" }}
            tickLine={false}
            axisLine={false}
          />
          
          {/* Y-Axis hiding to focus on the line */}
          <YAxis hide domain={["dataMin-10", "dataMax+10"]} />

          {/* Gradient for line color */}
          <defs>
            <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Prop validation for SessionLength component
SessionLength.propTypes = {
  userId: PropTypes.number.isRequired // userId is a required prop
}

export default SessionLength