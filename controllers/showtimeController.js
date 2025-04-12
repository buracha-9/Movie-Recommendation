const Showtime = require('../models/showtimeModel');
const Seat = require('../models/seatModel');

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
  const { movie_id, show_datetime, room_id, total_seats } = req.body;

  if (!total_seats || total_seats <= 0) {
    return res.status(400).json({
      message: 'Invalid total_seats. It must be a positive integer.'
    });
  }

  try {
    const conflict = await Showtime.isConflict(show_datetime, room_id);
    if (conflict) {
      return res.status(400).json({
        message: 'Cannot schedule showtime. Conflict with existing show or not enough 2-hour gap.'
      });
    }

    const result = await Showtime.create(movie_id, show_datetime, room_id, total_seats);
    const showtimeId = result.insertId;

    // ✅ Create seats for the showtime with is_booked = false
    const seatPromises = [];
    for (let i = 1; i <= total_seats; i++) {
      seatPromises.push(Seat.create(showtimeId, i)); // seat_number = i
    }
    await Promise.all(seatPromises);

    res.status(201).json({
      message: 'Showtime and seats created successfully',
      showtimeId: showtimeId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating showtime and seats' });
  }
};
