import express from "express";
import {createProblem,createTestCases,getSolutionForTestCases} from "../controllers/problems.controller.js";

const router = express.Router();

router.post("/createProblem",createProblem);
router.get("/createTestCases/:problemId",createTestCases);
router.get("/getSolutionForTestCases/:problemId",getSolutionForTestCases);
export default router;