/**
 * Import data models
 */
import UserDataModel from "../models/UserDataModel";
import UserActivityModel from "../models/UserActivityModel";
import UserAverageSessionsModel from "../models/UserAverageSessionsModel";
import UserPerformanceModel from "../models/UserPerformanceModel";

/**
 * Determine if the backend should be used (from .env)
 */
const useBackend = import.meta.env.VITE_USE_BACKEND === "true";
const ApiBaseUrl = useBackend ? "http://localhost:3000" : null;

/**
 * Function to fetch real API data.
 * @param {string} endpoint The API endpoint to fetch data from.
 * @returns {Promise<Object|null>} The API response data as an object or null if there's an error.
 */
const fetchApiData = async (endpoint) => {
  if (!ApiBaseUrl) return null; // Avoid API call if disabled

  try {
    const response = await fetch(`${ApiBaseUrl}${endpoint}`);
    if (!response.ok) throw new Error(`Error fetching data from ${endpoint}`);
    return await response.json(); // Return parsed API data
  } catch (error) {
    return null; // Return null to trigger mock data fallback
  }
};

/**
 * Function to fetch mock data from the public folder.
 * @returns {Promise<Object|null>} The mock data as an object or null if there's an error.
 */
const fetchMockData = async () => {
  try {
    const response = await fetch("/mockData.json");
    if (!response.ok) throw new Error("Failed to load mock data");
    return await response.json(); // Return mock data
  } catch (error) {
    return null; // Return null if there's an error
  }
};

/**
 * Generic function to fetch user data (tries API first, then mock data if needed).
 * @param {number|string} userId The user ID to fetch data for.
 * @param {string} endpoint The API endpoint or mock data key.
 * @param {Function} model The data model to use for the fetched data.
 * @returns {Promise<Object|null>} An instance of the model with fetched data or null if no data is found.
 */
const getUserData = async (userId, endpoint, model) => {
  let data = null;

  // 1️⃣ Si le backend est activé, on tente l'API
  if (useBackend) {
    const apiData = await fetchApiData(`${endpoint.replace("{userId}", userId)}`);
    if (apiData) {
      data = apiData.data;
    }
  }

  // 2️⃣ Si l'API ne fonctionne pas ou est désactivée, on passe aux données mock
  if (!data) {
    const mockData = await fetchMockData();
    if (mockData) {
      const endpointMap = {
        "/user/{userId}": "USER_MAIN_DATA",
        "/user/{userId}/activity": "USER_ACTIVITY",
        "/user/{userId}/average-sessions": "USER_AVERAGE_SESSIONS",
        "/user/{userId}/performance": "USER_PERFORMANCE",
      };

      const dataKey = endpointMap[endpoint];
      if (mockData[dataKey]) {
        data =
          dataKey === "USER_MAIN_DATA"
            ? mockData[dataKey].find((item) => item.id === parseInt(userId, 10))
            : mockData[dataKey].find((item) => item.userId === parseInt(userId, 10));
      }
    }
  }

  // 3️⃣ Retourne les données ou un message d'erreur
  if (data) {
    return new model(data);
  } else {
    console.error(`No data found for userId ${userId} (API & mock data failed)`);
    return null;
  }
};

/**
 * Fetch user main data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserDataModel|null>} An instance of UserDataModel with fetched data or null.
 */
export const getUserMainData = (userId) =>
  getUserData(userId, "/user/{userId}", UserDataModel);

/**
 * Fetch user activity data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserActivityModel|null>} An instance of UserActivityModel with fetched data or null.
 */
export const getUserActivity = (userId) =>
  getUserData(userId, "/user/{userId}/activity", UserActivityModel);

/**
 * Fetch user average sessions data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserAverageSessionsModel|null>} An instance of UserAverageSessionsModel with fetched data or null.
 */
export const getUserAverageSessions = (userId) =>
  getUserData(userId, "/user/{userId}/average-sessions", UserAverageSessionsModel);

/**
 * Fetch user performance data using the generic getUserData function.
 * @param {number|string} userId The user ID to fetch data for.
 * @returns {Promise<UserPerformanceModel|null>} An instance of UserPerformanceModel with fetched data or null.
 */
export const getUserPerformance = (userId) =>
  getUserData(userId, "/user/{userId}/performance", UserPerformanceModel);
