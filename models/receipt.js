const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

let ReceiptSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  paymentType: {
    type: String,
    required: true,
  },
  ccName: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: [
      "Food",
      "Entertainment",
      "House",
      "Car",
      "Work",
      "Clothing",
      "Pet",
      "Self-Care",
    ],
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  total: { type: Number },
});

ReceiptSchema.virtual("url").get(function () {
  return "/catalog/receipt/" + this._id;
});

ReceiptSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

ReceiptSchema.virtual("date_adjusted").get(function () {
  return this.date.toLocaleDateString("en-CA");
});

ReceiptSchema.virtual("date_month").get(function () {
  return DateTime.fromJSDate(this.date).monthLong;
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
