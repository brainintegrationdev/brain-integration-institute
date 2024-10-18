// /* eslint-disable react/prop-types */
// import { useLocation } from 'react-router-dom';
// import { useEffect, useContext } from 'react';
// import { CloudinaryContext } from '../contexts';
// import { useAuth0 } from '@auth0/auth0-react';

// export const PaymentSuccessPage = ({ setStudyGuideAccess }) => {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const studyGuideAccess = queryParams.get('studyGuideAccess');
//     const cloudinaryUrl = queryParams.get('cloudinaryUrl');
//     const assessmentUrl = queryParams.get('assessmentUrl');
//     const {  email } = useContext(CloudinaryContext);
//     const { getAccessTokenSilently } = useAuth0();
//     // console.log(cloudinaryUrl);
//     // console.log(assessmentUrl)

//     const redirectToStudyGuide = async () => {
//         try {
//             const accessToken = await getAccessTokenSilently();
//             const response = await fetch('/api/get-signed-url', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify({
//                     userEmail: `${email}`,
//                     publicId: 'BII_study_guide_demo_rnrrbv',
//                     format: 'pdf',
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to get the signed URL');
//             }

//             const { signedUrl } = await response.json();

//             // Redirect the user to the signed URL
//             window.open(signedUrl, '_blank')
//         } catch (err) {
//             console.error('Error fetching the signed URL:', err);
//         } finally {
//             console.log('finished');
//         }
//     };

//     const redirectToAssessment = () => {
//         window.open('https://forms.gle/uL6ySYPDuwuXQj487', '_blank');
//     };

//     useEffect(() => {
//         if (studyGuideAccess === 'false') {
//             setStudyGuideAccess(true);
//         }
//     }, [studyGuideAccess, setStudyGuideAccess]);

//     return (
//         <div className="flex gap-10 items-center justify-center">
//             <h1>Payment Successful!</h1>
//             <br></br>
//             {cloudinaryUrl && (
//                 <a
//                     href={cloudinaryUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//                 >
//                     Download Study Guide
//                 </a>
//             )}
//             {studyGuideAccess ? (
//                 <button onClick={redirectToStudyGuide}>
//                     <a
//                         href={cloudinaryUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//                     >
//                         View Study Guide
//                     </a>
//                 </button>
//             ) :(
//                 <button onClick={redirectToAssessment}>
//                 <a
//                     href={assessmentUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//                 >
//                     Take the Assessment
//                 </a>
//                 </button>
//             )}
//         </div>
//     );
// };

import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CloudinaryContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';

export const PaymentSuccessPage = ({ setStudyGuideAccess }) => {
    const [showModal, setShowModal] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const studyGuideAccess = queryParams.get('studyGuideAccess');
    const cloudinaryUrl = queryParams.get('cloudinaryUrl');
    const assessmentUrl = queryParams.get('assessmentUrl');
    const { email } = useContext(CloudinaryContext);
    const { getAccessTokenSilently } = useAuth0();

    console.log(showModal);
    console.log(studyGuideAccess);

    useEffect(() => {
        if (open) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [open]);

    const redirectToStudyGuide = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch('/api/get-signed-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    userEmail: `${email}`,
                    publicId: 'BII_study_guide_demo_2_zg7zlv',
                    format: 'pdf',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get the signed URL');
            }

            const { signedUrl } = await response.json();
            window.open(signedUrl, '_blank');
        } catch (err) {
            console.error('Error fetching the signed URL:', err);
        }
    };

    console.log(cloudinaryUrl);

    const redirectToAssessment = () => {
        window.open(
            assessmentUrl || 'https://forms.gle/uL6ySYPDuwuXQj487',
            '_blank',
        );
    };

    useEffect(() => {
        if (studyGuideAccess === 'false') {
            setStudyGuideAccess(true);
        }
    }, [studyGuideAccess, setStudyGuideAccess]);

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full border-black flex flex-col gap-5">
                        <h1 className="text-xl text-center font-bold mb-4">
                            Payment Successful!
                        </h1>
                        <div className="flex gap-10 justify-center">
                            {studyGuideAccess ? (
                                <button
                                    onClick={redirectToStudyGuide}
                                    className=" h-[50px] px-4 py-2 text-white items-center bg-dark-green rounded-3xl mb-4"
                                >
                                    View Study Guide
                                </button>
                            ) : (
                                <button
                                    onClick={redirectToAssessment}
                                    className="block w-full px-4 py-2 text-white bg-green-600  rounded hover:bg-blue-700 mb-4"
                                >
                                    Take the Assessment
                                </button>
                            )}

                            <button
                                onClick={closeModal}
                                className="w-1/3 px-4 py-2 text-white items-center bg-red rounded-3xl mb-4"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
