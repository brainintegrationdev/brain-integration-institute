/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CloudinaryContext } from '../contexts';
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// Cloudinary Provider Component
export const CloudinaryProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [publicId, setPublicId] = useState('');
    const [filename, setFilename] = useState('');
    const [loaded, setLoaded] = useState(false);
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [files, setFiles] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sectionName, setSectionName] = useState('');
    const [fileMetaData, setFileMetaData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [studyGuideAccess, setStudyGuideAccess] = useState(false);
    const [email, setEmail] = useState('');
    const [userMetaData, setUserMetaData] = useState({});

    // const [uploading, setUploading] = useState(false);
    // const [uploadError, setUploadError] = useState(null);
    const [imageUrl, setImageUrl] = useState(user?.userProfilePicture || '');
    const [profilePhotoUploaded, setProfilePhotoUploaded] = useState(false)
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const fileMetaDataEndpoint = `${baseUrl}/api/files`;
    // const callBackEndpoint = `${baseUrl}/api/images/${user.nickname}`
    const userMetaDataEndpoint = `${baseUrl}/api/user/${user.email}`
    

    // const handleProfileUpload = () => {
    //     console.log('photo uploaded!');
    // };



    const uwConfig = {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,

        resource_type: 'auto',
    };
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const apiKey = import.meta.VITE_CLOUDINARY_API_KEY;

    // console.log(isAuthenticated);

    //gets file metadata
    const getFiles = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                fileMetaDataEndpoint,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            return response.data.files;
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    //gets files from Cloudinary via callback/cors proxy
    const getFilesInFolder = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `${baseUrl}/api/images/${user.nickname}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const getUserMetaData = async (email) => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                userMetaDataEndpoint,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            const metaData = response.data;

            // Update state with the fetched metadata
            setUserMetaData(metaData);
            setImageUrl(metaData.userProfilePicture); 

            return metaData;
        } catch (error) {
            console.error('Error fetching user metadata:', error);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const cld = new Cloudinary({
        cloud: {
            cloudName: uwConfig.cloudName,
            uploadPreset: uwConfig.uploadPreset,
            asset_folder: uwConfig.asset_folder,
        },
    });

    useEffect(() => {
        if (!loaded) {
            const uwScript = document.getElementById('uw');
            if (!uwScript) {
                const script = document.createElement('script');
                script.setAttribute('async', '');
                script.setAttribute('id', 'uw');
                script.src =
                    'https://upload-widget.cloudinary.com/global/all.js';
                script.addEventListener('load', () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                setLoaded(true);
            }
        }
        return () => {
            const uwScript = document.getElementById('uw');
            if (uwScript) {
                uwScript.removeEventListener('load', () => setLoaded(true));
            }
        };
    }, [loaded]);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    //this whole function is being called inside getStudyGuide in accordioncard

    const updateUserProgress = async (newProgress) => {
        console.log('updateUserProgress called with:', newProgress);
        //this works
        if (user) {
            try {
                const accessToken = await getAccessTokenSilently();
                console.log('Updating user progress:', {
                    userUploadProgress: newProgress,
                });
                console.log('User email:', user.email);
                console.log('User object:', user);

                const response = await fetch(
                    `${baseUrl}/api/user/${user.email}/progress`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            userUploadProgress: newProgress,
                        }),
                    },
                );

                console.log('Response Status:', response.status);
                console.log('Response Status Text:', response.statusText);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Failed to update user progress:', errorData);
                    throw new Error('Failed to update user progress');
                }

                const data = await response.json();
                console.log('User progress updated on the server:', data);
            } catch (error) {
                console.error('Error updating user progress:', error);
            }
        } else {
            console.error('User is not defined');
        }
    };

    // console.log(email)
    // console.log(user)

    const updateUserStudyGuide = async (email) => {
        console.log('updateUserStudyGuide called');
        if (!email) {
            console.error('Email is required to update the study guide.');
            return;
        }

        try {
            const accessToken = await getAccessTokenSilently();
            console.log('Access Token:', accessToken);
            console.log('Updating study guide for:', email);

            const response = await fetch(
                `${baseUrl}/api/user/${email}/study-guide`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ studyGuideAccess: true }),
                },
            );

            console.log('Response Status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to update user study guide:', errorData);
                throw new Error('Failed to update user study guide');
            }

            const data = await response.json();
            console.log('User study guide updated on the server:', data);
            setStudyGuideAccess(true);
        } catch (error) {
            console.error('Error updating user study guide:', error);
        }
    };

    const initializeCloudinaryWidget = (section) => {
        if (user) {
            const myWidget = window.cloudinary.createUploadWidget(
                {
                    cloudName: uwConfig.cloudName,
                    uploadPreset: uwConfig.uploadPreset,
                    asset_folder: `users/${user.nickname}`,
                },
                async (error, result) => {
                    if (error) {
                        console.error('Upload error:', error);
                        return;
                    }
                    if (result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        const newProgress = Math.max(progress + 1, 8);

                        setProgress(newProgress);
                        await updateUserProgress(newProgress);

                        const fileMetadata = {
                            publicId: result.info.public_id,
                            url: result.info.secure_url,
                            uploadDate: result.info.created_at,
                            filename: result.info.original_filename,
                            sectionName: section,
                            isApproved: false,
                        };

                        setPublicId(result.info.public_id);
                        setFilename(result.info.original_filename);
                        setFileMetaData((prevMetaData) => [
                            ...prevMetaData,
                            fileMetadata,
                        ]);

                        // Send metadata to the server
                        try {
                            const accessToken = await getAccessTokenSilently();
                            const response = await fetch(
                                `${baseUrl}/api/files`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(fileMetadata),
                                },
                            );

                            if (response.ok) {
                                console.log(
                                    'File metadata successfully sent to the server.',
                                );
                                setFiles((prevFiles) => [
                                    ...prevFiles,
                                    fileMetadata,
                                ]);
                            } else {
                                console.error(
                                    'Failed to send file metadata to the server.',
                                );
                            }
                        } catch (error) {
                            console.error(
                                'Error sending file metadata:',
                                error,
                            );
                        }
                    }
                },
            );

            myWidget.open();
        }
    };

    const uploadProfilePicture = (file) => {
        if (user) {
            const myWidget = window.cloudinary.createUploadWidget(
                {
                    cloudName: uwConfig.cloudName,
                    uploadPreset: uwConfig.uploadPreset,
                    asset_folder: `users/${user.nickname}`,
                },
                async (error, result) => {
                    if (error) {
                        console.error('Upload error:', error);
                        return;
                    }
                    if (result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        
                        const userMetaData = {
                            userProfilePicture: result.info.secure_url
                        };
    
                        // Update state with new profile picture URL
                        setImageUrl(result.info.secure_url);
                        setProfilePhotoUploaded(true);
    
                        // Send metadata to the server
                        try {
                            const accessToken = await getAccessTokenSilently();
                            const response = await fetch(
                                `${baseUrl}/api/user/${user.email}/profile-picture`,
                                {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(userMetaData),
                                }
                            );
    
                            if (response.ok) {
                                console.log('User metadata successfully sent to the server.');
                            } else {
                                console.error('Failed to send user metadata to the server.');
                            }
                        } catch (error) {
                            console.error('Error sending user metadata:', error);
                        } finally {
                            // Close the widget after processing
                            myWidget.close();
                        }
                    }
                }
            );
    
            myWidget.open();
        }
    };
    

    
    

    //delete certification file
    const deleteFile = async (publicId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `${baseUrl}/api/files/${publicId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            if (response.ok) {
                console.log('File and metadata deleted successfully.');
                setFileMetaData((prevMetaData) =>
                    prevMetaData.filter((file) => file.publicId !== publicId),
                );
                setDeleteModalOpen(false);
                setFiles((prevFiles) =>
                    prevFiles.filter((file) => file.publicId !== publicId),
                );
                setProgress((prevProgress) => {
                    const newProgress = Math.max(0, prevProgress - 1);
                    updateUserProgress(newProgress);
                    return newProgress;
                });
            } else {
                console.error('Failed to delete file.');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <CloudinaryContext.Provider
            value={{
                uwConfig,
                initializeCloudinaryWidget,
                filename,
                getFiles,
                getFilesInFolder,
                files,
                progress,
                setProgress,
                isSubmitted,
                setIsSubmitted,
                sectionName,
                setSectionName,
                fileMetaData,
                setFileMetaData,
                setFiles,
                isLoading,
                getUserMetaData,
                updateUserProgress,
                deleteFile,
                deleteModalOpen,
                setDeleteModalOpen,
                updateUserStudyGuide,
                studyGuideAccess,
                setStudyGuideAccess,
                email,
                uploadProfilePicture,
                profilePhotoUploaded,
                setProfilePhotoUploaded,
                imageUrl,
                userMetaData,
                setUserMetaData
            }}
        >
            {loaded && children}
        </CloudinaryContext.Provider>
    );
};
