import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import router from "./routes/authRoute.js";
import cors from "cors";
import participantRoutes from "./routes/participantRoutes.js";
import mappingRoutes from "./routes/mappingRoutes.js";
import appraisalQuestionsRoute from "./routes/apprasialQuestionsRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", router);
app.use("/api/questions", appraisalQuestionsRoute);
app.use("/api/mapping", mappingRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/roles", participantRoutes);

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
