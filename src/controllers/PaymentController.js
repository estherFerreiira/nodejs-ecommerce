const KEY = process.env.STRIPEKEY
const stripe = require("stripe")(KEY);

const postPayment = async(req, res) => {
    stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: "usd",
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            res.status(500).json(stripeErr);
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );
}
module.exports = {postPayment}