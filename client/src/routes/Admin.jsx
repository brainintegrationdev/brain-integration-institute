// // import { useAuth0 } from '@auth0/auth0-react';
// import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
// import banner from '../assets/icons/PractitionerBackground.png';
// import { Link, Outlet } from 'react-router-dom';

// export const Admin = () => {
//     //colors: #e4b5c680 -rose
//     // #BFDFDDD9 - sky blue
//     //#c0e6d880 - ice blue
//     //#d0b0db80 - lavender
//     //#dadadf80 - lightest grey
//     //#bdcbdd80 - greyish blue
//     //#f0cabe80 - pinky pink
//     //#e4b5c680

//     return (
//         <div>
//                   <div
//                         className="w-full h-64 sm:h-80 md:h-96 relative bg-white"
//                         style={{
//                             backgroundImage: `url(${banner}), url(${paleBanner})`,
//                             backgroundSize: 'cover, cover',
//                             backgroundPosition: 'center, center',
//                             backgroundRepeat: 'no-repeat, no-repeat',
//                         }}
//                     >
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
//                                 Admin Dashboard
//                             </h1>
//                         </div>
//                     </div>
//             <div className="flex gap-10">
                
//                 {/* Sidebar for Sub-navbar */}
//                 <div className="w-1/5 max-w-[300px] bg-gray-200 p-4 border border-black rounded-2xl">
//                     <h2 className="font-bold text-xl mb-4">Admin Menu</h2>
//                     <ul className="space-y-2">
//                         <li>
//                             <Link to="practitioner-management">
//                                 Practitioner Management
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="add-admins">Add Admins</Link>
//                         </li>
//                         <li>
//                             <Link to="admin-uploads">Admin Uploads</Link>
//                         </li>
//                         <li>
//                             <Link to="messaging-hub">Messaging Hub</Link>
//                         </li>
//                     </ul>
//                 </div>
                

//                 <div className="flex flex-col">
              
//                     <div className="flex gap-20 justify-around">
//                         <div className="w-[189px] h-[102px] border-none border rounded-xl bg-sky-blue shadow-md font-fira font-bold flex p-4 justify-start items-end">
//                             Video Presentation
//                         </div>
//                         <div className="w-[189px] h-[102px] border-none  border rounded-xl bg-mauve shadow-md font-fira font-bold flex p-4 justify-start items-end">
//                             Brain Integration Training
//                         </div>
//                         <div className="w-[189px] h-[102px] border-none border rounded-xl bg-ice-blue shadow-md font-fira font-bold flex p-4 justify-start items-end">
//                             Clinical Hours
//                         </div>
//                         <div className="w-[189px] h-[102px] border-none border rounded-xl bg-lavender shadow-md font-fira font-bold flex p-4 justify-start items-end">
//                             First Aid Certification
//                         </div>
//                         <div className="w-[189px] h-[102px] border-none border rounded-xl bg-lightest-grey shadow-md font-fira font-bold flex p-4 justify-start items-end">
//                             CPR Certification
//                         </div>
//                         <div className="w-[189px] h-[102px] border-none border rounded-xl bg-greyish-blue shadow-md font-fira font-bold flex p-4 justify-start items-end">
//                             Insurance
//                         </div>
//                         <div className="w-[189px] h-[102px] border-none border rounded-xl bg-pinky-pink shadow-md font-fira font-bold flex p-4 justify-start items-end">
//                             Assessment
//                         </div>
//                     </div>
//                     <div className="flex justify-center items-center pt-10">
//                         <Outlet />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admin;

import { Link, Outlet } from 'react-router-dom';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import banner from '../assets/icons/PractitionerBackground.png';

export const Admin = () => {
    return (
        <div>
            {/* Banner Section */}
            <div
                className="w-full h-64 sm:h-80 md:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Admin Dashboard
                    </h1>
                </div>
            </div>

            <div className="flex h-[calc(100vh-256px)] items-between"> 
                
                {/* Sidebar for Admin Menu */}
                <div className="w-1/5 min-w-[200px] bg-gray-200 p-4 border border-black rounded-2xl h-full">
                    <h2 className="font-bold text-xl mb-4 text-center">Admin Menu</h2>
                    <ul className="space-y-2 text-center">
                        <li className='mb-4'>
                            <Link to="practitioner-management" className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl  hover:text-white text-xl whitespace-nowrap">
                                Practitioner Management
                            </Link>
                        </li>
                        <li className='mb-4'>
                            <Link to="add-admins" className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap">Add Admins</Link>
                        </li>
                        <li>
                            <Link to="admin-uploads" className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap">Admin Uploads</Link>
                        </li>
                        <li>
                            <Link to="messaging-hub" className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap">Messaging Hub</Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content Section */}
                <div className="flex flex-col flex-1 pl-10">
                    <div className="flex gap-6 flex-wrap justify-start">
                        {/* Content Cards */}
                        <div className="w-[189px] h-[102px] rounded-xl bg-sky-blue shadow-md font-fira font-bold flex p-4 items-end">
                            Video Presentation
                        </div>
                        <div className="w-[189px] h-[102px] rounded-xl bg-mauve shadow-md font-fira font-bold flex p-4 items-end">
                            Brain Integration Training
                        </div>
                        <div className="w-[189px] h-[102px] rounded-xl bg-ice-blue shadow-md font-fira font-bold flex p-4 items-end">
                            Clinical Hours
                        </div>
                        <div className="w-[189px] h-[102px] rounded-xl bg-lavender shadow-md font-fira font-bold flex p-4 items-end">
                            First Aid Certification
                        </div>
                        <div className="w-[189px] h-[102px] rounded-xl bg-lightest-grey shadow-md font-fira font-bold flex p-4 items-end">
                            CPR Certification
                        </div>
                        <div className="w-[189px] h-[102px] rounded-xl bg-greyish-blue shadow-md font-fira font-bold flex p-4 items-end">
                            Insurance
                        </div>
                        <div className="w-[189px] h-[102px] rounded-xl bg-pinky-pink shadow-md font-fira font-bold flex p-4 items-end">
                            Assessment
                        </div>
                    </div>
                    <div className="flex justify-center items-center pt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

