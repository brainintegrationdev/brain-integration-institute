import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import BrainIntegrationSeal from '../assets/icons/BrainIntegrationSeal.png';

export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const handleLogin = () =>
        loginWithRedirect({
            authorizationParams: {
                redirect_uri: location.origin + '/profile',
            },
        });

    const handleLogout = () => {
        logout();
    };

    const links = isAuthenticated ? (
        <div>
            <Link to="/">HOME</Link>
            <Link to="/profile">PROFILE</Link>
            <Link to="/about">ABOUT US</Link>
            <Link to="/certification">CERTIFICATION</Link>
            <Link to="/practitioner">FIND PRACTITIONER</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    ) : (
        <div>
            <Link to="/">Home</Link>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
    return (
        <nav className="nav-flexbox">
            <div className="seal-div">
                <img className="seal" src={BrainIntegrationSeal} />
                
            </div>
            <p className="nav-links">{links} </p>
               
            
            {isAuthenticated && (
                <img src={user.picture} alt="avatar" width={32} height={32} />
            )}
        </nav>
    );
};
