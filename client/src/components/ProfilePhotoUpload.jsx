// /* eslint-disable react/prop-types */
// // import { useState, useContext } from 'react';
// // import ProfileEditIcon from '../assets/icons/profileEditIcon.png';
// // import { CloudinaryContext } from '../contexts';
// // import { useAuth0 } from '@auth0/auth0-react';

// // export const ProfilePhotoUpload = () => {
// //     const { uploadProfilePicture, profilePhotoUploaded, setProfilePhotoUploaded } = useContext(CloudinaryContext);

// //     const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

// //     const [selectedFile, setSelectedFile] = useState(null);

// //     console.log(profilePhotoUploaded)

// //     // const [uploading, setUploading] = useState(false);
// //     // const [uploadError, setUploadError] = useState(null);
// //     // const [imageUrl, setImageUrl] = useState(user?.userProfilePicture || '');
// //     // const handleProfileUpload = () => {
// //     //     console.log('photo uploaded!');
// //     // };

// //     return (
// //         <div className="flex justify-start">
// //             {isAuthenticated && !profilePhotoUploaded && (
// //                 <div className="relative">
// //                     <img
// //                         className="h-[200px] w-[200px] ml-20 mr-[80px] rounded-full"
// //                         src={user.picture}
// //                         alt="avatar"
// //                     />

// //                     <button onClick={uploadProfilePicture}>
// //                         <img
// //                             className="h-[40px] w-[40px] absolute  bottom-30 right-10"
// //                             src={ProfileEditIcon}
// //                             alt="Edit Icon"
// //                         />
// //                     </button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default ProfilePhotoUpload;

// import { useState, useContext, useEffect } from 'react';
// import ProfileEditIcon from '../assets/icons/profileEditIcon.png';
// import { CloudinaryContext } from '../contexts';
// import { useAuth0 } from '@auth0/auth0-react';

// export const ProfilePhotoUpload = (props) => {
//     const {
//         uploadProfilePicture,
//         profilePhotoUploaded,
//         setProfilePhotoUploaded,
//         imageUrl,
//         getUserMetaData
        
        
//     } = useContext(CloudinaryContext);
//     const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

//     const [selectedFile, setSelectedFile] = useState(null);
//     console.log(imageUrl);
//     const { userMetaData, setUserMetaData } = props

//     console.log(userMetaData);
//     console.log(profilePhotoUploaded)

//     useEffect(() => {
//         const fetchData = async () => {
//             if (user) {
//                 const token = localStorage.getItem('token');
//                 try {
//                     const fetchedUserMetaData = await getUserMetaData(token);
//                     setUserMetaData(fetchedUserMetaData);
//                 } catch (error) {
//                     console.error(
//                         'Error fetching user metadata:',
//                         error.response?.data || error.message,
//                     );
//                 }
//             }
//         };

//         fetchData();
//     }, [user]);

  

//     return (
//         <div className="flex justify-start">
//             {isAuthenticated && !profilePhotoUploaded ? (
//                 <div className="relative">
//                     <img
//                         className="h-[200px] w-[200px] ml-20 mr-[80px] rounded-full"
//                         src={user.picture}
//                         alt="avatar"
//                     />

//                     <button onClick={uploadProfilePicture}>
//                         <img
//                             className="h-[40px] w-[40px] absolute bottom-30 right-10"
//                             src={ProfileEditIcon}
//                             alt="Edit Icon"
//                         />
//                     </button>
//                 </div>
//             ) : (
//                 <div className="relative">
//                     <img
//                         className="h-[200px] w-[200px] ml-20 mr-[80px] rounded-full"
//                         src={userMetaData.userProfilePicture}
//                         alt="avatar"
//                     />

//                     <button onClick={uploadProfilePicture}>
//                         <img
//                             className="h-[40px] w-[40px] absolute bottom-30 right-10"
//                             src={ProfileEditIcon}
//                             alt="Edit Icon"
//                         />
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfilePhotoUpload;

import { useState, useContext, useEffect } from 'react';
import ProfileEditIcon from '../assets/icons/profileEditIcon.png';
import { CloudinaryContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';

export const ProfilePhotoUpload = (props) => {
    const {
        uploadProfilePicture,
        getUserMetaData,
        userMetaData,
        setUserMetaData
    } = useContext(CloudinaryContext);
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    // const { userMetaData, setUserMetaData } = props;

    // Local state for profile picture URL
    const [profilePictureUrl, setProfilePictureUrl] = useState(user?.picture);

    // Fetch user metadata on component mount to get the saved profile picture URL
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const token = localStorage.getItem('token');
                try {
                    const fetchedUserMetaData = await getUserMetaData(token);
                    setUserMetaData(fetchedUserMetaData);

                    // Update profile picture URL if it exists in user metadata
                    if (fetchedUserMetaData?.userProfilePicture) {
                        setProfilePictureUrl(fetchedUserMetaData.userProfilePicture);
                    }
                } catch (error) {
                    console.error(
                        'Error fetching user metadata:',
                        error.response?.data || error.message,
                    );
                }
            }
        };

        fetchData();
    }, [ ]);

    // Handler for uploading a new profile picture
    const handleProfilePictureUpload = async () => {
        try {
            const newProfilePictureUrl = await uploadProfilePicture(); 
            if (newProfilePictureUrl) {
                setProfilePictureUrl(newProfilePictureUrl);

                // Update user metadata to persist the new profile picture URL
                const updatedUserMetaData = {
                    ...userMetaData,
                    userProfilePicture: newProfilePictureUrl,
                };
                setUserMetaData(updatedUserMetaData);

                
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <div className="flex justify-start">
            {isAuthenticated ? (
                <div className="relative">
                    <img
                        className="h-[200px] w-[200px] ml-20 mr-[80px] rounded-full"
                        src={profilePictureUrl}
                        alt="avatar"
                    />

                    <button onClick={handleProfilePictureUpload}>
                        <img
                            className="h-[40px] w-[40px] absolute bottom-30 right-10"
                            src={ProfileEditIcon}
                            alt="Edit Icon"
                        />
                    </button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProfilePhotoUpload;

