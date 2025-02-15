// Importing necessary libraries for routing and styles
import { Link } from "react-router-dom" // React Router's Link for navigation
import "./Homepage.css" // Importing the CSS for styling

/**
 * Homepage component displays a list of users with links to their individual pages.
 * It dynamically generates user links based on an array of users.
 */
function Homepage() {
  // Defining an array of users to dynamically generate links
  const users = [
    { id: 12, name: "Utilisateur 12" },
    { id: 18, name: "Utilisateur 18" }
  ]

  return (
    <>
      {/* Display the main title of the page */}
      <h1>Choisir un utilisateur</h1>

      <div className="user-selector">
        {/* Loop through the users array to generate user links */}
        {users.map((user) => (
          // Link to the individual user page with a dynamic user ID
          <Link to={`/user/${user.id}`} key={user.id} className="user-link">
            
            {/* Icon for the user */}
            <div className="user-image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 16 16"
                className="bi bi-person-circle"
              >
                {/* User icon: circle with user silhouette */}
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </div>

            {/* Display the user’s name */}
            <p>{user.name}</p>
          </Link>
        ))}
      </div>
    </>
  )
}

/**
 * Export the Homepage component so it can be used in other parts of the application.
 * This allows it to be rendered when the corresponding route is accessed.
 */ 
export default Homepage