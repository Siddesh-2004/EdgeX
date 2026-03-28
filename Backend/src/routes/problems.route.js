import express from "express";
import {createProblem,getSolution} from "../controllers/problems.controller.js";

const router = express.Router();

router.post("/createProblem",createProblem);
router.get("/getSolution/:problemId",getSolution);

export default router;