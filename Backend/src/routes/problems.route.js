import express from "express";
import {createProblem,createTestCases} from "../controllers/problems.controller.js";

const router = express.Router();

router.post("/createProblem",createProblem);
router.get("/createTestCases/:problemId",createTestCases);

export default router;