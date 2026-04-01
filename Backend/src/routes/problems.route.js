import express from "express";
import {createProblem,createTestCases,getSolutionForTestCases,getProblem} from "../controllers/problems.controller.js";

const router = express.Router();

router.post("/createProblem",createProblem);
router.get("/createTestCases/:problemId",createTestCases);
router.get("/getSolutionForTestCases/:problemId",getSolutionForTestCases);
router.get("/getProblem/:problemId",getProblem);
export default router;