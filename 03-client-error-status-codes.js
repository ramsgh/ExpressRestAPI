/**
 * PROGRAM 3: Client Error Status Codes (400, 404, 409)
 * 
 * Status Codes:
 * - 400 Bad Request: Client sent invalid or missing data payload.
 * - 404 Not Found: Requested resource ID does not exist in the database.
 * - 409 Conflict: Request conflicts with existing data (e.g. duplicate email/SKU).
 */

const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.json());

const users = [
  { id: 101, email: 'alex@example.com', name: 'Alex' }
];

// 400 & 409 Examples
app.post('/api/v1/users', (req, res) => {
  const { email, name } = req.body;

  // 400 Bad Request
  if (!email || !name) {
    return res.status(400).json({
      success: false,
      error: 'BAD_REQUEST',
      message: 'Both email and name are required fields'
    });
  }

  // 409 Conflict: Duplicate email
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: 'CONFLICT',
      message: `User with email '${email}' already exists`
    });
  }

  const newUser = { id: Date.now(), email, name };
  users.push(newUser);

  res.status(201).json({ success: true, data: newUser });
});

// 404 Not Found Example
app.get('/api/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: `User with ID ${userId} does not exist`
    });
  }

  res.status(200).json({ success: true, data: user });
});

app.listen(PORT, () => console.log(`Program 3 running on http://localhost:${PORT}`));
