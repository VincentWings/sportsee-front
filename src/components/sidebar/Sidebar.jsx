/**
 * Sidebar component displays a navigation menu with activity links and a footer.
 * It also shows the current year in the footer dynamically.
 * @component
 */

import { Link } from "react-router-dom" // Importing Link component for navigation
import iconCycling from "../../assets/images/icon-cycling.svg" // Importing the cycling icon
import iconSwimming from "../../assets/images/icon-swimming.svg" // Importing the swimming icon
import iconWorkout from "../../assets/images/icon-workout.svg" // Importing the workout icon
import iconYoga from "../../assets/images/icon-yoga.svg" // Importing the yoga icon

import "./Sidebar.css" // Importing CSS styles for the sidebar

/**
 * Sidebar displays navigation links for different activities and the current year in the footer.
 * It uses icons for Yoga, Swimming, Cycling, and Workout activities.
 * @returns {JSX.Element} The Sidebar component.
 */
function Sidebar() {
  // Dynamically getting the current year
  const currentYear = new Date().getFullYear()

  return (
    <aside className="sidebar">
      {/* Sidebar menu with links to various activities */}
      <ul>
        {/* Link for Yoga activity */}
        <li>
          <Link to="/">
            <img src={iconYoga} className="icon" alt="Yoga" />
          </Link>
        </li>

        {/* Link for Swimming activity */}
        <li>
          <Link to="/">
            <img src={iconSwimming} className="icon" alt="Swimming" />
          </Link>
        </li>

        {/* Link for Cycling activity */}
        <li>
          <Link to="/">
            <img src={iconCycling} className="icon" alt="Cycling" />
          </Link>
        </li>

        {/* Link for Workout activity */}
        <li>
          <Link to="/">
            <img src={iconWorkout} className="icon" alt="Workout" />
          </Link>
        </li>
      </ul>

      {/* Footer displaying copyright information with the current year */}
      <footer className="copyright">
        Copyright, SportSee {currentYear}
      </footer>
    </aside>
  )
}

export default Sidebar