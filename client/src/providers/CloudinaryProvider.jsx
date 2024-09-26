/* eslint-disable react/prop-types */
import { CloudinaryContext } from '../contexts';
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useAuth0 } from '@auth0/auth0-react';
// import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
// import AccordionCard from '../components/AccordionCard';

// Cloudinary Provider Component
export const CloudinaryProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [publicId, setPublicId] = useState('');
    const [loaded, setLoaded] = useState(false);
    const { user, getAccessTokenSilently } = useAuth0();

    console.log(user)
    // Define the uwConfig object from environment variables
  
    const uwConfig = {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
       
      
        resource_type: 'auto',
        
    };


    // console.log(uwConfig)

    // eslint-disable-next-line no-unused-vars
    const cld = new Cloudinary({
        cloud: {
            cloudName: uwConfig.cloudName,
            uploadPreset: uwConfig.uploadPreset,
            asset_folder: uwConfig.asset_folder
            
        },
    });

    //   const myImage = cld.image(publicId);
    // const { getAccessTokenSilently } = useAuth0();

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

    const initializeCloudinaryWidget = () => {
     
        if (user) {
            // console.log('widget loaded!');
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
                        console.log('Public ID sent to Cloudinary:', result.info.public_id);  // Log public_id
                        console.log('Upload Result:', result.info);
                        const fileMetadata = {
                            publicId: result.info.public_id,
                            url: result.info.secure_url,
                            uploadDate: result.info.created_at,
                            filename: result.info.original_filename,
                            isApproved: false,
                        };
                        // console.log(result.info.public_id);
                        setPublicId(result.info.public_id);
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
                                    'File metadata successfully sent to the server.'
                                    
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

            // Open the Cloudinary widget when the button is clicked
            myWidget.open();
            // console.log('Widget button clicked');
        }
    };

    return (
        <CloudinaryContext.Provider
            value={{ uwConfig, initializeCloudinaryWidget }}
        >
            {loaded && children}
        </CloudinaryContext.Provider>
    );
};
