/**
 * The UserPerformanceModel class is used to simplify and structure user performance data.
 * It processes performance data for different activities such as running, swimming, etc.
 */
class UserPerformanceModel {
	/**
	 * Constructor to initialize the UserPerformanceModel with provided data
	 * @param { Object } data - The data object containing user performance information
	 * @param { Number } data.userId - The unique identifier for the user
	 * @param { String } data.kind - The type of performance data (e.g., "running", "swimming")
	 * @param { Array } data.data - An array of performance data items
	 * @param { Number } data.data.value - The performance value (e.g., number of repetitions or distance)
	 * @param { String } data.data.kind - The type of performance data for each item
	 */
	constructor(data) {
	  // Store the userId to uniquely identify the user
	  this.userId = data.userId
  
	  // Store the 'kind' value directly, representing the type of performance data
	  this.kind = data.kind
  
	  // Simplify the performance data by mapping each item to a new structure
	  this.data = data.data.map((item) => ({
		value: item.value,  // Store the performance value (e.g., number of repetitions or distance)
		kind: item.kind     // Store the type of performance data (e.g., "running", "swimming")
	  }))
	}
  }
  
  /**
   * Export the UserPerformanceModel class so it can be used elsewhere in the application
   * This allows the model to be imported and utilized in other parts of the codebase.
   */
  export default UserPerformanceModel