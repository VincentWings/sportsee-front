import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getUserActivity } from "../../service/MockData"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts"

import CustomToolTip from "./CustomToolTip"
import CustomLegend from "./CustomLegend"

/**
 * UserActivity component renders a chart displaying a user's activity (weight and calories burned) over time.
 * It fetches user activity data based on the provided userId, handles loading and error states, 
 * and displays the data in a bar chart with tooltips and custom legends.
 *
 * @component
 * @param {Object} props - The props for the UserActivity component
 * @param {string|number} props.userId - The unique identifier for the user whose activity data will be displayed
 * @returns {JSX.Element} The UserActivity chart component
 */
const UserActivity = ({ userId }) => {
	// Get CSS variables for styling from the root document
	const rootStyles = getComputedStyle(document.documentElement)
	const colorRedDark = rootStyles.getPropertyValue("--color-red-dark").trim()
	const colorGreyDark = rootStyles.getPropertyValue("--color-grey-dark").trim()
	const colorGreyLight = rootStyles.getPropertyValue("--color-grey-light").trim()
	const colorGreyLightAlt = rootStyles
		.getPropertyValue("--color-grey-lighter-alt")
		.trim()

	// State hooks for storing user activity data and any errors
	const [userActivity, setUserActivity] = useState(null)
	const [error, setError] = useState(null)

	/**
	 * Fetches user activity data using the userId prop.
	 * Sets the fetched data in the state or handles errors if the fetch fails.
	 */
	useEffect(() => {
		const fetchActivityData = async () => {
			try {
				// Fetch activity data based on userId prop
				const activityData = await getUserActivity(userId)
				setUserActivity(activityData)
				setError(null) // Reset error state if fetch is successful
			} catch (err) {
				console.error("Failed to fetch user activity:", err)
				setError(err.message) // Set error state if fetch fails
			}
		}

		fetchActivityData()
	}, [userId]) // Re-run the effect when userId changes

	// Show error message if there's a fetch error
	if (error) {
		return <p>Error loading user activity: {error}</p>
	}

	// Show loading message if user activity is not yet available
	if (!userActivity || !userActivity.sessions) {
		return <p>Loading user activity...</p>
	}

	// Destructure data to be used in the chart
	const data = userActivity.sessions

	return (
		<div className="activity-chart">
			{/* Make the chart responsive */}
			<ResponsiveContainer width="100%" height={320}>
				<BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barGap={8}>
					{/* Grid lines for the chart */}
					<CartesianGrid
						stroke={colorGreyLightAlt}
						strokeDasharray="2 2"
						horizontal
						vertical={false}
					/>

					{/* X-axis configuration */}
					<XAxis
						dataKey="day"
						tickFormatter={(day) => new Date(day).getDate()} // Format the day (only date part)
						tick={{ fill: colorGreyLight }}
						tickLine={false}
						stroke={colorGreyLightAlt}
						strokeWidth={1}
						tickMargin={14}
						padding={{ left: 0, right: 0 }} // Adjust padding for better spacing
					/>

					{/* Y-axis configuration */}
					<YAxis
						orientation="right"
						tick={{ fill: colorGreyLight }}
						tickLine={false}
						axisLine={false}
						domain={["dataMin", "dataMax"]} // Use the data's min and max for the Y-axis range
						ticks={(() => {
							// Dynamically calculate the Y-axis ticks based on the data
							const minValue = Math.min(
								...data.map((item) => item.kg),
								...data.map((item) => item.calories)
							)

							const maxValue = Math.max(
								...data.map((item) => item.kg),
								...data.map((item) => item.calories)
							)

							// Calculate 3 ticks for the Y-axis
							const numberOfTicks = 3
							const step = (maxValue - minValue) / (numberOfTicks - 1)
							const ticks = [Math.ceil(minValue - 60)] // Start with the minimum value, minus a margin

							for (let i = 1; i < numberOfTicks - 1; i++) {
								ticks.push(Math.ceil(minValue + step * i)) // Add calculated intermediate ticks
							}

							ticks.push(Math.ceil(maxValue + 20)) // Add a margin above the maximum value
							return ticks
						})()}

						tickMargin={30}
					/>

					{/* Tooltip configuration */}
					<Tooltip
						content={<CustomToolTip />}
						cursor={{ fill: "rgba(196, 196, 196, 0.5)" }} // Add a cursor effect on hover
					/>

					{/* Bars representing the data */}
					<Bar dataKey="kg" fill={colorGreyDark} name="Poids (kg)" radius={[4, 4, 0, 0]} barSize={8} />

					<Bar
						dataKey="calories"
						fill={colorRedDark}
						name="Calories brûlées (kCal)"
						radius={[4, 4, 0, 0]} // Rounded corners for the bars
						barSize={8} // Adjust bar width
					/>

					{/* Custom legend configuration */}
					<Legend content={(props) => <CustomLegend {...props} />} verticalAlign="top" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

// Prop type validation for the UserActivity component
UserActivity.propTypes = {
	userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // userId should be either string or number
}

export default UserActivity