import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, useContext } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CloudinaryContext } from '../contexts';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { updateUserStudyGuide, email } = useContext(CloudinaryContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        updateUserStudyGuide(email);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/success?studyGuideAccess=true`,
            },
        });
        // setIsProcessing(false);

        // if (error) {
        //     if (error.type === 'card_error' || error.type === 'validation_error') {
        //         setMessage(error.message);
        //     } else {
        //         setMessage('An unexpected error occurred.');
        //     }
        // } else {
        //     // Payment succeeded
        //   console.log('completed')
        //     // Call the update function here
        // }

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
            return;
        }
    };

    return (
        <div className="flex flex-col gap-10 items-center border border-black rounded-lg p-10 text-center">
            <form id="payment-form" onSubmit={handleSubmit}>
                <h1>Brain Integration Study Guide</h1>
                <h2> $65.00 USD plus tax</h2>
                <br></br>
                <h1>Powered by Stripe</h1>
                <br></br>
                <div className='flex flex-col gap-10'>
                    <PaymentElement id="payment-element" />

                    <button
                        disabled={isProcessing || !stripe || !elements}
                        id="submit"
                        className="btn bg-dark-green rounded-lg text-white"
                    >
                        <span id="button-text">
                            {isProcessing ? 'Processing ... ' : 'Pay now'}
                        </span>
                    </button>
                </div>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
