/**
 * A flag to toggle between using mock data or real API data.
 * @type {boolean}
 */
const useMockData = true

/**
 * Base URL for the real API
 * @type {string}
 */
const ApiBaseUrl = "http://localhost:3000"

/**
 * Import data models
 */
import UserDataModel from "../models/UserDataModel"
import UserActivityModel from "../models/UserActivityModel"
import UserAverageSessionsModel from "../models/UserAverageSessionsModel"
import UserPerformanceModel from "../models/UserPerformanceModel"

/**
 * Function to fetch mock data from the public folder.
 * @returns {Promise<Object|null>} The mock data as an object or null if there's an error.
 */
const fetchMockData = async () => {
  try {
    const response = await fetch("/mockData.json")
    if (!response.ok) throw new Error("Failed to load mock data")
    return await response.json() // Return mock data
  } catch (error) {
    console.error("⚠️ Error fetching mock data:", error)
    return null // Return null if there's an error
  }
}

/**
 * Function to fetch real API data.
 * @param {string} endpoint The API endpoint to fetch data from.
 * @returns {Promise<Object|null>} The API response data as an object or null if there's an error.
 */
const fetchApiData = async (endpoint) => {
  try {
    const response = await fetch(`${ApiBaseUrl}${endpoint}`)
    if (!response.ok) throw new Error(`❌ Error fetching data from ${endpoint}`)
    return await response.json() // Return parsed API data
  } catch (error) {
    console.error(`❌ Error fetching data from ${endpoint}:`, error)
    return null // Return null if there's an error
  }
}

/**
 * Generic function to fetch user data (either from mock data or API).
 * @param {number|string} userId The user ID to fetch data for.
 * @param {string} endpoint The API endpoint or mock data key.
 * @param {Function} model The data model to use for the fetched data.
 * @returns {Promise<Object|null>} An instance of the model with fetched data or null if no data is found.
 */
const getUserData = async (userId, endpoint, model) => {
  let data

  if (useMockData) {
    const mockData = await fetchMockData()

    if (mockData && mockData[endpoint]) {
      // Vérification si `userId` est bien dans la structure
      if (endpoint === "USER_MAIN_DATA") {
        data = mockData[endpoint].find(user => user.id === parseInt(userId, 10))
      } else {
        data = mockData[endpoint].find(item => item.userId === parseInt(userId, 10))
      }
    }
  }

  // Si mockData est vide ou indisponible, on tente via API
  if (!data) {
    const apiData = await fetchApiData(endpoint.replace("{userId}", userId))
    data = apiData ? apiData.data : null
  }

  if (data) {
    console.log(`✅ Data fetched successfully for ${endpoint}:`, data)
    return new model(data)
  } else {
    console.error(`❌ No data found for userId ${userId} on endpoint ${endpoint}`)
    return null
  }
}

/**
 * Fetch user main data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserDataModel|null>} An instance of UserDataModel with fetched data or null.
 */
export const getUserMainData = (userId) => getUserData(userId, "USER_MAIN_DATA", UserDataModel)

/**
 * Fetch user activity data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserActivityModel|null>} An instance of UserActivityModel with fetched data or null.
 */
export const getUserActivity = (userId) => getUserData(userId, "USER_ACTIVITY", UserActivityModel)

/**
 * Fetch user average sessions data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserAverageSessionsModel|null>} An instance of UserAverageSessionsModel with fetched data or null.
 */
export const getUserAverageSessions = (userId) => getUserData(userId, "USER_AVERAGE_SESSIONS", UserAverageSessionsModel)

/**
 * Fetch user performance data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserPerformanceModel|null>} An instance of UserPerformanceModel with fetched data or null.
 */
export const getUserPerformance = (userId) => getUserData(userId, "USER_PERFORMANCE", UserPerformanceModel)