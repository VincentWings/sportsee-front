/**
 * The UserDataModel class is responsible for structuring and simplifying user data
 * It processes user information such as personal data, score, and key nutritional data.
 */
class UserDataModel {
	/**
	 * Constructor to initialize the UserDataModel with provided data
	 * @param { Object } data - The data object containing user information
	 * @param { String } data.id - The unique identifier for the user
	 * @param { Object } data.userInfos - The user's personal information
	 * @param { String } data.userInfos.firstName - The user's first name
	 * @param { String } data.userInfos.lastName - The user's last name
	 * @param { Number } data.userInfos.age - The user's age
	 * @param { Number } data.todayScore - The score for today (if available)
	 * @param { Number } data.score - A fallback score if todayScore is not available
	 * @param { Object } data.keyData - The user's nutritional information
	 * @param { Number } data.keyData.calorieCount - The calories count
	 * @param { Number } data.keyData.proteinCount - The protein count
	 * @param { Number } data.keyData.carbohydrateCount - The carbohydrate count
	 * @param { Number } data.keyData.lipidCount - The fat count
	 */
	constructor(data) {
	  // Store user ID for future reference
	  this.id = data.id
  
	  // Destructure the user information for easier access
	  this.userInfos = {
		firstName: data.userInfos.firstName, // User's first name
		lastName: data.userInfos.lastName,   // User's last name
		age: data.userInfos.age              // User's age
	  }
  
	  // Handle score data: fallback to 'score' if 'todayScore' is not available
	  this.score = data.todayScore || data.score
  
	  // Simplify key nutritional data by renaming the fields for clarity
	  this.keyData = {
		calories: data.keyData.calorieCount,    // Calories count
		protein: data.keyData.proteinCount,     // Protein count
		carbs: data.keyData.carbohydrateCount,  // Carbohydrates count
		fat: data.keyData.lipidCount            // Fat count
	  }
	}
  }
  
  /**
   * Export the UserDataModel class so it can be used in other parts of the application
   * This allows the model to be imported and utilized elsewhere in the codebase.
   */
  export default UserDataModel  