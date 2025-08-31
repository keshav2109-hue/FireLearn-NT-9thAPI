const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS headers ko handle karna
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// API routes
app.get('/api/courses', async (req, res) => {
  try {
    // Frontend se authorization header copy karna
    const authHeader = req.headers.authorization;
    
    const response = await fetch('https://rwafree-d0df4d8ba33e.herokuapp.com/api/courses', {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Agar aapko aur endpoints chahiye, unko bhi similarly add kar sakte hain
app.get('/api/*', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const originalUrl = req.originalUrl.replace('/api/', '/');
    
    const response = await fetch(`https://rwafree-d0df4d8ba33e.herokuapp.com${originalUrl}`, {
      method: req.method,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
