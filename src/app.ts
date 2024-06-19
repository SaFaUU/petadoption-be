import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import router from "./app/routes";
import { AllRoutes } from "./app/routes/allRoutes";
import globalErrorHandler from "./app/middleware/globalErrorhandler";
import { seedAdmin } from "./app/utils/seedAdmin";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    preflightContinue: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
seedAdmin();

app.use("/api", AllRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "This route does not exist",
  });
});

app.use(globalErrorHandler);

export default app;
