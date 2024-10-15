import { useLocation } from 'react-router-dom';

export const PaymentSuccessPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cloudinaryUrl = queryParams.get('cloudinaryUrl'); 
    const assessmentUrl = queryParams.get('assessmentUrl')
    console.log(cloudinaryUrl);
    console.log(assessmentUrl)

    return (
        <div className='flex gap-10 items-center justify-center'>
            <h1>Payment Successful!</h1>
            <br></br>
            {cloudinaryUrl && (
                <a
                    href={cloudinaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                    Download your Study Guide
                </a>
            )}
            {assessmentUrl && (
                   <a
                   href={assessmentUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
               >
                Take the Assessment</a>
            )}
        </div>
    );
};
