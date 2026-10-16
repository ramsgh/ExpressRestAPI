/**
 * PROGRAM 5: Internal Server Error Status Code (500) & Error Format Standard
 * 
 * Key Concepts:
 * - 500 Internal Server Error: Represents an unexpected crash or server/DB failure.
 * - Standard Error Response Format: { success: false, error: 'CODE', message: 'Description' }
 */

const express = require('express');
const app = express();
const PORT = 3005;

app.use(express.json());

// Endpoint that triggers an error
app.get('/api/v1/crash-test', (req, res, next) => {
  try {
    throw new Error('Database server connection lost unexpectedly!');
  } catch (err) {
    next(err);
  }
});

// Centralized Error Handling Middleware (4 Parameters)
app.use((err, req, res, next) => {
  console.error('🔥 Server Error Caught:', err.message);

  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred on the server. Our engineers have been notified.'
  });
});

app.listen(PORT, () => console.log(`Program 5 running on http://localhost:${PORT}`));
