import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';
import bell from '../../assets/icons/bell.png'

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
        <div className='flex font-libre text-dark-gray items-center text-center text-base justify-center gap-10 pl-[356px]'>
            <Link to="/">HOME</Link>
            {/* <Link to="/profile">PROFILE</Link> */}
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
        <nav className="flex text-dark-gray">
            <div className=" pr-96 pb-10 pt-6 pl-[24px] ">
                <img className="w-[134px] h-[134px] shrink-0" src={BrainIntegrationSeal} />
            </div>
            <div className="flex font-libre text-dark-gray items-center text-center text-base justify-center font-bold">
                <div>{links} </div>
                {isAuthenticated && (
                    <div className='flex justify-end'>
                        <img className="pl-[90px]" src={bell} />
                        <img
                            className="h-[32px] w-[32px] ml-4 rounded-full"
                            src={user.picture}
                            alt="avatar"
                            
                        />
                    </div>
                )}
            </div>
        </nav>
    );
};
