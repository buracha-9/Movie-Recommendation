const express = require('express');
const router = express.Router();
const genreController = require('../../controllers/genreController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { verifyAdmin } = require('../../middlewares/roleMiddleware');

// Define routes for genres
router.post('/genres', authMiddleware.authenticate, verifyAdmin, genreController.createGenre);
router.get('/genres', authMiddleware.authenticate, verifyAdmin, genreController.getAllGenres);
router.get('/genres/:id', authMiddleware.authenticate, verifyAdmin, genreController.getGenreById);
router.put('/genres/:id', authMiddleware.authenticate, verifyAdmin, genreController.updateGenre);
router.delete('/genres/:id', authMiddleware.authenticate, verifyAdmin, genreController.deleteGenre);

module.exports = router;
