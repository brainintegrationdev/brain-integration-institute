import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useAuth0 } from '@auth0/auth0-react';

export const Payment = ({stripePromise, showPayment, studyGuideAccess, setStudyGuideAccess}) => {

    const [clientSecret, setClientSecret] = useState('');
    const {  getAccessTokenSilently } = useAuth0();
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    // const [stripePromise, setStripePromise] = useState(null);
    // const [clientSecret, setClientSecret] = useState('');

    console.log(clientSecret);
    console.log(stripePromise);
    console.log(studyGuideAccess)

    // useEffect(() => {
    //     console.log('Payment component mounted');

    //     fetch('/publishable-key').then(async (r) => {
    //         if (!r.ok) {
    //             console.error('Failed to fetch publishable key:', r.statusText);
    //             return;
    //         }
    //         const { publishableKey } = await r.json();
    //         setStripePromise(loadStripe(publishableKey));
    //         console.log('stripe promise set')
    //     });
    // }, []);

    useEffect(() => {
        if (showPayment) {
         createPaymentIntent()
        }
    }, [showPayment]);


    const createPaymentIntent = async () => {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken)
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
            body: JSON.stringify({}),
        }).then(async (response) => {
            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
           
        });

    }

    //const getPublishableKey = async () => {
    //     const accessToken = await getAccessTokenSilently();
    //     fetch('/publishable-key', {
    //         method: 'GET',
    //         cache: 'no-store', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     })
    //     .then(async (response) => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         const { publishableKey } = await response.json();
    //         setStripePromise(loadStripe(publishableKey));
    //         console.log("Stripe promise set successfully");
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching publishable key:", error);
    //     });
    // }

    // useEffect(() => {
    //     fetch('/create-payment-intent', {
    //         method: 'POST',
    //         body: JSON.stringify({}),
    //     }).then(async (r) => {
    //         if (!r.ok) {
    //             console.error('Failed to create payment intent:', r.statusText);
    //             return;
    //         }
    //         const { clientSecret } = await r.json();
    //         setClientSecret(clientSecret);
    //         console.log('client secret retrieved')
    //     });
    // }, []);

    return (
        <>
         
            
            {clientSecret && stripePromise && (
                <div className='flex flex-col'>
                <Elements stripe={stripePromise} options={{ clientSecret }} >
                    
                    <CheckoutForm setStudyGuideAccess={setStudyGuideAccess} studyGuideAccess={studyGuideAccess}/>
                </Elements>
                </div>
            )}
            
        </>
    );
};

export default Payment;
