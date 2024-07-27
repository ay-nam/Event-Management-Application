// index.js
const express = require('express');
const cors = require('cors');
// .env file is properly loaded in your application
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('./connection');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});





// const express = require('express');
// const cors = require('cors');
// require('dotenv').config(); // Load environment variables from .env file
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth');

// const app = express();
// const PORT = process.env.PORT || 4000;

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });
