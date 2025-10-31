import express from "express";
import cors from "cors";
import { orderRoutes } from "./routes/order.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./lib/swagger";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (_, res) => {
  res.status(200).json({ message: "API is healthy..." });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(swaggerSpec);
});

app.use("/api/v1/orders", orderRoutes);

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
