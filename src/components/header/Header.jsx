import Logo from '../logo/Logo'
import Navbar from '../navbar/Navbar'
import './Header.css'

/**
 * Header component that displays the logo and navigation bar.
 *
 * @component
 * @returns {JSX.Element} The header containing the logo and navigation bar
 */
function Header() {
    return (
        <header>
            <Logo />  {/* Renders the Logo component */}
            <Navbar />  {/* Renders the Navbar component */}
        </header>
    )
}

export default Header