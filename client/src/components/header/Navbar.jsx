import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';
import bell from '../../assets/icons/bell.png';
import { CloudinaryContext } from '../../contexts';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const { profilePictureUrl, imageUrl } = useContext(CloudinaryContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = () =>
        loginWithRedirect({
            authorizationParams: {
                redirect_uri: location.origin + '/profile',
            },
        });

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

    const links = isAuthenticated ? (
        <>
            <nav className="hidden lg:flex space-x-20 items-center font-poppins text-xl">
                <Link className="py-2" to="/">
                    Home
                </Link>
                <Link className="py-2" to="/about">
                    About Us
                </Link>
                <Link className="py-2" to="/practitioner">
                    Find Practitioner
                </Link>
                <Link className="py-2" to="/certification">
                    Certification
                </Link>
                <button className="py-2" onClick={handleLogout}>
                    Logout
                </button>
                <div className="flex items-center space-x-4">
                    <img
                        className="h-[32px] w-[32px]"
                        src={bell}
                        alt="Notifications"
                    />
                    {/* Ensure the avatar is visible by not hiding it */}
                    <Link to="/profile">
                        <img
                            className="h-[32px] w-[32px] rounded-full"
                            src={imageUrl}
                            alt="avatar"
                        />
                    </Link>
                </div>
            </nav>

            {isOpen && (
                <div className="lg:hidden">
                    <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                        <Link
                            to="/"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            to="/practitioner"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            Find Practitioner
                        </Link>
                        <Link
                            to="/certification"
                            className="hover:underline"
                            onClick={toggleMenu}
                        >
                            Certification
                        </Link>
                        <button className="py-2 mt-2" onClick={handleLogout}>
                            Logout
                        </button>
                        <div className="flex justify-center mt-4 gap-4">
                            <img
                                className="h-[32px] w-[32px]"
                                src={bell}
                                alt="Notifications"
                            />
                            <Link to="/profile">
                                <img
                                    className="h-[32px] w-[32px] rounded-full"
                                    src={imageUrl}
                                    alt="avatar"
                                />
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    ) : (
        <div className="lg:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                <Link className="py-2" to="/">
                    Home
                </Link>
                <button className="py-2" onClick={handleLogin}>
                    Login
                </button>
            </nav>
        </div>
    );

    return (
        <header className="bg-white">
            <nav className="flex flex-col md:flex-row justify-between items-center text-dark-gray p-4">
                <div className="flex items-center justify-between w-full">
                    <img
                        className="w-[134px] h-[134px] shrink-0"
                        src={BrainIntegrationSeal}
                        alt="Brand Logo"
                    />
                    <button
                        className="md:hidden flex items-center justify-center focus:outline-none"
                        onClick={toggleMenu}
                        aria-expanded={isOpen}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div
                    className={`${
                        isOpen ? 'flex' : 'hidden'
                    } flex-col md:flex md:flex-row items-center`}
                >
                    {links}
                </div>
            </nav>
        </header>
    );
};
