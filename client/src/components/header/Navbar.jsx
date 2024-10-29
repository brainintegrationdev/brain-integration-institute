import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';
import bell from '../../assets/icons/bell.png';
import placeholderProfilePic from '../../assets/icons/placeholderProfilePic.png';
import { CloudinaryContext } from '../../contexts';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const { imageUrl } = useContext(CloudinaryContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 768,
    );

    const handleLogin = () =>
        loginWithRedirect({
            authorizationParams: { redirect_uri: location.origin + '/profile' },
        });

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        console.log('logged out');
    };

    const { getUserMetaData } = useContext(CloudinaryContext);

    useEffect(() => {
        if (user?.email) {
            getUserMetaData(user.email);
        }
    }, [user]);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderLinks = () => {
        if (isAuthenticated) {
            // Authenticated user
            return (
                <>
                    <Link
                        className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/about"
                    >
                        About Us
                    </Link>
                    <Link
                        className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/practitioner"
                    >
                        Find Practitioner
                    </Link>
                    <Link
                        className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/certification"
                    >
                        Certification
                    </Link>
                    <Link
                        className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        to="/admin"
                    >
                        Admin Portal
                    </Link>
                    <button
                        className="py-2 px-10 transition duration-200 border-b-2 border-transparent hover:bg-red rounded-2xl hover:text-white text-xl whitespace-nowrap"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <div className="flex space-x-2">
                        <img
                            className="h-[32px] w-[32px]"
                            src={bell}
                            alt="Notifications"
                        />
                        <Link to="/profile">
                            <img
                                className="h-[32px] w-[32px] rounded-full "
                                src={imageUrl || placeholderProfilePic}
                                alt="avatar"
                                style={{ minWidth: '32px', minHeight: '32px' }}
                            />
                        </Link>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <Link to="/" className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap">
                        Home
                    </Link>
                    <Link className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap" to="/about">
                        About Us
                    </Link>
                    <button className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap" onClick={handleLogin}>
                        Login
                    </button>
                </>
            );
        }
    };

    return (
        <header className="bg-white">
            <nav className="flex flex-col md:flex-row justify-between items-center text-dark-gray p-4">
                <div className="flex items-center justify-between w-full">
                    <img
                        className="w-[134px] h-[134px] shrink-0"
                        src={BrainIntegrationSeal}
                        alt="Brand Logo"
                    />
                    {/* Hamburger button for mobile view */}
                    {!isLargeScreen && (
                        <button
                            className="md:hidden flex items-center justify-center focus:outline-none"
                            onClick={toggleMenu}
                            aria-expanded={isOpen}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>

                {/* Navigation links */}
                <div
                    className={`${
                        isOpen || isLargeScreen ? 'flex' : 'hidden'
                    } flex-col md:flex md:flex-row items-center`}
                >
                    {renderLinks()}
                </div>
            </nav>
        </header>
    );
};
