import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    organisation:{
        type: String,
        required: true,
    },
    stipend:{
        type:String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    }
},{timestamps:true});