import { useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { CloudinaryContext } from '../contexts';
import { useAuth0 } from '@auth0/auth0-react';

export const PaymentSuccessPage = ({ setStudyGuideAccess }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const studyGuideAccess = queryParams.get('studyGuideAccess');
    const cloudinaryUrl = queryParams.get('cloudinaryUrl');
    const assessmentUrl = queryParams.get('assessmentUrl');
    const { updateUserStudyGuide, email } = useContext(CloudinaryContext);
    const {  getAccessTokenSilently } = useAuth0();
    // console.log(cloudinaryUrl);
    // console.log(assessmentUrl)

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
                    publicId: 'BII_study_guide_demo_sf9r4v' // Replace with actual publicId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get the signed URL');
            }

            const { signedUrl } = await response.json();

            // Redirect the user to the signed URL
            window.location.href = signedUrl;
        } catch (err) {
            console.error('Error fetching the signed URL:', err);
        } finally {
            console.log('finished');
        }
    };

    useEffect(() => {
        if (studyGuideAccess === 'false') {
            setStudyGuideAccess(true);
        }
    }, [studyGuideAccess, setStudyGuideAccess]);

    return (
        <div className="flex gap-10 items-center justify-center">
            <h1>Payment Successful!</h1>
            <br></br>
            {cloudinaryUrl && (
                <a
                    href={cloudinaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Download Study Guide
                </a>
            )}
            {studyGuideAccess && (
                <button onClick={redirectToStudyGuide}>
                    <a
                        href={cloudinaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                    >
                        Download Study Guide
                    </a>
                </button>
            )}
            {assessmentUrl && (
                <a
                    href={assessmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Take the Assessment
                </a>
            )}
        </div>
    );
};
