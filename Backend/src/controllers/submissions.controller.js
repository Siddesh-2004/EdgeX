import { getSubmission, submitCode } from "../services/judge0.service.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiErrors.js";
import decodeBase64 from "../utils/decodeBase64.js";
import ProblemModel from "../models/problems.model.js";
const createSubmission = asyncHandler(async (req, res) => {
  const { sourceCode, languageId} = req.body;
  const {problemId}=req.params;
  if (!sourceCode || !languageId || !problemId) {
    return new ApiResponse(
      false,
      { message: "Please provide sourceCode,languageId and problemId" },
      400,
    );
  }
  const problem = await ProblemModel.findById(problemId);
  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }
  const testCases = problem.testCases;
  for (const testCase of testCases) {
    try{

      const response= await submitCode(sourceCode, languageId, testCase.input);
      if (!response) {
        throw new ApiError(500, "Submission failed");
      }
      console.log("Response ", response);
      const submissionResponse= await getSubmission(response.data.token);
      if (!submissionResponse) {
        throw new ApiError(500, "Submission not found");
      }
      console.log("Submission ", submissionResponse.data);
      const submission=submissionResponse.data;
      const output=decodeBase64(submission.stdout);
      if (testCase.expectedOutput !== output) {
        return res.status(277).json(new ApiResponse({testCase,output}, "Wrong answer", 277));
      }
    }catch(err){
      console.log(err.message);
      throw new ApiError(500, "Failed to submit");
    }
  }
  return res.status(200).json(new ApiResponse(null, "Correct answer", 200));
});

export { createSubmission };
