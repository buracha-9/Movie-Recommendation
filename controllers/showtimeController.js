const Showtime = require('../models/showtimeModel');

exports.getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.getAll();
    res.status(200).json(showtimes);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving showtimes' });
  }
};

exports.getShowtimeById = async (req, res) => {
  try {
    const showtime = await Showtime.getById(req.params.id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.status(200).json(showtime);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving showtime' });
  }
};

exports.createShowtime = async (req, res) => {
  const { movie_id, start_time, room_id } = req.body;

  try {
    const conflict = await Showtime.isConflict(start_time, room_id);
    if (conflict) {
      return res.status(400).json({
        message: 'Cannot schedule showtime. Conflict with existing show or not enough 2-hour gap.'
      });
    }

    const result = await Showtime.create(movie_id, start_time, room_id);
    res.status(201).json({ message: 'Showtime created successfully', showtimeId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating showtime' });
  }
};