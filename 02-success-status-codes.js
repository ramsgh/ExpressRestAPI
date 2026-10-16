/**
 * PROGRAM 2: Success HTTP Status Codes (200, 201, 204)
 * 
 * Status Codes:
 * - 200 OK: Standard success for GET requests.
 * - 201 Created: Returned after successfully creating a NEW resource via POST.
 * - 204 No Content: Returned after a successful DELETE (no response body sent back).
 */

const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

let items = [
  { id: 1, name: 'Keyboard' },
  { id: 2, name: 'Monitor' }
];

// 200 OK: Fetching resources
app.get('/api/v1/items', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Items fetched successfully',
    data: items
  });
});

// 201 Created: Adding a new resource
app.post('/api/v1/items', (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name || 'Default Item' };
  items.push(newItem);

  res.status(201).json({
    success: true,
    message: 'Item created successfully',
    data: newItem
  });
});

// 204 No Content: Deleting a resource
app.delete('/api/v1/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);

  // 204 means SUCCESS, but no JSON body is returned
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Program 2 running on http://localhost:${PORT}`));
