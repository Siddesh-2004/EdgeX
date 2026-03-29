import axiosConfig from "../configs/axios.config.js";
import ApiError from "../utils/apiErrors.js";
import ApiResponse from "../utils/apiResponse.js";

const submitCode = async (source_code, language_id, stdin) => {
  try {
    const response = await axiosConfig.post(
      "/submissions?base64_encoded=false&wait=false",
      { source_code, language_id, stdin },
    );
    console.log("Response from judge0 submit code", response.status, response.data.token);
    return new ApiResponse(
      response.data,
      "Code submitted successfully",
      response.status,
    );
  } catch (err) {
    console.log(err);
    throw new ApiError(err.status, err.response?.data);
  }
};

const getSubmission = async (submissionId) => {
  try {
    let count = 0;
    while (count < 5) {
      const response = await axiosConfig.get(
        `/submissions/${submissionId}?base64_encoded=true&wait=false&fields=status,stdout,stderr,language_id`,
      );
      if (response.data.status.id > 2) {
        return new ApiResponse(
          response.data,
          "Submission found",
          response.status,
        );
      }
      count++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new ApiError(408, "Submission timed out");
  } catch (err) {
    console.log(err);
    throw new ApiError(err.status, err.response?.data);
  }
};

const submitBatchSolution = async (submissions) => {
  try {
    const response = await axiosConfig.post(
      "/submissions/batch??base64_encoded=false&wait=false",
      { submissions },
    );
    console.log(response.status, response.data);
    return new ApiResponse(
      response.data,
      "Codes submitted successfully",
      response.status,
    );
  } catch (err) {
    console.log(err);
    throw new ApiError(err.status, err.response?.data);
  }
};
const getBatchSubmission = async (tokenString) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  try{
    const response=await axiosConfig.get(`/submissions/batch?tokens=${tokenString}`+"&base64_encoded=true&wait=false&fields=status,stdout,stderr");
    console.log("Response from judge0 getbatch solution",response.status,response.data);

    return new ApiResponse(response.data,"Batch Submission found",response.status);
  }catch(err){
    console.log(err);
    throw new ApiError(err.status,err.response?.data);
  }
};

export { submitCode, getSubmission, submitBatchSolution, getBatchSubmission };