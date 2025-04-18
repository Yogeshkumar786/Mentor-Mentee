import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    aadhar: {
      type: Number,
    },
    phone: {
      type: Number,
      code: {
        type: Number,
        required: true,
      },
      required: true,
    },
    registration: {
      type: Number,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    passPort: {
      type: String,
      default: "Not Available",
    },
    parentPhone: {
      type: Number,
      required: true,
    },
    emergencyContact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    Program: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    dayScholar: {
      type: Boolean,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    community: {
      type: String,
      required: true,
      enum: ["General", "OBC", "SC", "ST", "EWS"],
    },
    x_marks: {
      type: Float32Array,
      required: true,
    },
    xii_marks: {
      type: Float32Array,
      required: true,
    },
    jee_mains: {
      type: Float32Array,
      required: true,
    },
    jee_advanced: {
      type: Float32Array,
      required: true,
    },
    cgpa: {
      type: Float32Array,
      required: true,
    },
    stress: {
      type: Boolean,
      required: true,
    },
    anger: {
      type: Boolean,
      required: true,
    },
    emotional_problem: {
      type: Boolean,
      required: true,
    },
    low_self_esteem: {
      type: Boolean,
      required: true,
    },
    examination_anxiety: {
      type: Boolean,
      required: true,
    },
    negative_thoughts: {
      type: Boolean,
      required: true,
    },
    exam_phobia: {
      type: Boolean,
      required: true,
    },
    stammering: {
      type: Boolean,
      required: true,
    },
    financial_problem: {
      type: Boolean,
      required: true,
    },
    mood_swings: {
      type: Boolean,
      required: true,
    },
    disturbed_relationship_with_parents: {
      type: Boolean,
      required: true,
    },
    disturbed_relationship_with_teachers: {
      type: Boolean,
      required: true,
    },
    disturbed_relationship_with_friends: {
      type: Boolean,
      required: true,
    },
    disciplinary_problems_in_college: {
      type: Boolean,
      required: true,
    },
    poor_command_of_english: {
      type: Boolean,
      required: true,
    },
    tobacco_or_alcohol_use: {
      type: Boolean,
      required: true,
    },
    suicidal_attempts_or_thoughts: {
      type: Boolean,
      required: true,
    },
    disappointment_with_courses: {
      type: Boolean,
      required: true,
    },
    time_management_problem: {
      type: Boolean,
      required: true,
    },
    relationship_problem: {
      type: Boolean,
      required: true,
    },
    low_self_motivation: {
      type: Boolean,
      required: true,
    },
    conflits: {
      type: Boolean,
      required: true,
    },
    procrastination: {
      type: Boolean,
      required: true,
    },
    frustration: {
      type: Boolean,
      required: true,
    },
    poor_decisive_power: {
      type: Boolean,
      required: true,
    },
    adjustment_problem: {
      type: Boolean,
      required: true,
    },
    lack_of_expression: {
      type: Boolean,
      required: true,
    },
    poor_concentration: {
      type: Boolean,
      required: true,
    },
    stage_phobia: {
      type: Boolean,
      required: true,
    },
    worries_about_future: {
      type: Boolean,
      required: true,
    },
    poor_memory_problem: {
      type: Boolean,
      required: true,
    },
    migraine_headache: {
      type: Boolean,
      required: true,
    },
    fear_of_public_speaking: {
      type: Boolean,
      required: true,
    },
    hobbies: {
      type: [
        {
          type: String,
        },
      ],
    },
    strengths: {
      type: [
        {
          type: String,
        },
      ],
    },
    areas_to_improve: {
      type: [
        {
          type: String,
        },
      ],
    },
    core: {
      type: [
        {
          type: String,
        },
      ],
    },
    it: {
      type: [
        {
          type: String,
        },
      ],
    },
    higher_education: {
      type: [
        {
          type: String,
        },
      ],
    },
    startup: {
      type: [
        {
          type: String,
        },
      ],
    },
    family_business: {
      type: [
        {
          type: String,
        },
      ],
    },
    other_interests: {
      type: [
        {
          type: String,
        },
      ],
    },
    internships:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Internship",
            }
        ]
    }
  },
  { timestamps: true }
);
