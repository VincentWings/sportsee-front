import { Outlet } from "react-router-dom"
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import './Layout.css'

/**
 * Layout component that renders the header, sidebar, and main content.
 * 
 * This component acts as a wrapper for other pages, providing a consistent layout.
 *
 * @component
 * @returns {JSX.Element} A layout containing the header, sidebar, and main content area
 */
function Layout() {
    return (
        <>
            <Header />  {/* Renders the Header component containing the site logo and navigation bar */}

            <div className="container">
                <main>
                    <Outlet />  {/* Renders the child route content based on the current route */}
                </main>

                <Sidebar />  {/* Renders the Sidebar component containing additional navigation or options */}
            </div>
        </>
    )
}

export default Layout