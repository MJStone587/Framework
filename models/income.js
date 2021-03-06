const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

let IncomeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  from: {
    type: String,
    enum: ["Job", "Gift", "Investment", "Savings", "Other"],
    required: true,
  },
  date: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
});

IncomeSchema.virtual("url").get(function () {
  return "/catalog/income/" + this._id;
});

IncomeSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

IncomeSchema.virtual("date_month").get(function () {
  return DateTime.fromJSDate(this.date).monthLong;
});

module.exports = mongoose.model("Income", IncomeSchema);
