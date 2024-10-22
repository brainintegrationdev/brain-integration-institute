/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from 'react';
import { http } from './http';
import { useAuth0 } from '@auth0/auth0-react';
import { FileContext } from './contexts';

/**
 * Automatically attaches Auth0 user access token to outgoing requests
 * @example
 * const { request } = useHttpAuthClient()
 * request('/api/path/to/authorized/resource')
 *  .then(data => {console.log(data)})
 *
 *
 * for protected routes that require authentication
 */
export const useHttpAuthClient = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [metadataCreated, setMetadataCreated] = useState(false);

    const createUserMetadata = async (user) => {
        if (!user || metadataCreated) return;

        const { email, name, picture } = user;

        try {
            const response = await fetch(
                'http://localhost:8080/api/user/createuser',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await getAccessTokenSilently()}`, 
                    },
                    body: JSON.stringify({
                        userEmail: email,
                        userName: name,
                        userProfilePicture: picture
                    }),
                },
            );

            const data = await response.json();
            // console.log(data);

            if (!response.ok) {
                console.error(
                    'Error creating or checking user metadata:',
                    data.error,
                );
            } else {
                console.log('User metadata:', data);
            }
        } catch (error) {
            console.error(
                'Error during check or create user metadata request:',
                error,
            );
        }
    };

    useEffect(() => {
        if (user && !metadataCreated) {
            createUserMetadata(user); 
        }
    }, [user, metadataCreated, getAccessTokenSilently]); 

    const handler = async (url, options) => {
        const accessToken = await getAccessTokenSilently();
        
        return http.request(accessToken)(url, options);
    };

    const request = {
        get: (url, options) => handler(url, { ...options, method: 'GET' }),
        post: (url, options) => handler(url, { ...options, method: 'POST' }),
        delete: (url, options) =>
            handler(url, { ...options, method: 'DELETE' }),
        put: (url, options) => handler(url, { ...options, method: 'PUT' }),
    };

    return {
        request,
    };
};

export const useLoadingApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return [loading, setLoading, error, setError];
};
//keeps track of file state and performs fetches of files, uploading new files, etc
export const useFileAPI = () => {
    const { request } = useHttpAuthClient();
    const [files, setFiles] = useState([]);

    const getUserFiles = async () => {
        const data = await request.get('/api/files');
        if (!data.success) throw Error(data.error);
        setFiles(data.files);
    };

    const uploadFile = async () => {
        const data = await request.post('/api/files', { body: formData });
        if (!data.success) throw Error(data.error);
        setFiles((prev) => [...prev, data.file]);
    };

  

    return {
        files,
        getUserFiles,
        uploadFile,
    };
};



 export const useProfileForm = (initialValues) => {
    
    const [inputs, setInputs] = useState(initialValues);
    const { getAccessTokenSilently, user } = useAuth0();

  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

  
    const resetInputs = () => {
        setInputs(initialValues);
    };

    const createProfileData = async () => {
        try {
            const response = await fetch('/api/create-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getAccessTokenSilently()}`, 
                },
                body: JSON.stringify(inputs),
            });

            const data = await response.json();
            if (!data.success) throw new Error(data.error);

            // Reset inputs after successful submission
            resetInputs();
            return data;
        } catch (error) {
            console.error('Failed to create profile:', error);
            throw error;
        }
    };

    return {
        inputs,
        useProfileForm,
        handleInputChange,
        createProfileData,
        resetInputs,
    };
};




export const useFileContext = () => useContext(FileContext);
