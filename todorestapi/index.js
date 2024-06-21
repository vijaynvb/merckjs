import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import swaggerSpecs from './swagger.js'; // Now using ES module syntax
import todosRouter from './todosRouter.js';
import cors from 'cors'
import corsOptions from './corsOptions.js';

const app = express();
const PORT = 3000;

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/todos", todosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});