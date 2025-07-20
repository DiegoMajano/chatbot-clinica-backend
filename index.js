const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const chatbotRoute = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRoute);

// Start server
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

