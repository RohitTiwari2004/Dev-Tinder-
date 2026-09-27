const express = require('express');

const app = express(); // instance of express js application   this is like creating a new
// web server...
// for handling incoming request , we use app.use()
app.use('/test', (req, res) => {
  res.send('Hello from ROHIT DASHBOARD 2026');
});
app.listen(3000, () => {
  console.log('Server is successfully running on port 3000');
});
