const router = require("express").Router();
const productRoutes = require("./product");
const subscriptionRoutes = require("./subscription");

router.route("/subscription", subscriptionRoutes);
module.exports = router;
