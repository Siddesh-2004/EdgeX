import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiErrors.js";
import ProblemModel from "../models/problems.model.js";

const createProblem = asyncHandler(async (req, res) => {
    const {question,examples,constraints}=req.body;
    if(!question || !examples || !constraints){
        throw new ApiError(400,"Missing required fields");
    }
    try{ 
        const problem=await ProblemModel.create({question,examples,constraints});
        if(!problem){
            throw new ApiError(500,"Failed to create problem");
        }
        return res.status(201).json(new ApiResponse(problem,"Problem created successfully",201));
    }catch(err){
        throw new ApiError(err.status,"Failed to create problem",[],err.stack);
    }
});

export {createProblem};

