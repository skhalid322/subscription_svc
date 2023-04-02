const { Product } = require("../models");

const router = require("express").Router();
router.route("/").post(create).get(getAll);
router.route("/:ID").get(getOne).put(udateOne).delete(removeOne);

function create(req, res, next) {
  let prod = new Product(req.body);
  prod.save((err, doc) => {
    if (!err) {
      return res.json({
        code: 0,
        message: "Created product successfully",
        data: doc,
      });
    }

    console.log(err);
    return res.status(500).json({ message: err.message });
  });
}

function getAll(req, res) {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.json({ code: 0, data: docs });
    }

    console.log(err);
    return res.status(500).json({ message: err.message, code: 1 });
  });
}

function updateOne(req, res, next) {
  Product.findOneAndUpdate(
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
  Product.findOneAndDelete({ _id: req.params.ID }, (err, doc) => {
    if (!err) {
      return res.json({ code: 0, message: "Deleted successfully" });
    }

    console.log(err);
    return res.status(500).json({ message: err.message, code: 1 });
  });
}

function getOne(req, res, next) {
  Product.findOne({ _id: req.params.ID }, (err, doc) => {
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
