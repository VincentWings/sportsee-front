/**
 * SpentEnergy component displays the energy spent for a particular activity.
 * It takes an icon, number, unit, and name as props.
 * 
 * @component
 * @param {Object} props - The props for the SpentEnergy component.
 * @param {string} props.icon - Path to the icon representing the activity.
 * @param {string|number} props.number - The number of energy units spent.
 * @param {string} props.unit - The unit of measurement (e.g., "kcal").
 * @param {string} props.name - The name of the activity (e.g., "Running").
 * @returns {JSX.Element} The rendered SpentEnergy component.
 */

import PropTypes from "prop-types" // Importing PropTypes to define the prop types

// Functional component for SpentEnergy
const SpentEnergy = ({ icon, number, unit, name }) => {
	return (
		<div className="spent-energy">
			{/* Displaying the activity icon */}
			<img src={icon} alt={name} className="spent-energy--icon" />
			<div className="spent-energy--info">
				{/* Displaying the energy spent with the unit */}
				<p className="spent-energy--number">
					{number} <span>{unit}</span>
				</p>
				{/* Displaying the activity name */}
				<p className="spent-energy--name">{name}</p>
			</div>
		</div>
	)
}

// Defining the expected prop types for the SpentEnergy component
SpentEnergy.propTypes = {
	icon: PropTypes.string.isRequired, // Path to the icon
	number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Energy number
	unit: PropTypes.string.isRequired, // Energy unit (e.g., "kcal")
	name: PropTypes.string.isRequired // Name of the activity (e.g., "Running")
}

export default SpentEnergy // Exporting the SpentEnergy component
