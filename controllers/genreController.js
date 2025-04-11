const Genre = require('../models/genreModel');

// Create a genre
exports.createGenre = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await Genre.create(name);
    res.status(201).json({ message: 'Genre created successfully!', genreId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating genre' });
  }
};

// Get all genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.getAll();
    res.status(200).json(genres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching genres' });
  }
};

// Get a genre by ID
exports.getGenreById = async (req, res) => {
  const { id } = req.params;

  try {
    const genre = await Genre.getById(id);
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching genre' });
  }
};

// Update a genre
exports.updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await Genre.update(id, name);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Genre updated successfully' });
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating genre' });
  }
};

// Delete a genre
exports.deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Genre.delete(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Genre deleted successfully' });
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting genre' });
  }
};
