/**
 * PROGRAM 1: REST Principles, Resource Naming & API Versioning (/api/v1/)
 * 
 * Key Concepts:
 * 1. Resource-based URLs: Use plural nouns (/api/v1/products) NOT verbs (/getProducts).
 * 2. Versioning: Prefix routes with /api/v1/ to support future changes without breaking clients.
 * 3. Standard Response Format: Always wrap responses in { success, message, data }.
 */

const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Wireless Mouse', price: 25 }
];

// GOOD REST URL: GET /api/v1/products
app.get('/api/v1/products', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Products catalog retrieved successfully',
    data: products
  });
});

app.listen(PORT, () => {
  console.log(`Program 1 running on http://localhost:${PORT}`);
  console.log('Test endpoint: GET http://localhost:3001/api/v1/products');
});
