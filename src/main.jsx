// Importing necessary React libraries to use JSX and manage the DOM
import React from "react"
import ReactDOM from "react-dom/client"  // React 18+ requires createRoot for rendering
import AppRouter from "./AppRouter"  // AppRouter handles routing in the app
import { UserProvider } from "./context/UserContext"  // Provides user context throughout the app

// Importing global styles
import './main.css'

/**
 * Renders the React application into the root element of the HTML file.
 * Wraps the entire application in UserProvider for managing user data context.
 * Utilizes React.StrictMode to enable additional checks during development.
 * @returns {JSX.Element} The rendered React app.
 */
const rootElement = document.getElementById("root")  // Get the root element from the HTML file where the app will be rendered

// Create a root element using ReactDOM's createRoot (recommended for React 18+)
// This allows us to leverage React's new concurrent features
const root = ReactDOM.createRoot(rootElement)

// Render the app into the root element, wrapping with React.StrictMode for additional checks
root.render(
  <React.StrictMode>
    {/* Wrapping the AppRouter with UserProvider to make user data available across all components */}
    <UserProvider>
      <AppRouter />  {/* AppRouter handles all routing for the app */}
    </UserProvider>
  </React.StrictMode>
)