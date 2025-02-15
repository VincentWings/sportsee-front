import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { getUserMainData } from "../../service/MockData"

import "./Score.css"

/**
 * Score component that displays the user's score in a pie chart.
 * 
 * The component fetches user data based on the provided userId and shows their score.
 * If the score data is unavailable or an error occurs, an error message is displayed.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.userId - The ID of the user whose score data is fetched
 * @returns {JSX.Element} A pie chart displaying the user's score
 */
const Score = ({ userId }) => {
  // State for storing the score, loading state, and error message
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch the score data when the component mounts or userId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from the mock service
        const userData = await getUserMainData(userId)
        
        // If no data is found, throw an error
        if (!userData) {
          throw new Error("No score data found")
        }

        // Retrieve the score, preferring todayScore if available
        const userScore = userData.todayScore ?? userData.score
        
        // If the score is undefined, throw an error
        if (userScore === undefined) {
          throw new Error("Invalid score format")
        }

        // Set the score state
        setScore(userScore)
      } catch (err) {
        // If an error occurs, set the error message
        setError(err.message)
      } finally {
        // Set loading to false once the fetch is done
        setLoading(false)
      }
    }

    fetchData() // Fetch the data
  }, [userId]) // Depend on userId, so it updates if userId changes

  // If data is loading, display loading message
  if (loading) return <p>Loading score data...</p>

  // If there's an error, display the error message
  if (error) return <p className="error-message">{error}</p>

  // Prepare the data for the pie chart
  const data = [
    { name: "Achieved", value: score },
    { name: "Remaining", value: 1 - score }, // Remaining value to complete 100%
  ]

  return (
    <div className="score-container">
      {/* Title of the score chart */}
      <h2 className="score-title">Score</h2>

      {/* Responsive container to ensure the chart is properly sized */}
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          {/* Background white circle */}
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            outerRadius="90%" // White outer circle
            fill="#fff"
            stroke="transparent"
            isAnimationActive={false}
          />
          
          {/* The actual score circle, red for the achieved part */}
          <Pie
            data={data}
            dataKey="value"
            innerRadius="80%" // Inner radius for the score chart
            outerRadius="95%" // Outer radius to match the outer circle thickness
            startAngle={90}
            endAngle={450}
            cornerRadius={10} // Round the corners of the pie slice
          >

            <Cell key="cell-achieved" fill="#ff0200" stroke="transparent" />

            <Cell key="cell-remaining" fill="transparent" stroke="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Score legend */}
      <div className="score-legend">
        <span>{Math.round(score * 100)}%</span> {/* Display the score as percentage */}
        <span>de votre objectif</span> {/* Text description */}
      </div>
    </div>
  )
}

// Prop types for the component, ensuring userId is a number
Score.propTypes = {
  userId: PropTypes.number.isRequired,
}

export default Score