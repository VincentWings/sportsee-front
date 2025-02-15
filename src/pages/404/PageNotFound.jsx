// Import the NavLink component from 'react-router-dom' for navigation links
import { NavLink } from "react-router-dom"

// Import the CSS file to apply custom styles for the PageNotFound component
import './PageNotFound.css'

/**
 * PageNotFound component displays a 404 error message when the user navigates to a non-existing page.
 * It provides a link to navigate back to the homepage.
 */
function PageNotFound() {
  return (
    <>
      {/* Display the '404' error code in a styled heading */}
      <h1 className='error404'>404</h1>
      
      {/* Inform the user that the page is not found or has been moved */}
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      
      {/* Provide a navigation link back to the homepage using NavLink */}
      <p>Retournez à l'<NavLink to="/">accueil</NavLink>.</p>
    </>
  )
}

/**
 * Export the PageNotFound component so it can be used in other parts of the application
 * This allows the component to be imported and rendered in a router when a 404 error occurs.
 */
export default PageNotFound