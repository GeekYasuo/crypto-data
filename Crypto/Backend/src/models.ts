import mongoose from 'mongoose';

// Define the schema for the data collection
const DataSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Add indexes to improve query performance
DataSchema.index({ symbol: 1, timestamp: -1 });

// Define and export the model
export const DataModel = mongoose.model('Data', DataSchema);
