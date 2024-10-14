import mongoose from "mongoose";

const { Schema, model } = mongoose; 

const transactionSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }, // Ensure this field is included
    description: { type: String, required: true },
    dateTime: { type: Date, required: true }
});

const transactionModel = model('Transaction', transactionSchema);

export default transactionModel;
