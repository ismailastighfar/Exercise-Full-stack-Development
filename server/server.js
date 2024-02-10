const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/log', (req, res) => {
  const { interactionType } = req.body;
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${interactionType}\n`;

  // Append to a log file
  fs.appendFile('user-interactions.log', logEntry, err => {
    if (err) {
      console.error('Error writing to log file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Logged successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
