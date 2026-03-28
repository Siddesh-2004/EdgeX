import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiErrors.js";
import ProblemModel from "../models/problems.model.js";
import ai from "../configs/gemini.config.js";
import { get } from "mongoose";

const cleanSolution = (solutionString) => {
  const start = solutionString.indexOf("{");
  const end = solutionString.lastIndexOf("}");
  const cleaned = solutionString.slice(start, end + 1);
  const parsed = JSON.parse(cleaned);
  return parsed.solution;
};
const createProblem = asyncHandler(async (req, res) => {
  const { question, examples, constraints } = req.body;
  if (!question || !examples || !constraints) {
    throw new ApiError(400, "Missing required fields");
  }
  try {
    const problem = await ProblemModel.create({
      question,
      examples,
      constraints,
    });
    if (!problem) {
      throw new ApiError(500, "Failed to create problem");
    }
    return res
      .status(201)
      .json(new ApiResponse(problem, "Problem created successfully", 201));
  } catch (err) {
    throw new ApiError(err.status, "Failed to create problem", [], err.stack);
  }
});

const getSolution = async (problemId) => {
    if (!problemId) {
        throw new ApiError(400, "Missing required fields");
    }
    const problem = await ProblemModel.findById(problemId);
    if (!problem) {
        throw new ApiError(404, "Problem not found");
    }

    let prompt = `You are a competitive programming expert. Given a problem, generate a brute force solution.Problem:
    Question: ${problem.question}
    Constraints: ${problem.constraints.join(", ")}

    Requirements:
    - Write a C++ solution
    - The solution doesnt need to be optimized as per the constraints it just needs to be accurate all the cases
    - Read input from stdin
    - Print output to stdout
    - No comments, no explanations
    Format of response:
    1.i want the solution inside an object example:
    {
        "solution": <your solution>,
    }
    just the object i m using this in a program soo please act like a function the returns an object an just return the object

    Do not include anything else. No markdown, no explanation, just the JSON object.`;
    for (const example of problem.examples) {
        prompt += `\nExample:
        input:${example.input}
        output:${example.output}
    \n ${example.explanation || ""}`;
    }
    let count = 0;

    try {
        console.log(prompt);
        while (count <= 10) {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });
        if (response) {
            console.log(response.candidates[0].content.parts[0].text);
            const solutionString = response.candidates[0].content.parts[0].text;
            const solution = cleanSolution(solutionString);
            const updatedProblem = await ProblemModel.findByIdAndUpdate(
            problemId,
            {
                solution,
            },
            { new: true },
            );
            if (!updatedProblem) {
            throw new ApiError(500, "Failed to update problem");
            }
            return;
        }
        new Promise((resolve) => setTimeout(resolve, 1000));
        count++;
        }

        throw new ApiError(501, "Failed to create solution");
    } catch (err) {
        console.log(err);
        throw new ApiError(err.status, "Failed to create Solution", [], err.stack);
    }
};


const generateTestCases=asyncHandler(async (req,res)=>{
    const {problemId}=req.params;
    if(!problemId){
        throw new ApiError(400,"Missing required fields");
    }
    const problem=await ProblemModel.findById(problemId);
    if(!problem){
        throw new ApiError(404,"Problem not found");
    }
    try{
        await getSolution(problemId);
    }catch(err){
        throw new ApiError(err.statusCode,"Failed to get solution");
    }
    
});

export { createProblem };
