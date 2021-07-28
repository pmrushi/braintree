const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res) => {
    console.log(req)
    console.log(req.data)
    //console.log(res)
    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        // Use your own credentials from the sandbox Control Panel here
        merchantId: '<merchantId>',
        publicKey: '<publicKey>',
        privateKey: '<privateKey>'
    });

    // Use the payment method nonce here
        const nonceFromTheClient = req.body.paymentMethodNonce;
    // Create a new transaction for $10
    const newTransaction = gateway.transaction.sale({
        amount: '80',
        paymentMethodNonce: nonceFromTheClient,
        options: {
            // This option requests the funds from the transaction
            // once it has been authorized successfully
            // submitForSettlement: false
        }
    }, (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(500).send(error);
        }
    });
});

module.exports = router;