
import React, { createContext, useContext, useState } from "react";

// Student type for the faculty dashboard
export type Student = {
  id: number;
  name: string;
  branch: string;
  year: string;
  rollNo: string;
  remarkStatus: "Done" | "New";
  requestStatus?: "Pending" | "Accepted" | "Rejected";
  hodSupportStatus?: "Not Required" | "Requested" | "Pending" | "Approved";
  requestReason?: string;
};

// Question type for student questions
export type Question = {
  id: number;
  studentId: number;
  question: string;
  date: string;
  status: "Pending" | "Answered";
  answer?: string;
  answeredBy?: string;
  answeredDate?: string;
};

// Faculty context interface
interface FacultyContextType {
  students: Student[];
  questions: Question[];
  updateRemarkStatus: (studentId: number, newStatus: "Done" | "New") => void;
  answerQuestion: (questionId: number, answer: string) => void;
  updateRequestStatus: (studentId: number, status: "Accepted" | "Rejected") => void;
  requestHodSupport: (studentId: number, reason: string) => void;
  viewStudentDashboard: (studentId: number) => void;
}

// Mock data
const mockStudents: Student[] = [
  {
    id: 1,
    name: "Yogesh Kumar",
    branch: "CSE",
    year: "3rd",
    rollNo: "422275",
    remarkStatus: "Done",
    requestStatus: "Accepted",
    hodSupportStatus: "Not Required"
  },
  {
    id: 2,
    name: "Rahul Sharma",
    branch: "ECE",
    year: "2nd",
    rollNo: "422301",
    remarkStatus: "New",
    requestStatus: "Pending",
    hodSupportStatus: "Not Required"
  },
  {
    id: 3,
    name: "Priya Patel",
    branch: "CSE",
    year: "4th",
    rollNo: "421150",
    remarkStatus: "Done",
    requestStatus: "Accepted",
    hodSupportStatus: "Requested"
  },
  {
    id: 4,
    name: "Arjun Singh",
    branch: "MECH",
    year: "3rd",
    rollNo: "422405",
    remarkStatus: "New",
    requestStatus: "Pending",
    hodSupportStatus: "Not Required"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    branch: "CIVIL",
    year: "2nd",
    rollNo: "422510",
    remarkStatus: "Done",
    requestStatus: "Pending",
    hodSupportStatus: "Not Required"
  }
];

const mockQuestions: Question[] = [
  {
    id: 1,
    studentId: 2,
    question: "I'm facing difficulty with the Data Structures course. Can you suggest some additional resources?",
    date: "2025-04-01",
    status: "Pending"
  },
  {
    id: 2,
    studentId: 4,
    question: "I want to join the robotics club. What are the requirements?",
    date: "2025-04-05",
    status: "Pending"
  },
  {
    id: 3,
    studentId: 1,
    question: "Could you help me with choosing electives for next semester?",
    date: "2025-03-15",
    status: "Answered",
    answer: "I would recommend the Machine Learning or Cloud Computing electives based on your interests. Let's schedule a meeting to discuss in detail.",
    answeredBy: "Dr. Ramesh Kumar",
    answeredDate: "2025-03-18"
  }
];

// Create the context
const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

// Faculty provider component
export function FacultyProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);

  // Update remark status
  const updateRemarkStatus = (studentId: number, newStatus: "Done" | "New") => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, remarkStatus: newStatus } : student
      )
    );
  };

  // Answer a question
  const answerQuestion = (questionId: number, answer: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              status: "Answered",
              answer,
              answeredBy: "Dr. Ramesh Kumar",
              answeredDate: new Date().toISOString().split("T")[0]
            }
          : question
      )
    );

    // Find the student associated with this question and update their remark status
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      updateRemarkStatus(question.studentId, "Done");
    }
  };

  // Update request status (Accept/Reject)
  const updateRequestStatus = (studentId: number, status: "Accepted" | "Rejected") => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, requestStatus: status } : student
      )
    );
  };

  // Request HOD support
  const requestHodSupport = (studentId: number, reason: string) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, hodSupportStatus: "Requested", requestReason: reason }
          : student
      )
    );
  };
  
  // Navigate to student dashboard
  const viewStudentDashboard = (studentId: number) => {
    // This function will be implemented in the component to handle navigation
    // It's included in the context to maintain consistent API
  };

  const value = {
    students,
    questions,
    updateRemarkStatus,
    answerQuestion,
    updateRequestStatus,
    requestHodSupport,
    viewStudentDashboard
  };

  return <FacultyContext.Provider value={value}>{children}</FacultyContext.Provider>;
}

// Hook to use the faculty context
export function useFaculty() {
  const context = useContext(FacultyContext);
  if (context === undefined) {
    throw new Error("useFaculty must be used within a FacultyProvider");
  }
  return context;
}
