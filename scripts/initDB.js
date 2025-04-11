const pool = require('../config/db');

(async () => {
  try {
    const connection = await pool.getConnection();

    // Separate SQL queries for each CREATE TABLE statement
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

    const createGenresTable = `
      CREATE TABLE IF NOT EXISTS genres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );
    `;

    const createMoviesTable = `
      CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        poster_url TEXT,
        genre_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE SET NULL
      );
    `;

    const createShowtimesTable = `
      CREATE TABLE IF NOT EXISTS showtimes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        movie_id INT NOT NULL,
        show_datetime DATETIME NOT NULL,
        total_seats INT NOT NULL,
        status ENUM('active', 'cancelled') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
        INDEX (movie_id)
      );
    `;

    const createSeatsTable = `
      CREATE TABLE IF NOT EXISTS seats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        showtime_id INT NOT NULL,
        seat_number VARCHAR(10) NOT NULL,
        is_booked BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE,
        UNIQUE (showtime_id, seat_number),
        INDEX (showtime_id)
      );
    `;

    const createReservationsTable = `
      CREATE TABLE IF NOT EXISTS reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        showtime_id INT NOT NULL,
        status ENUM('active', 'cancelled') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE,
        INDEX (user_id),
        INDEX (showtime_id)
      );
    `;

    // Execute each query separately
    await connection.query(createUsersTable);
    await connection.query(createGenresTable);
    await connection.query(createMoviesTable);
    await connection.query(createShowtimesTable);
    await connection.query(createSeatsTable);
    await connection.query(createReservationsTable);
    await connection.query(createReservationSeatsTable);

    console.log('Tables created successfully!');
    
    // Close the connection after the queries are executed
    connection.release();
  } catch (error) {
    console.error('Error initializing DB:', error);
  }
})();
