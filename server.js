require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT; 
const movieRoutes = require('./routes/api/movieRoutes');
const genreRoutes = require('./routes/api/genreRoutes');
const reservationRoutes = require('./routes/api/reservationRoutes');
const userRoutes = require('./routes/api/userRoutes');
const seatRoutes = require('./routes/api/seatRoutes');
const showtimeRoutes = require('./routes/api/showtimeRoutes');
const loginRoutes = require('./routes/loginRoutes');

// Middleware to parse JSON data
app.use(express.json());

// Use the routes
app.use('/', loginRoutes);
app.use('/api', movieRoutes);
app.use('/api', genreRoutes);
app.use('/api', reservationRoutes);
app.use('/api', userRoutes);
app.use('/api', seatRoutes);
app.use('/api', showtimeRoutes);

// Placeholder for routes later
app.get('/', (req, res) => {
  res.send('Hello, welcome to the Movie Recommendation app!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
