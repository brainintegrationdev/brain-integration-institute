// import { Link, Outlet } from 'react-router-dom';
// import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
// import banner from '../assets/icons/PractitionerBackground.png';

// export const Admin = () => {
//     return (
//         <div>
//             {/* Banner Section */}
//             <div
//                 className="w-full h-64 sm:h-80 md:h-96 relative bg-white"
//                 style={{
//                     backgroundImage: `url(${banner}), url(${paleBanner})`,
//                     backgroundSize: 'cover, cover',
//                     backgroundPosition: 'center, center',
//                     backgroundRepeat: 'no-repeat, no-repeat',
//                 }}
//             >
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
//                         Admin Dashboard
//                     </h1>
//                 </div>
//             </div>

//             <div className="flex h-[calc(100vh-256px)] items-between">
//                 {/* Sidebar for Admin Menu */}
//                 <div className=" min-w-[200px] bg-gray p-4 border border-black rounded-2xl h-full">
//                     <h2 className="font-bold text-xl mb-4 text-center">
//                         Admin Menu
//                     </h2>
//                     <ul className="space-y-2 text-center">
//                         <li className="mb-4">
//                             <Link
//                                 to="practitioner-management"
//                                 className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl  hover:text-white text-xl whitespace-nowrap"
//                             >
//                                 Practitioner Management
//                             </Link>
//                         </li>
//                         <li className="mb-4">
//                             <Link
//                                 to="add-admins"
//                                 className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
//                             >
//                                 Manage Admins
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="admin-uploads"
//                                 className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
//                             >
//                                 Admin Uploads
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="messaging-hub"
//                                 className="py-2 px-8 transition duration-200 border-b-2 border-transparent hover:bg-medium-pale-green rounded-2xl hover:text-white text-xl whitespace-nowrap"
//                             >
//                                 Messaging Hub
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>

//                 <div className="flex flex-col flex-1 pl-10">
//                     <div className="flex gap-6 flex-wrap justify-start">

//                         <div className="w-[189px] h-[102px] rounded-xl bg-sky-blue shadow-md font-fira font-bold flex p-4 items-end">
//                             Video Presentation

//                         </div>
//                         <div className="relative w-[189px] h-[102px] rounded-xl bg-mauve shadow-md font-fira font-bold flex p-4 items-end">

//                             Brain Integration Training
//                         </div>

//                         <div className="w-[189px] h-[102px] rounded-xl bg-ice-blue shadow-md font-fira font-bold flex p-4 items-end">
//                             Clinical Hours
//                         </div>
//                         <div className="w-[189px] h-[102px] rounded-xl bg-lavender shadow-md font-fira font-bold flex p-4 items-end">
//                             First Aid Certification
//                         </div>
//                         <div className="w-[189px] h-[102px] rounded-xl bg-lightest-grey shadow-md font-fira font-bold flex p-4 items-end">
//                             CPR Certification
//                         </div>
//                         <div className="w-[189px] h-[102px] rounded-xl bg-greyish-blue shadow-md font-fira font-bold flex p-4 items-end">
//                             Insurance
//                         </div>
//                         <div className="w-[189px] h-[102px] rounded-xl bg-pinky-pink shadow-md font-fira font-bold flex p-4 items-end">
//                             Assessment
//                         </div>
//                     </div>

//                     <div className="flex justify-center items-center pt-10 ">
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
import BrainIntegrationSeal from '../assets/icons/BrainIntegrationSeal.png'

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
                  <div className="flex items-center justify-between w-full">
                    <img
                        className="w-[134px] h-[134px] shrink-0 m-5"
                        src={BrainIntegrationSeal}
                        alt="Brand Logo"
                    />
                    </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Admin Dashboard
                    </h1>
                </div>
            </div>

            <div className="flex h-[calc(100vh-256px)] items-between p-4">
                {/* Sidebar for Admin Menu */}
                <div className="min-w-[220px] bg-gray p-6 border border-gray rounded-2xl h-full shadow-lg">
                    <h2 className="font-bold text-xl mb-4 text-center text-black">
                        Admin Menu
                    </h2>
                    <ul className="space-y-4 text-center">
                        {[
                            {
                                path: 'practitioner-management',
                                label: 'Practitioner Management',
                            },
                            { path: 'add-admins', label: 'Manage Admins' },
                            { path: 'admin-uploads', label: 'Admin Uploads' },
                            { path: 'messaging-hub', label: 'Messaging Hub' },
                        ].map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="py-3 px-4 w-full block transition duration-200 border-b-2 border-transparent hover:bg-green-500 rounded-xl hover:text-white text-lg text-black"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col flex-1 pl-10">
                    <div className="flex gap-6 flex-wrap justify-start">
                        {/* Main dashboard items */}
                        {[
                            {
                                label: 'Video Presentation',
                                color: 'bg-sky-blue',
                            },
                            {
                                label: 'Brain Integration Training',
                                color: 'bg-mauve',
                            },
                            { label: 'Clinical Hours', color: 'bg-ice-blue' },
                            {
                                label: 'First Aid Certification',
                                color: 'bg-lavender',
                            },
                            {
                                label: 'CPR Certification',
                                color: 'bg-lightest-grey',
                            },
                            { label: 'Insurance', color: 'bg-greyish-blue' },
                            { label: 'Assessment', color: 'bg-pinky-pink' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`w-[189px] h-[102px] rounded-xl ${item.color} shadow-md font-fira font-semibold text-lg flex p-4 items-end justify-center text-center text-black hover:shadow-lg transition-shadow`}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center pt-10 ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
