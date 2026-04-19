const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('./models/Category');

const app = express();
const port = process.env.PORT || 5000;

// Proper CORS for Vercel deployment
const corsOptions = {
  origin: ['https://swachh-mart.vercel.app', 'http://localhost:5173'], // Replace with actual vercel URL later if known, or use '*' for now
  optionsSuccessStatus: 200
};
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const dbHost = mongoose.connection.host;
  console.log(`Connected to MongoDB: ${dbHost}`);
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'Swachh Mart API is running!' });
});

// GET all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST to sync the entire categories tree
app.post('/api/categories/sync', async (req, res) => {
  try {
    const categoriesArray = req.body;
    
    // Wipe and drop existing items
    await Category.deleteMany({});
    
    // Insert new
    if (categoriesArray && categoriesArray.length > 0) {
      await Category.insertMany(categoriesArray);
    }
    
    res.json({ message: 'Catalog synced to MongoDB successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to sync catalog' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
