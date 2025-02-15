import UserActivity from "../../components/userActivity/UserActivity" 
import SessionLength from "../../components/sessionLength/SessionLength"
import ActivityType from "../../components/activityType/ActivityType"
import Score from "../../components/score/Score"
import SpentEnergy from "../../components/spentEnergy/SpentEnergy.jsx"

import caloriesIcon from "../../assets/images/icon-calories.svg"
import proteinIcon from "../../assets/images/icon-protein.svg"
import carbsIcon from "../../assets/images/icon-carbs.svg"
import fatIcon from "../../assets/images/icon-fat.svg"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import { getUserMainData } from "../../service/MockData"

import "./Dashboard.css"

/**
 * Dashboard component displaying user data, including activity, scores, and energy spent
 * @component
 * @example
 * return (
 *   <Dashboard />
 * )
 */
const Dashboard = () => {
	// Retrieve user ID from URL parameters
	const { id } = useParams() // Get ID from URL
	const numericUserId = parseInt(id, 10) // Convert string to number for further use
	const { setUserId } = useUser() // Set user ID in context for state management
	const [user, setUser] = useState(null) // State to store user data
	const [loading, setLoading] = useState(true) // Loading state to show loading indicator
	const [error, setError] = useState(null) // Error state to handle any issues during data fetching

	/**
	 * Fetches the user's main data after the component mounts
	 * Updates the context with the user ID and stores the fetched data in state
	 */
	useEffect(() => {
		// Set user ID in context so it's available globally
		setUserId(numericUserId)

		// Function to fetch user data
		const fetchData = async () => {
			try {
				// Fetch user data using the provided ID
				const userData = await getUserMainData(id)
				setUser(userData) // Set the user data in state
			} catch (err) {
				// Handle errors if the data fetch fails
				setError("Failed to load user data.")
				console.error(err) // Log the error for debugging purposes
			} finally {
				// Once data is fetched or error occurred, set loading to false
				setLoading(false)
			}
		}

		fetchData() // Invoke the fetch function
	}, [id, numericUserId, setUserId]) // Re-run the effect if ID or user context changes

	// If data is still loading, show a loading message
	if (loading) return <p>Loading...</p>

	// If there's an error, show an error message
	if (error) return <p>{error}</p>

	// Destructure keyData from user to extract calories, protein, carbs, and fat
	const { calories = 0, protein = 0, carbs = 0, fat = 0 } = user.keyData || {}

	// Array of objects to hold information for the energy stats display
	const energyList = [
		{ icon: caloriesIcon, number: calories.toLocaleString("fr-FR"), unit: "kCal", name: "Calories" },
		{ icon: proteinIcon, number: protein, unit: "g", name: "Protéines" },
		{ icon: carbsIcon, number: carbs, unit: "g", name: "Glucides" },
		{ icon: fatIcon, number: fat, unit: "g", name: "Lipides" }
	]

	return (
		<div className="dashboard">
			<section className="dashboard-header">
				<h1 className="dashboard-title">
					Bonjour <span className="highlight">{user.userInfos.firstName}</span>
				</h1>
				
				<p className="dashboard-subtitle">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
			</section>

			<section className="dashboard-content">
				<div className="charts-container">
					<UserActivity userId={numericUserId} /> {/* Component to display user activity data */}

					<div className="small-charts">
						<SessionLength userId={numericUserId} /> {/* Component to display session length data */}

						<ActivityType userId={numericUserId} /> {/* Component to display activity type data */}

						<Score userId={numericUserId} /> {/* Component to display score data */}
					</div>
				</div>

				<div className="stats-container">
					{/* Map through energy data and render SpentEnergy components */}
					{energyList.map((data, index) => (
						<SpentEnergy key={index} icon={data.icon} number={data.number} unit={data.unit} name={data.name} />
					))}
				</div>
			</section>
		</div>
	)
}

export default Dashboard