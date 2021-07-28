const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res) => {
    // console.log(req)
    // console.log(req.data)
    //console.log(res)
    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        // Use your own credentials from the sandbox Control Panel here
        merchantId: '<merchantId>',
        publicKey: '<publicKey>',
        privateKey: '<privateKey>'
    });

    // Use the payment method nonce here
    // const nonceFromTheClient = req.body.paymentMethodNonce;
    // Create a new transaction for $10
    gateway.transaction.submitForPartialSettlement('h3fxb8ee', 2, {
        "orderId": "h3fxb8ee"
    }).then(result => {
        console.log('------ssss--------')
        console.log(result)
        console.log(result.transaction);
        if (result.success) {
            console.log(result.transaction);
        }
    }).catch(error => {
        console.error(error);
    });
});

module.exports = router;