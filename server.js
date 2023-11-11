// packages imports
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
//securty packges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
// files imports
import connectDB from "./config/db.js";
// routes import
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import errroMiddelware from "./middelwares/errroMiddleware.js";

// import userRoutes from "./routes/userRoutes.js";

//Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();

//middelwares
app.use(helmet(``));
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', cartRoutes);


//validation middelware
app.use(errroMiddelware);

//port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgCyan.white
  );
});
