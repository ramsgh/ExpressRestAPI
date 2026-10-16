/**
 * PROGRAM 4: Auth & Access Control Status Codes (401 vs 403)
 * 
 * Difference between 401 & 403:
 * - 401 Unauthorized: Who are you? Missing/invalid authentication token.
 * - 403 Forbidden: I know who you are, but you DON'T have permission!
 */

const express = require('express');
const app = express();
const PORT = 3004;

app.use(express.json());

// Simulated Auth Guard
const authGuard = (req, res, next) => {
  const token = req.headers['authorization'];
  
  // 401 Unauthorized
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Authentication token is required in Authorization header'
    });
  }

  if (token === 'Bearer user-token') {
    req.user = { id: 1, role: 'USER' };
  } else if (token === 'Bearer admin-token') {
    req.user = { id: 2, role: 'ADMIN' };
  }

  next();
};

app.use(authGuard);

// 403 Forbidden Example
app.get('/api/v1/admin/dashboard', (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'FORBIDDEN',
      message: 'Access denied. You require ADMIN permissions to view this resource'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Welcome to the Admin Secret Dashboard!'
  });
});

app.listen(PORT, () => console.log(`Program 4 running on http://localhost:${PORT}`));
