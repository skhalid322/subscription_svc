const { Subscription, UserSubscription } = require("../models");
const createUserSubscription = async (data) => {
  try {
    const { userId, amount, currency, paymentRef, subscriptionId } = data;
    const subscription = await Subscription.findOne({ _id: subscriptionId });
    if (!subscription) {
      return;
    }
    let expiresAt = new Date();
    if (subscription.type === "duration") {
      expiresAt.setDate(expiresAt.getDate() + subscription.duration); // set expiry date
    }

    let userSub = new UserSubscription({
      user: userId,
      amountPaid: amount,
      currency,
      paymentRef,
      subscription: subscriptionId,
      expiresAt:
        subscription.type === "duration"
          ? expiresAt
          : subscription.type === "duration_quantity"
          ? expiresAt
          : null,
      duration: subscription.duration,
      quantity: subscription.quantity || 1,
      product: subscription.product,
    });

    userSub.save((err, doc) => {
      if (err) {
        console.log("saving subscription failed due to error ");
        console.log(err);
        return;
      }

      console.log("subscription created successfully ");
    });
  } catch (error) {
    console.log(error);
    console.log(
      "...... creating user subscription failed due to error above .......",
    );
  }
};

module.exports = createUserSubscription;
