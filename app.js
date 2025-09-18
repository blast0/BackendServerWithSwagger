require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/routes");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');

app.use(express.json());

app.use(cors());

app.use("/", mainRouter);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.send({ message: 'Employee-Department API. Visit /api/docs for Swagger UI' }));


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
