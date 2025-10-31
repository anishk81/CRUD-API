import express from "express";
import cors from "cors";
import { orderRoutes } from "./routes/order.route";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/" , (_, res) =>{
    res.status(200).json({message: "API is healthy..."});
});

app.use("/api/v1/orders", orderRoutes);

app.listen(port, () => {
    console.log(`App running on ${port}`);
})

