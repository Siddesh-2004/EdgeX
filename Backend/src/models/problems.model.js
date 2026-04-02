import mongoose from "mongoose";



const exampleSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});
const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ["basic", "edge", "large_input", "random", "boundary", "no_valid_answer", "duplicates", "zero_falsy"],
    required: true,
  },
  isSample: {
    type: Boolean,
    default: false,
  },
});

const problemSchema = new mongoose.Schema({
    title:{
      type:String,

    },
    difficulty:{
      type:String,
      maxlength:6
    },
    question:{
        type:String,
        required:true,
        lowercase:true,
    },
    examples:{
        type:[exampleSchema],
        required:true,
    },
    constraints:{
        type:[String],
        required:true,
    },
    solution:{
        type:String,
    },
    testCases:{
        type:[testCaseSchema],
    },
    timeLimit:{
        type:Number,
    },
    memoryLimit:{
        type:Number,
    },
    inputFormat:{
        type:String,
        required:true
    },
    outputFormat:{
        type:String,
        required:true
    }
},{
    timestamps: true,

});

const ProblemModel = mongoose.model("Problem", problemSchema);

export default ProblemModel;