import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom";



export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const handleLogin = () => loginWithRedirect({
        authorizationParams: {
            redirect_uri: location.origin + '/profile'
        }
    })

    const handleLogout = () => {
        logout();
    }

    const links = isAuthenticated ?
        <>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <select name="certification--dropdown">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <Link to='/profile'>Profile</Link>
            <Link to='/practitioner--home'>Find a Practitioner</Link>
            <button onClick={handleLogout}>Logout</button>
        </> :
        <>
            <Link to='/'>Home</Link>
            <button onClick={handleLogin}>Login</button>
        </>
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {links}
            </div>
            {isAuthenticated && <img src={user.picture} alt="avatar" width={32} height={32} />}
        </nav>
    )
}