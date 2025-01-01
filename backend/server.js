import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import router from "./routes/authRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", router);

const startServer = async () => {
  const port = process.env.PORT || 5001;
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
startServer();
