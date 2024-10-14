
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import transaction from "./models/Transaction.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4444;

// Connect to MongoDB once at the start
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.post('/api/transaction', async (req, res) => {
    try {
        const { name, description, dateTime, price } = req.body;
        const newTransaction = await transaction.create({
            name,
            price, // Ensure the price is included
            description,
            dateTime,
        });
        res.status(201).json(newTransaction); // 201 Created
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Your app is running on port ${port}`);
});
































// mongoDB user passwrod and accound
// username : money
// passwrod: moneyTracker