const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS enable karna
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// Courses API endpoint
app.get('/api/courses', async (req, res) => {
  try {
    // Browser jaise headers set karna
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'Host': 'rwafree-d0df4d8ba33e.herokuapp.com',
      'Origin': 'https://rwafree-d0df4d8ba33e.herokuapp.com',
      'Referer': 'https://rwafree-d0df4d8ba33e.herokuapp.com/rwa',
      'Sec-Ch-Ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
    };
    
    // Authorization header add karna agar available hai
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }
    
    // Cookie header add karna agar available hai
    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }

    const response = await fetch('https://rwafree-d0df4d8ba33e.herokuapp.com/api/courses', {
      method: 'GET',
      headers: headers
    });

    const data = await response.text();
    
    // Response headers copy karna
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
