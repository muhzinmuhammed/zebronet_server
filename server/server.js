import express from "express";
import cors from "cors";
import morgan from "morgan";
import supplierRoute from "./routes/supplierRoutes.js";
import itemRoute from "./routes/itemRouter.js"; 
import orderRoute from './routes/orderRouter.js'
import connectDB from './config/dbConfig.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v2/item", itemRoute);
app.use('/api/v3/order',orderRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
