import express from 'express';
import { Stripe } from 'stripe';
import { sendAKT } from '../utils/transactions';
import axios from 'axios';

const paymentManager = express.Router();

const Domain = process.env.Domain;


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
});

const getAddress = async (email: string) => {
    return process.env.PRIVATE_KEY;
};

paymentManager.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount, currency } = req.body; // Receive amount from frontend


        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    price_data: {
                        unit_amount: amount * 100, // Convert amount to cents
                        currency, // Adjust currency if needed
                        product_data: {
                            images: ['https://cdn.sanity.io/images/tlr8oxjg/production/c735189812ef6b7f3ba148cfbf91b9998aa851e1-1290x722.png?w=3840&q=80&fit=clip&auto=format'],
                            name: 'Deposit Money',
                        },
                    },
                    quantity: 1,
                },
            ],
            billing_address_collection: "required",
            mode: 'payment',
            return_url: `${Domain}/return?session_id={CHECKOUT_SESSION_ID}`,
            payment_intent_data: {metadata: {tokenTransfered: "false"}}

        });


        console.log(session)
        res.send({ clientSecret: session.client_secret });
    } catch (error) {
        console.log(error)
        throw new Error("create-checkout-session Error")
    }
});

paymentManager.get('/conversionAkt_Usd', async (req, res) => {
    try {
        const conversion = await axios.get('https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=1&id=7431&convert_id=2781,2796');
        res.send({price :conversion.data.data.quote[0].price})
    } catch (error) {
        console.log(error)
        throw new Error("conversion Error")
    }
})

paymentManager.get('/session-status', async (req, res) => {
    try {
        const conversion = await axios.get('https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=1&id=7431&convert_id=2781,2796');
        const { session_id, recipientAddress } = req.query;
        const session = await stripe.checkout.sessions.retrieve(session_id as string);
        const paymentIntentId = session.payment_intent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string)
        console.log(paymentIntent)
        const amount = (session.amount_total / 100)
        const akt_amount = session.currency === "usd" ? (amount * (1 / conversion.data.data.quote[0].price)) : (amount * (1/ conversion.data.data.quote[1].price))
        let failed = false;


        if (session.payment_status == "paid" && paymentIntent.metadata.tokenTransfered == "false") {
            try {
                console.log(paymentIntent)
                await sendAKT(recipientAddress.toString(), (akt_amount * (10 ** 6)).toString())
                await stripe.paymentIntents.update(paymentIntentId as string, { metadata: { tokenTransfered: "true" } })

            } catch (error) {
                console.log(error)
                failed = true
                throw new Error("error sending token")
            }
        }
        else {
            throw new Error(" token already sent")
        }

        res.send({
            status: session.payment_status,
            customer_details: session.customer_details,
            amount: (amount / (10 ** 6) + "Akt").toString(),
            failed: failed

        });
    } catch (error) {
        console.log(error)
        throw new Error("not paid yet")
    }

});






export default paymentManager;