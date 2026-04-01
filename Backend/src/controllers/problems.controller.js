import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiErrors.js";
import ProblemModel from "../models/problems.model.js";
import askAi from "../services/geminiApi.service.js";
import { submitBatchSolution, getBatchSubmission } from "../services/judge0.service.js";
import decodeBase64 from "../utils/decodeBase64.js";
const extractExamples = (examples) => {
  let extracted = "";
  for (const example of examples) {
    extracted += `\nExample:
        input:${example.input}
        output:${example.output}
       \n ${example.explanation || ""}`;
  }
  return extracted;
};

const cleanSolution = (solutionString) => {
  const start = solutionString.indexOf("{");
  const end = solutionString.lastIndexOf("}");
  const cleaned = solutionString.slice(start, end + 1);
  const parsed = JSON.parse(cleaned);
  return parsed.solution;
};

const cleanedTestCases = (testCasesString) => {
  const start = testCasesString.indexOf("{");
  const end = testCasesString.lastIndexOf("}");
  const cleaned = testCasesString.slice(start, end + 1);
  const parsed = JSON.parse(cleaned);
  return parsed.testCases;
};
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
    Examples :${extractExamples(problem.examples)}
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

  let count = 0;

  try {
    console.log(prompt);
    while (count <= 10) {
      console.log("Asking Gemini for solution attempt",count,"/",10);
      const solutionString = await askAi(prompt);
      if (solutionString) {
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

const createProblem = asyncHandler(async (req, res) => {
  const { question, examples, constraints,inputFormat,outputFormat } = req.body;
  if (!question || !examples || !constraints|| !inputFormat || !outputFormat) {
    throw new ApiError(400, "Missing required fields");
  }
  try {
    const problem = await ProblemModel.create({
      question,
      examples,
      constraints,
      inputFormat,
      outputFormat
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

const createTestCases = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) {
    throw new ApiError(400, "Missing required fields");
  }
  const problem = await ProblemModel.findById(problemId);
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }
  try {
    await getSolution(problemId);
  } catch (err) {
    throw new ApiError(err.statusCode, "Failed to get solution");
  }
  let prompt = `You are a competitive programming expert. Generate test cases for the following problem.

Problem: ${problem.question}
Constraints: ${problem.constraints.join(", ")}
Examples: ${extractExamples(problem.examples)}
inputFormat:${problem.inputFormat}
outputFormat:${problem.outputFormat}
Generate 1 test cases for EACH of the following types:
- basic
- edge
- large_input
- random
- boundary
- no_valid_answer
- duplicates
- zero_falsy

Return ONLY a JSON object in this format:
{
  "testCases": [
    { "input": "5 10", "tag": "basic" },
    { "input": "0 0", "tag": "zero_falsy" },
    ...
  ]
}

Rules:
- Only return the JSON object, no explanation, no markdown
- Input should be in stdin format (same as the examples)
- If a tag type is not applicable for this problem, return 0 test cases for that type
- Make sure inputs respect the constraints`;
  let count = 0;
  try {
    while (count <= 10) {
      console.log("Asking Gemini for test cases attempt",count,"/",10);
      const testCasesString = await askAi(prompt, problemId);
      if (testCasesString) {
        const testCases = cleanedTestCases(testCasesString);
        const updatedProblem = await ProblemModel.findByIdAndUpdate(
          problemId,
          {
            testCases,
          },
          { new: true },
        );
        if (!updatedProblem) {
          throw new ApiError(500, "Failed to update problem");
        }
        return res
          .status(200)
          .json(
            new ApiResponse(
              updatedProblem,
              "Test cases generated successfully",
              200,
            ),
          );
      }
      count++;
      new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (err) {
    console.log(err);
    throw new ApiError(err.statusCode, "Failed toooo generate test cases");
  }
});

const getSolutionForTestCases = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) {
    throw new ApiError(400, "Missing required fields");
  }
  const problem = await ProblemModel.findById(problemId);
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }
  const sourceCode = problem.solution;
  const testCases = problem.testCases;
  const submissions = [];
  for (const testCase of testCases) {
    const submission = {};
    submission.stdin = testCase.input;
    submission.language_id = 54;
    submission.source_code = sourceCode;
    submissions.push(submission);
  }
  let tokens = [];
  try {
    const response = await submitBatchSolution(submissions);
    if (response.statusCode >= 400) {
      throw new ApiError(response.statusCode, response.data);
    }
    tokens = response.data;
  } catch (err) {
    console.log(err);
    throw new ApiError(err.statusCode, err.data);
  }
  let tokenString = "";
  for (const tokenObject of tokens) {
    tokenString += tokenObject.token + ",";
  }
  tokenString = tokenString.slice(0, -1);
  console.log("tokenString", tokenString);
  try {
    const response = await getBatchSubmission(tokenString);
    if (response.statusCode >= 400) {
      throw new ApiError(response.statusCode, response.data);
    }
    const result = response.data.submissions;
    for (let i = 0; i < result.length; i++) {
      console.log("Status ID for submission", i, ":", result[i].status.id);
      if (result[i].status.id == 3) {
        testCases[i].expectedOutput = decodeBase64(result[i].stdout);
      }
    }
    console.log("testCases", testCases);
    const updatedProblem = await ProblemModel.findByIdAndUpdate(
      problemId,
      {
        testCases,
      },
      { new: true },
    );
    if (!updatedProblem) {
      throw new ApiError(500, "Failed to update problem");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          updatedProblem,
          "Test cases generated successfully",
          200,
        ),
      );
  } catch (err) {
    console.log(err);
    throw new ApiError(err.statusCode, err.data);
  }
});


const getProblem=asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) {
    throw new ApiError(400, "Missing required fields");
  }
  const problem = await ProblemModel.findById(problemId);
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        problem,
        "Problem retrieved successfully",
        200,
      ),
    );
});

export { createProblem, createTestCases, getSolutionForTestCases,getProblem};
