const express = require('express');
const pool = require('../db');

const router = express.Router();
function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

function requireAdmin(req, res, next) {
  const email = (req.header('x-admin-email') || '').toLowerCase();
  if (!getAdminEmails().includes(email)) {
    return res.status(403).json({ error: 'Admin access required to create events.' });
  }
  next();
}

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE id=$1',
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      event_date,
      price,
      available_tickets,
      image_url
    } = req.body;

    const result = await pool.query(
      `INSERT INTO events(
        title,
        description,
        location,
        event_date,
        price,
        available_tickets,
        image_url
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        title,
        description,
        location,
        event_date,
        price,
        available_tickets,
        image_url
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }});

module.exports = router;