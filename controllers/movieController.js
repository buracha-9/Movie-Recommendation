const Movie = require('../models/movieModel');

// Create a movie
exports.createMovie = async (req, res) => {
  const { title, description, poster_url, genre_id } = req.body;

  try {
    // Check if the movie title already exists
    const existingMovie = await Movie.getByTitle(title);
    if (existingMovie) {
      return res.status(400).json({ message: 'Movie with this title already exists' });
    }

    const result = await Movie.create(title, description, poster_url, genre_id);
    res.status(201).json({ message: 'Movie created successfully!', movieId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating movie' });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.getAll();
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching movies' });
  }
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.getById(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching movie' });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, poster_url, genre_id } = req.body;

  try {
    const result = await Movie.update(id, title, description, poster_url, genre_id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Movie updated successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating movie' });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Movie.delete(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting movie' });
  }
};
