/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { CloudinaryContext } from '../contexts';
const AdminUploadManagement = () => {
    const { uploadCompletionCertificate, getCertificate, deleteCertificate, certificateData, setCertificateData} = useContext(CloudinaryContext);
    const {  user  } = useAuth0();
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const token = localStorage.getItem('token');
                try {
                    const certificate = await getCertificate(token); 
                    setCertificateData(certificate)
                } catch (error) {
                    console.error(
                        'Error fetching files:',
                        error.response?.data || error.message,
                    );
                }
            }
        };

        fetchData();
    }, [user]);

   {certificateData && (console.log(certificateData))}


   //call deleteCertificate function to delete currently uploaded certificate template from cloudinary
   //require that existing cert is deleted before a new one is uploaded - disable upload button and add tooltip
   //render file name if there is a current uploaded certification, along with an x to delete it
   //similar to user accordion


 


    return (
        <div>
            <button className='border border-black p-5 rounded-xl'  alt="Upload Completion Certificate" onClick={uploadCompletionCertificate}>
                Upload completion certificate
                    
                   
              
            </button>
            {/* <p>{certificateData.filename}</p> */}
        </div>
    );
};

export default AdminUploadManagement;
