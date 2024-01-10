const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./Configuration/Config');
const itemRoute = require('./routes/itemRoute');
const bills = require('./routes/billsRoute')

// Environment Variable configuration
dotenv.config();
connectDb();

// REST API object
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/items', itemRoute);
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/bills', bills);



// PORT
const PORT = process.env.PORT || 8000;

// Listen
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
