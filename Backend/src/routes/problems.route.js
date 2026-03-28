import express from "express";
import {createProblem} from "../controllers/problems.controller.js";

const router = express.Router();

router.post("/create",createProblem);

export default router;