const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query: dbQuery } = require('./db');
const { authenticateToken } = require('./middleware');
const { jwtSecret, jwtExpiresIn, bcryptSaltRounds } = require('./config');

const router = express.Router();

/**
 * Helper to handle validation errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

/**
 * Login endpoint
 */
router.post(
  '/auth/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await dbQuery('SELECT id, email, password_hash FROM admins WHERE email = $1', [email]);
      if (result.rows.length === 0)
        return res.status(401).json({ error: 'Invalid credentials' });

      const admin = result.rows[0];
      const match = await bcrypt.compare(password, admin.password_hash);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: admin.id, email: admin.email }, jwtSecret, { expiresIn: jwtExpiresIn });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Get all channels
 */
router.get('/channels', authenticateToken, async (req, res, next) => {
  try {
    const result = await dbQuery('SELECT id, name, url, created_at FROM channels ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

/**
 * Add a new channel
 */
router.post(
  '/channels',
  authenticateToken,
  [
    body('name').isString().trim().notEmpty().withMessage('Name required'),
    body('url').isURL().withMessage('Valid URL required')
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, url } = req.body;
      const result = await dbQuery(
        'INSERT INTO channels (name, url, created_at) VALUES ($1, $2, NOW()) RETURNING id, name, url, created_at',
        [name, url]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Update a channel
 */
router.put(
  '/channels/:id',
  authenticateToken,
  [
    param('id').isInt().withMessage('Channel ID must be integer'),
    body('name').optional().isString().trim().notEmpty(),
    body('url').optional().isURL()
  ],
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const fields = [];
      const values = [];
      let idx = 1;

      if (req.body.name) {
        fields.push(`name = $${idx++}`);
        values.push(req.body.name);
      }
      if (req.body.url) {
        fields.push(`url = $${idx++}`);
        values.push(req.body.url);
      }
      if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

      values.push(id);
      const query = `UPDATE channels SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, url, created_at`;
      const result = await dbQuery(query, values);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Channel not found' });
      res.json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Delete a channel
 */
router.delete(
  '/channels/:id',
  authenticateToken,
  [param('id').isInt().withMessage('Channel ID must be integer')],
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await dbQuery('DELETE FROM channels WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Channel not found' });
      res.json({ message: 'Channel deleted' });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DNS check endpoint (simple example)
 */
router.get(
  '/dns-check',
  authenticateToken,
  [query('domain').isString().trim().notEmpty().withMessage('Domain required')],
  validate,
  async (req, res, next) => {
    try {
      const { domain } = req.query;
      const dns = require('dns').promises;
      const records = await dns.resolve(domain, 'A');
      res.json({ domain, records });
    } catch (err) {
      res.status(400).json({ error: 'DNS lookup failed', details: err.message });
    }
  }
);

module.exports = router;