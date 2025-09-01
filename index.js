const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://studyverse-proxy.kunalkankani5.workers.dev');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/view', async (req, res) => {
  const { view, onlyDpp } = req.query;
  const remoteUrl = `https://viewer-ten-psi.vercel.app/view.php?token=my_secret_key_123&view=${onlyDpp || view}`;
  try {
    const remoteRes = await fetch(remoteUrl);
    const data = await remoteRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
