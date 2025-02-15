import { NavLink } from "react-router-dom"
import sportseeLogo from "../../assets/images/sportsee.svg"
import "./Logo.css"

/**
 * Logo component that renders the SportSee logo as a clickable link.
 * 
 * This component wraps the logo in a navigation link that redirects to the home page.
 *
 * @component
 * @returns {JSX.Element} A clickable logo that navigates to the home page
 */
function Logo() {
    return (
        <div className="logo">
            <NavLink to="/">  {/* Navigates to the home page when the logo is clicked */}
                <img 
                    src={sportseeLogo}  // Logo image source
                    className="logo"  // CSS class for styling the logo
                    alt="SportSee logo"  // Alt text for the logo image
                />
            </NavLink>
        </div>
    )
}

export default Logo