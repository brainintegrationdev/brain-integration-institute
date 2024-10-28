// /* eslint-disable no-unused-vars */
// import { useContext, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import { Link } from 'react-router-dom';
// import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';
// import bell from '../../assets/icons/bell.png';
// import { CloudinaryContext } from '../../contexts';

// export const Navbar = () => {
//     const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
//     const { profilePictureUrl, imageUrl } = useContext(CloudinaryContext);

//     console.log(profilePictureUrl);

//     const handleLogin = () =>
//         loginWithRedirect({
//             authorizationParams: {
//                 redirect_uri: location.origin + '/profile',
//             },
//         });

//     console.log(loginWithRedirect);

//     const handleLogout = () => {
//         logout();
//         console.log('logged out');
//     };

//     const { getUserMetaData, userMetaData } = useContext(CloudinaryContext);

//     useEffect(() => {
//         if (user?.email) {
//             getUserMetaData(user.email);
//         }
//     }, []);

//     // console.log(isAuthenticated)

//     const links = isAuthenticated ? (
//         <div className="flex font-libre text-dark-gray items-center text-center text-base justify-center gap-10 pl-[356px]">
//             <Link to="/">Home</Link>
//             <Link to="/profile">Profile</Link>
//             <Link to="/about">About Us</Link>
//             <Link to="/practitioner">Find Practitioner</Link>
//             <Link to="/certification">Certification</Link>
//             <button onClick={handleLogout}>Logout</button>
//             <div className="flex justify-end">
//                 <img className="pl-[90px]" src={bell} />
//                 <img
//                     className="h-[32px] w-[32px] ml-4 rounded-full"
//                     src={imageUrl} 
//                     alt="avatar"
//                 />
//             </div>
//         </div>
//     ) : (
//         <div>
//             <Link to="/">Home</Link>
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );

//     return (
//         <nav className="flex text-dark-gray">
//             <div className=" pr-96 pb-10 pt-6 pl-[24px] ">
//                 <img
//                     className="w-[134px] h-[134px] shrink-0"
//                     src={BrainIntegrationSeal}
//                 />
//             </div>
//             <div className="flex font-libre text-dark-gray items-center text-center text-base justify-center font-bold">
//                 <div>{links} </div>
//             </div>
//         </nav>
//     );
// };

/* eslint-disable no-unused-vars */
import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import BrainIntegrationSeal from '../../assets/icons/BrainIntegrationSeal.png';
import bell from '../../assets/icons/bell.png';
import { CloudinaryContext } from '../../contexts';
import { useState } from 'react';

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
        <div className="flex flex-col md:flex-row md:items-center text-center text-base justify-center md:gap-10 md:pl-0">
            <Link className="py-2" to="/">Home</Link>
            <Link className="py-2" to="/profile">Profile</Link>
            <Link className="py-2" to="/about">About Us</Link>
            <Link className="py-2" to="/practitioner">Find Practitioner</Link>
            <Link className="py-2" to="/certification">Certification</Link>
            <button className="py-2" onClick={handleLogout}>Logout</button>
            <div className="flex justify-center md:justify-end md:gap-4">
                <img className="h-[32px] w-[32px]" src={bell} alt="Notifications" />
                <img
                    className="h-[32px] w-[32px] rounded-full"
                    src={imageUrl}
                    alt="avatar"
                />
            </div>
        </div>
    ) : (
        <div>
            <Link className="py-2" to="/">Home</Link>
            <button className="py-2" onClick={handleLogin}>Login</button>
        </div>
    );

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center text-dark-gray p-4">
            <div className="flex items-center justify-between w-full">
                <img
                    className="w-[134px] h-[134px] shrink-0"
                    src={BrainIntegrationSeal}
                    alt="Brand Logo"
                />
                <button
                    className="md:hidden flex items-center justify-center focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className={`h-1 w-8 bg-dark-gray mb-1 transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`h-1 w-8 bg-dark-gray mb-1 transition-transform ${isOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`h-1 w-8 bg-dark-gray transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </div>
            <div className={`flex-col md:flex md:flex-row items-center ${isOpen ? 'flex' : 'hidden'} md:flex`}>
                {links}
            </div>
        </nav>
    );
};

