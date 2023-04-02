const { Subscription } = require("../models");

const router = require("express").Router();
router.route("/").post(create).get(getAll);
router.route("/:ID").get(getOne).put(updateOne).delete(removeOne);

function create(req, res, next) {
  let subscription = new Subscription(req.body);
  subscription.save((err, doc) => {
    if (!err) {
      return res.json({
        code: 0,
        message: "Created subscription successfully",
        data: doc,
      });
    }

    console.log(err);
    return res.status(500).json({ message: err.message });
  });
}

function getAll(req, res) {
  Subscription.find({}, (err, docs) => {
    if (!err) {
      return res.json({ code: 0, data: docs });
    }

    console.log(err);
    return res.status(500).json({ message: err.message, code: 1 });
  });
}

function updateOne(req, res, next) {
  Subscription.findOneAndUpdate(
    { _id: req.params.ID },
    req.body,
    { upsert: false, new: true },
    (err, doc) => {
      if (!err) {
        return res.json({
          code: 0,
          message: "updated successfully",
          data: doc,
        });
      }

      console.log(err);
      return res.status(500).json({ code: 1, message: err.message });
    },
  );
}

function removeOne(req, res, next) {
  Subscription.findOneAndDelete({ _id: req.params.ID }, (err, doc) => {
    if (!err) {
      return res.json({ code: 0, message: "Deleted successfully", data: doc });
    }

    console.log(err);
    return res.status(500).json({ message: err.message, code: 1, data: doc });
  });
}

function getOne(req, res, next) {
  Subscription.findOne({ _id: req.params.ID }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    if (!doc) {
      return res.json({ code: 1, message: "record not found" });
    }

    return res.json({ code: 0, message: "", data: doc });
  });
}

module.exports = router;
