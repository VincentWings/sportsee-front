/**
 * UserAverageSessionsModel class to handle and structure user average session data
 * This class processes and stores user session data, such as session length and the corresponding date.
 */
class UserAverageSessionsModel {
	/**
	 * Constructor to initialize the UserAverageSessionsModel with provided data
	 * @param { Object } data - The data object containing user session information
	 * @param { String } data.userId - The unique identifier for the user
	 * @param { Array } data.sessions - An array of session objects with session data
	 * @param { String } data.sessions.day - The date of the session
	 * @param { Number } data.sessions.sessionLength - The length of the session (in minutes or another unit)
	 */
	constructor(data) {
	  // Initialize userId from the provided data
	  this.userId = data.userId
  
	  // Map the sessions array to extract only the necessary information
	  // The 'map' function is used to create a new array with each session's day and session length
	  this.sessions = data.sessions.map(session => ({
		day: session.day,            // The date of the session
		sessionLength: session.sessionLength // The length of the session
	  }))
	}
  }
  
  /**
   * Export the UserAverageSessionsModel class for use in other parts of the application
   * This allows other files to import and utilize the UserAverageSessionsModel class.
   */
  export default UserAverageSessionsModel  