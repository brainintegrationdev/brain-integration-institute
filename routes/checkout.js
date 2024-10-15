
const ex = require('express');
require('dotenv').config();
const { validateAuthToken } = require('../middleware/auth.js')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkoutRouter = ex.Router();


//study guide checkout
checkoutRouter.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Study Guide",
                },
                unit_amount: 6500
            }, 
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:5173/success?cloudinaryUrl=https://asset.cloudinary.com/dpbf9gwjq/6e850ac9df785e0d7f89593699f0ac0f',
        cancel_url: 'http://localhost:5173/profile',
    })
    res.json({ id: session.id });
})

checkoutRouter.post('/create-assessment-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Brain Integration Exam",
                },
                unit_amount: 25000
            }, 
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:5173/success?assessmentUrl=https://ashleymckellar.com',
        cancel_url: 'http://localhost:5173/profile',
    })
    res.json({ id: session.id });

    //
})

module.exports = { checkoutRouter}