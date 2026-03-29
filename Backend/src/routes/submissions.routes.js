import express from "express";
import { createSubmission } from "../controllers/submissions.controller.js";

const router = express.Router();

router.post("/create/:problemId", createSubmission);

export default router;