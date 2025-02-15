// Importing React hooks and PropTypes for prop validation
import { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

/**
 * Create a context for managing user data across the application
 * This context will be used to provide and consume the userId state.
 */
const UserContext = createContext()

/**
 * Custom hook to access the UserContext
 * @returns { Object } The context value containing userId and setUserId
 */
export const useUser = () => {
  // The useContext hook allows us to read and subscribe to the context
  return useContext(UserContext)
}

/**
 * UserProvider component
 * This component is used to wrap the app and provide user data context to all child components.
 * @param { Object } props - The component props
 * @param { React.ReactNode } props.children - The child components to be rendered within the provider
 * @returns { JSX.Element } - The rendered UserContext provider with child components
 */
export const UserProvider = ({ children }) => {
  // useState hook to hold the current userId, initially set to null
  const [userId, setUserId] = useState(null)

  // UserContext.Provider makes the userId and setUserId available
  // to all child components
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {/* The children prop represents the components inside UserProvider */}
      {children}
    </UserContext.Provider>
  )
}

/**
 * PropTypes validation for UserProvider component
 * Ensures that 'children' is a valid React node (e.g., component, element, string)
 */
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // children is required and must be a valid React element
}