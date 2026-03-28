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
    testCaseSchema:{
        type:[testCaseSchema],
    },
    timeLimit:{
        type:Number,
    },
    MemoryLimit:{
        type:Number,
    },
},{
    timestamps: true,

});

const ProblemModel = mongoose.model("Problem", problemSchema);

export default ProblemModel;