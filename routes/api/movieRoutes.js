const express = require('express');
const router = express.Router();
const movieController = require('../../controllers/movieController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { verifyAdmin } = require('../../middlewares/roleMiddleware');

// Define routes for movies
router.post('/movies', authMiddleware.authenticate, verifyAdmin, movieController.createMovie);
router.get('/movies', movieController.getAllMovies);
router.get('/movies/:id', movieController.getMovieById);
router.put('/movies/:id', authMiddleware.authenticate, verifyAdmin, movieController.updateMovie);
router.delete('/movies/:id', authMiddleware.authenticate, verifyAdmin, movieController.deleteMovie);

module.exports = router;
