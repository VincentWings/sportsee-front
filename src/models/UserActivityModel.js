/**
 * UserActivityModel class to handle and structure user activity data
 * This class processes and stores user activity information, such as sessions, weight, and calories.
 */
class UserActivityModel {
	/**
	 * Constructor to initialize the UserActivityModel
	 * @param { Object } data - The data object containing user activity information
	 * @param { String } data.userId - The unique identifier for the user
	 * @param { Array } data.sessions - An array of session objects with activity details
	 * @param { String } data.sessions.day - The date of the session
	 * @param { Number } data.sessions.kilogram - The weight recorded during the session
	 * @param { Number } data.sessions.calories - The calories burned during the session
	 */
	constructor(data) {
	  // Initialize userId from the provided data
	  this.userId = data.userId
  
	  // Map sessions to a cleaner structure with specific properties
	  this.sessions = data.sessions.map((session) => ({
		day: session.day,        // The date of the session
		kg: session.kilogram,    // The weight recorded on that day
		calories: session.calories // The calories burned during that session
	  }))
	}
  }
  
  /**
   * Export the UserActivityModel class for use in other parts of the application
   * This allows other files to import and use the UserActivityModel to work with user data.
   */
  export default UserActivityModel  