const mongoose = require("mongoose");

const arrayModelSchema = new mongoose.Schema({
  key: { type: String },
  value: { type: String }
});

const productModelSchema = new mongoose.Schema(
  {
    id: { type: Number },
    category: { type: String },
    name: { type: String },
    ratings: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    discount: { type: Number },
    oriRate: { type: Number },
    disRate: { type: Number },
    feature: [{ type: String }],
    specification: [arrayModelSchema],
    images: [{ type: String }],
    colorVariant: [arrayModelSchema],
    price: { type: Number },
    manufacture_name: { type: String },
    manufacture_brand: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModelSchema);
