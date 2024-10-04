/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CloudinaryContext } from '../contexts';
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
// import AccordionCard from '../components/AccordionCard';

// Cloudinary Provider Component
export const CloudinaryProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [publicId, setPublicId] = useState('');
    const [filename, setFilename] = useState('');
    const [loaded, setLoaded] = useState(false);
    const { user, getAccessTokenSilently } = useAuth0();
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [sectionName, setSectionName] = useState(""); 
    const [fileMetaData, setFileMetaData] = useState([])
    const [isLoading, setIsLoading] = useState(true); 
    // const [error, setError] = useState(null); 


    const uwConfig = {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,

        resource_type: 'auto',
    };
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const apiKey = import.meta.VITE_CLOUDINARY_API_KEY;

    // const getFilesInFolder = async (folderName) => {
    //     if (user) {
    //         console.log(user.nickname);
    //         try {
    //             const accessToken = await getAccessTokenSilently();
    //             const response = await fetch(cloudinaryUrl, {
    //                 params: {
    //                     type: 'upload',
    //                     prefix: folderName,
    //                     max_results: 500,
    //                     resource_type: 'image',
    //                 },
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             });

    //             return response.data.resources;
    //         } catch (error) {
    //             console.error('Error fetching files from Cloudinary:', error);
    //             throw error;
    //         }
    //     }
    // };
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
              
                return response.data.files
           
          } catch (error) {
              console.error('Error fetching files:', error);
          
      
      };
    }

    
   
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
            return response.data
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    // const getFiles = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/files');
    //         setFiles(response.data);
    //     } catch (error) {
    //         console.error('Error fetching files:', error);
    //     }
    // };

    // getFilesInFolder(folderName)
    //     .then(files => console.log('Files in folder:', files))
    //     .catch(error => console.error('Error:', error));
    //     // console.log(uwConfig)

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

    // // if (progress < 8) {
    //     setProgress((prevProgress) => prevProgress + 1);
    //     console.log('document submitted!');
    //     console.log(progress);
    //     localStorage.setItem('progress', progress);
    //     setIsSubmitted(true);
    // } else {
    //     return;
    // }

    const initializeCloudinaryWidget = (section) => {
        if (user) {
            // console.log('widget loaded!');
            console.log(user);
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
                        // console.log('success', result);
                        console.log(
                            'Public ID sent to Cloudinary:',
                            result.info.public_id,
                        ); // Log public_id
                        console.log('Upload Result:', result.info);
                        const fileMetadata = {
                            publicId: result.info.public_id,
                            url: result.info.secure_url,
                            uploadDate: result.info.created_at,
                            filename: result.info.original_filename,
                            sectionName: section,
                            isApproved: false,
                        };
                        // console.log(result.info.public_id);
                        setPublicId(result.info.public_id);
                        setFilename(result.info.original_filename);
                        console.log(publicId);
                        console.log(filename);
                        // console.log(fileMetadata);

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
                                    'File metadata successfully sent to the server.'),
                                    setFiles((prevFiles) => [...prevFiles, fileMetadata]);
                                   
                                
                                if (progress < 8) {
                                    setProgress((prevProgress) => prevProgress + 1);
                                    console.log('Document submitted!');
                                    console.log(progress);
                                    localStorage.setItem('progress', progress);
                                    setIsSubmitted(true);
                                } else {
                                    return;
                                }
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

            // Open the Cloudinary widget when the button is clicked
            myWidget.open();
            // console.log('Widget button clicked');
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
                
            }}
        >
            {loaded && children}
        </CloudinaryContext.Provider>
    );
};
