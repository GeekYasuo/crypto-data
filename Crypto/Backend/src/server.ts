import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import cors from 'cors';
import { DataModel } from './models'; // Ensure DataModel is exported correctly

const app = express();
const port = 5000;

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/real', {
    serverSelectionTimeoutMS: 50000, // Increase timeout if needed
    connectTimeoutMS: 10000, // Increase timeout if needed
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Interface for the API response data
interface PriceData {
    usd: number;
}

// Function to fetch data and save it to the database
async function fetchData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bitcoin',
                vs_currencies: 'usd'
            }
        });

        const data = response.data;

        if (isPriceData(data.bitcoin)) {
            const document = new DataModel({
                symbol: 'bitcoin',
                price: data.bitcoin.usd,
                timestamp: new Date()
            });

            await document.save();
            console.log('Data saved to MongoDB');
        } else {
            console.error('Invalid data format:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Type guard function to validate PriceData
function isPriceData(data: any): data is PriceData {
    return data && typeof data.usd === 'number';
}

// Endpoint to get data from the database
app.get('/api/data', async (req: Request, res: Response) => {
    try {
        const symbol = req.query.symbol as string;
        if (!symbol) {
            return res.status(400).json({ error: 'Symbol is required' });
        }

        const data = await DataModel.find({ symbol }).sort({ timestamp: -1 }).limit(20);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Fetch and save data periodically (e.g., every 10 minutes)
setInterval(fetchData, 600000); // 600000ms = 10 minutes
