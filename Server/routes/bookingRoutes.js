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
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
}

router.post('/', async (req, res) => {
  try {
    const { eventId, quantity, userEmail } = req.body;

    const result = await pool.query(
      `INSERT INTO bookings(event_id, quantity, user_email)
       VALUES($1, $2, $3) RETURNING *`,
      [eventId, quantity || 1, userEmail || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/summary', requireAdmin, async (req, res) => {
  try {
    const totals = await pool.query(
      `SELECT
        COUNT(*) AS bookings_count,
        COALESCE(SUM(quantity), 0) AS tickets_sold
       FROM bookings`
    );

    const events = await pool.query(
      `SELECT
        e.id,
        e.title,
        COALESCE(SUM(b.quantity), 0) AS tickets_sold
       FROM events e
       LEFT JOIN bookings b ON e.id = b.event_id
       GROUP BY e.id, e.title
       ORDER BY tickets_sold DESC`
    );

    res.json({
      bookings_count: Number(totals.rows[0].bookings_count),
      tickets_sold: Number(totals.rows[0].tickets_sold),
      total_events: events.rows.length,
      events_with_sales: events.rows.filter(i => Number(i.tickets_sold) > 0).length,
      by_event: events.rows.map(e => ({
        id: e.id,
        title: e.title,
        tickets_sold: Number(e.tickets_sold)
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
