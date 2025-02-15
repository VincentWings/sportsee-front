// Importing necessary libraries for routing and component structure
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"  // Layout component for the main structure
import Homepage from "./pages/homepage/Homepage"  // Homepage component
import Dashboard from "./components/dashboard/Dashboard"  // Dashboard for user profile
import Settings from "./pages/settings/Settings"  // Settings page
import Community from "./pages/community/Community"  // Community page
import PageNotFound from "./pages/404/PageNotFound"  // Page not found for unknown routes

/**
 * The AppRouter component handles the routing logic for the application
 * It defines different routes and renders the appropriate components for each path
 * @returns {JSX.Element} The rendered AppRouter component
 */
const AppRouter = () => {
  return (
    // BrowserRouter wraps the entire application, enabling routing functionality
    <BrowserRouter>
      {/* Routes container where all the different paths are defined */}
      <Routes>
        {/* The root route is used to define the layout structure of the app */}
        <Route path="/" element={<Layout />}>
          {/* Default route (index route), loads the homepage component */}
          <Route index element={<Homepage />} />

          {/* Dynamic route for user profile. This route will change based on user ID */}
          <Route path="/user/:id" element={<Dashboard />} />

          {/* Static route for the settings page */}
          <Route path="settings" element={<Settings />} />

          {/* Static route for the community page */}
          <Route path="community" element={<Community />} />

          {/* Fallback route for any unknown paths, will display a 'Page Not Found' message */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter