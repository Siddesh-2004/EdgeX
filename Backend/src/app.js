import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORSORIGIN,
    credentials: true,
  }),
);
app.use(
  express.json({
    limit: "20kb",
  }),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  }),
);
app.use(express.static("public"));

app.use(cookieParser());

import submissionsRoute from "./routes/submissions.routes.js";
app.use("/api/v1/submissions", submissionsRoute);

import problemsRoute from "./routes/problems.route.js";
app.use("/api/v1/problems", problemsRoute);

export default app;
