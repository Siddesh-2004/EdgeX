import {getSubmission,submitCode} from "../services/judge0.service.js";
import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiErrors.js";


const createSubmission = asyncHandler(async (req, res) => {
  const { sourceCode, languageId, stdin } = req.body;
  try {
    const response = await submitCode(sourceCode, languageId, stdin);
    console.log(
      "Response from judge0",response
    )
  
    if (response.statusCode>=400) {
      throw new ApiError(500, "Failed to submit code");
    }
    console.log("Response from judge0", response.data.token);
    const submissionId = response.data.token;
    const submission = await getSubmission(submissionId);
    if (submission.statusCode>=400) {
      throw new ApiError(501, "Failed to get submission");
    }
    console.log(submission);
    return res.status(201).json(new ApiResponse(submission,
        "Submission created successfully",
        201
    ));
  } catch (err) {
    console.log(err);
    throw new ApiError(err.status, "Failed to submit code", [], err.stack);
  }
});

export {createSubmission};
