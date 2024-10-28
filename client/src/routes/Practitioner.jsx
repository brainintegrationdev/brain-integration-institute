// import  { useContext, useState, useEffect } from 'react';
// import { PractitionerCard } from '../components/PractitionerCard';
// import { PractitionerContext } from '../contexts';
// import banner from '../assets/icons/PractitionerBackground.png';
// import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';

// export const Practitioner = () => {
//     const { practitioners } = useContext(PractitionerContext);

//     const [searchQuery, setSearchQuery] = useState({
//         name: '',
//         title: '',
//         location: '',
//     });

//     const [renderedPractitioners, setRenderedPractitioners] = useState([]);

//     const searchHandler = (event) => {
//         const { name, value } = event.target;
//         setSearchQuery((prevQuery) => ({
//             ...prevQuery,
//             [name]: value.toLowerCase(),
//         }));
//     };

//     useEffect(() => {
//         const { name, title, location } = searchQuery;

//         const displayedPractitioners = practitioners.filter((practitioner) => {
//             const firstName = practitioner.name.firstName.toLowerCase();
//             const lastName = practitioner.name.lastName.toLowerCase();
//             const practitionerTitle = practitioner.title.toLowerCase();
//             const practitionerLocation = practitioner.location.toLowerCase();

//             return (
//                 (name === '' ||
//                     firstName.includes(name) ||
//                     lastName.includes(name)) &&
//                 (title === '' || practitionerTitle.includes(title)) &&
//                 (location === '' || practitionerLocation.includes(location))
//             );
//         });

//         setRenderedPractitioners(displayedPractitioners);
//     }, [practitioners, searchQuery]);

//     const practitionerList = renderedPractitioners.map((person) => (
//         <PractitionerCard
//             firstName={person.name.firstName}
//             lastName={person.name.lastName}
//             title={person.title}
//             location={person.location}
//             imgURL={person.imgURL}
//             phone={person.phone}
//             email={person.email}
//             website={person.website}
//         />
//     ));

//     return (
//         <>
//              <div
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
//                         Find a Certified Practitioner
//                     </h1>
//                 </div>
//             </div>
//             <div className="w-[75%] flex flex-col relative mx-auto">
//                 <div className="RefineResults py-2 relative text-start text-black text-4xl font-normal font-['Fira Sans']">
//                     Refine Results
//                 </div>

//                 <div className="flex justify-between py-2">
//                     <input
//                         className="SearchBar w-96 px-4 py-2 l relative rounded-full border border-[#808080] justify-between items-center inline-flex text-black/50 text-xl font-normal font-['Fira Sans']"
//                         name="title"
//                         onChange={searchHandler}
//                         placeholder="Specialty..."
//                     />

//                     <input
//                         className="SearchBar w-96 px-4 py-2 l relative rounded-full border border-[#808080] justify-between items-center inline-flex text-black/50 text-xl font-normal font-['Fira Sans']"
//                         name="name"
//                         onChange={searchHandler}
//                         placeholder="Name..."
//                     />

//                     <input
//                         className="SearchBar w-96 px-4 py-2 l relative rounded-full border border-[#808080] justify-between items-center inline-flex text-black/50 text-xl font-normal font-['Fira Sans']"
//                         name="location"
//                         onChange={searchHandler}
//                         placeholder="Zip Code, City or State..."
//                     />
//                 </div>
//                 {(searchQuery.name !== '' ||
//                     searchQuery.title !== '' ||
//                     searchQuery.location !== '') && (
//                     <div className="Results2 relative text-center text-xl py-2 font-medium font-['Inter']">
//                         Results : {renderedPractitioners.length}
//                     </div>
//                 )}
//             </div>
//             <div className="CertPractitionerCardsContainer py-2 w-[75%] mx-auto relative flex flex-wrap justify-between gap-4">
//                 {practitionerList}
//             </div>
//         </>
//     );
// };

import { useContext, useState, useEffect } from 'react';
import { PractitionerCard } from '../components/PractitionerCard';
import { PractitionerContext } from '../contexts';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';

export const Practitioner = () => {
    const { practitioners } = useContext(PractitionerContext);

    const [searchQuery, setSearchQuery] = useState({
        name: '',
        title: '',
        location: '',
    });

    const [renderedPractitioners, setRenderedPractitioners] = useState([]);

    const searchHandler = (event) => {
        const { name, value } = event.target;
        setSearchQuery((prevQuery) => ({
            ...prevQuery,
            [name]: value.toLowerCase(),
        }));
    };

    useEffect(() => {
        const { name, title, location } = searchQuery;

        const displayedPractitioners = practitioners.filter((practitioner) => {
            const firstName = practitioner.name.firstName.toLowerCase();
            const lastName = practitioner.name.lastName.toLowerCase();
            const practitionerTitle = practitioner.title.toLowerCase();
            const practitionerLocation = practitioner.location.toLowerCase();

            return (
                (name === '' ||
                    firstName.includes(name) ||
                    lastName.includes(name)) &&
                (title === '' || practitionerTitle.includes(title)) &&
                (location === '' || practitionerLocation.includes(location))
            );
        });

        setRenderedPractitioners(displayedPractitioners);
    }, [practitioners, searchQuery]);

    const practitionerList = renderedPractitioners.map((person) => (
        <PractitionerCard
            key={`${person.name.firstName}-${person.name.lastName}`} // Add a unique key
            firstName={person.name.firstName}
            lastName={person.name.lastName}
            title={person.title}
            location={person.location}
            imgURL={person.imgURL}
            phone={person.phone}
            email={person.email}
            website={person.website}
        />
    ));

    return (
        <>
            {/* Banner Section */}
            <div
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-fenix font-normal">
                        Find a Certified Practitioner
                    </h1>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="w-11/12 sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mt-6">
                <h2 className="text-2xl text-gray-800 font-semibold mb-4 text-center">Refine Results</h2>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                    <input
                        className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-400 text-gray-600 text-lg placeholder-gray-500"
                        name="title"
                        onChange={searchHandler}
                        placeholder="Specialty..."
                    />
                    <input
                        className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-400 text-gray-600 text-lg placeholder-gray-500"
                        name="name"
                        onChange={searchHandler}
                        placeholder="Name..."
                    />
                    <input
                        className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-400 text-gray-600 text-lg placeholder-gray-500"
                        name="location"
                        onChange={searchHandler}
                        placeholder="Zip Code, City or State..."
                    />
                </div>
                {(searchQuery.name || searchQuery.title || searchQuery.location) && (
                    <div className="text-center text-lg font-medium text-gray-700">
                        Results: {renderedPractitioners.length}
                    </div>
                )}
            </div>

            {/* Practitioner Cards Section */}
            <div className="flex flex-wrap gap-4 justify-center w-11/12 sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto my-8">
                {practitionerList}
            </div>
        </>
    );
};

