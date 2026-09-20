const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { port } = require('./config');
const routes = require('./routes');
const { errorHandler } = require('./middleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

---