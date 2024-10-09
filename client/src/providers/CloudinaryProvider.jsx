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

    const uwConfig = {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,

        resource_type: 'auto',
    };
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const apiKey = import.meta.VITE_CLOUDINARY_API_KEY;

    console.log(isAuthenticated);

    //gets file metadata
    const getFiles = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.get(
                `http://localhost:8080/api/files`,
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
                `http://localhost:8080/api/images/${user.nickname}`,
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
                `http://localhost:8080/api/user/${user.email}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return response.data;
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

    const updateUserProgress = async (newProgress) => {
        if (user) {
            try {
                const accessToken = await getAccessTokenSilently();
                console.log('Updating user progress:', {
                    userUploadProgress: newProgress,
                });
                console.log('User email:', user.email);
                console.log('User object:', user);

                const response = await fetch(
                    `http://localhost:8080/api/user/${user.email}/progress`,
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

                        updateUserProgress(Math.min(progress + 1, 8));

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
                                'http://localhost:8080/api/files',
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

                                await updateUserProgress(
                                    user.email,
                                    newProgress,
                                );
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

    const deleteFile = async (publicId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(
                `http://localhost:8080/api/files/${publicId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            if (response.ok) {
                console.log('File and metadata deleted successfully.');
                setFileMetaData((prevMetaData) =>
                    prevMetaData.filter((file) => file.publicId !== publicId)
                );
                setDeleteModalOpen(false)
                setFiles((prevFiles) =>
                    prevFiles.filter((file) => file.publicId !== publicId)
                );
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
                setDeleteModalOpen
            }}
        >
            {loaded && children}
        </CloudinaryContext.Provider>
    );
};
