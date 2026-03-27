import { getLanguages } from "../services/judge0.services.js";
import asyncHandler from "../utils/asynchandler.js"
import ApiResponse from "../utils/apiResponse.js"
import ApiError from "../utils/apiErrors.js";
const testController = asyncHandler(async (_, res) => {
    try{ 
      const languages=await getLanguages();
      console.log("Languages",languages);
      res.status(200).json(new ApiResponse(languages,"success",200));
    }catch(err){
      throw new ApiError(500,"Failed to fetch languages");
    }
});

export {testController};