// Import the CSS file to apply custom styles for the Community component
import './Community.css'

/**
 * Community component renders a message about the upcoming features of the community section.
 * It currently displays a "Coming Soon!" message for the users.
 */
function Community() {
  return (
    <>
      {/* Display the title of the community section */}
      <h1>Communauté</h1>
      
      {/* Inform the user that the community feature is coming soon */}
      <p>Coming Soon!</p>
    </>
  )
}

/**
 * Export the Community component so it can be used in other parts of the application.
 * This allows it to be imported and rendered in the appropriate route or page.
 */
export default Community