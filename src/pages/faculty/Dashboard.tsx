
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Navigation from "@/components/faculty/Navigation";
import { useFaculty } from "@/contexts/FacultyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FacultyDashboard = () => {
  const { students, questions, answerQuestion } = useFaculty();
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  
  // Get questions for the selected student
  const studentQuestions = selectedStudent 
    ? questions.filter(q => q.studentId === selectedStudent && q.status === "Pending") 
    : [];
  
  // Get student data by ID
  const getStudentById = (id: number) => {
    return students.find(s => s.id === id);
  };
  
  // Handle dialog open for providing remarks
  const handleOpenRemarkDialog = (studentId: number) => {
    setSelectedStudent(studentId);
    setIsDialogOpen(true);
  };
  
  // Handle submitting the answer/remark
  const handleSubmitAnswer = () => {
    if (!answer.trim() || !studentQuestions.length) {
      toast.error("Please provide a valid answer");
      return;
    }
    
    answerQuestion(studentQuestions[0].id, answer);
    setAnswer("");
    setIsDialogOpen(false);
    toast.success("Response submitted successfully");
  };
  
  // Handle view student dashboard
  const handleViewStudentDashboard = (studentId: number) => {
    // Navigate to a simulated student view (in a real app, you'd have proper ID-based navigation)
    navigate(`/student`);
    toast.info(`Viewing dashboard for student ${getStudentById(studentId)?.name}`);
  };
  
  // Filter current students (only students with Accepted status)
  const currentStudents = students.filter(student => student.requestStatus === "Accepted");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header subtitle="Faculty Dashboard" />
      <Navigation />
      
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Current Students:</h2>
        
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-2 text-left">S.NO.</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Branch</th>
                <th className="border px-4 py-2 text-left">Year</th>
                <th className="border px-4 py-2 text-left">Roll No.</th>
                <th className="border px-4 py-2 text-left">Remark Status</th>
                <th className="border px-4 py-2 text-left">Student Detail</th>
                <th className="border px-4 py-2 text-left">HOD Support</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.branch}</td>
                    <td className="border px-4 py-2">{student.year}</td>
                    <td className="border px-4 py-2">{student.rollNo}</td>
                    <td className="border px-4 py-2">
                      {student.remarkStatus === "New" ? (
                        <Button 
                          variant="default" 
                          className="bg-yellow-600 hover:bg-yellow-700"
                          onClick={() => handleOpenRemarkDialog(student.id)}
                        >
                          Pending
                        </Button>
                      ) : (
                        "Done"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <Button 
                        variant="default" 
                        className="bg-institute-blue hover:bg-blue-800"
                        onClick={() => handleViewStudentDashboard(student.id)}
                      >
                        Student Dashboard
                      </Button>
                    </td>
                    <td className="border px-4 py-2">{student.hodSupportStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="border px-4 py-4 text-center">
                    No current students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Remark Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Student Question</DialogTitle>
            <DialogDescription>
              {studentQuestions.length > 0 ? (
                <div className="mt-2">
                  <p className="font-medium text-gray-700">Question:</p>
                  <p className="mb-4">{studentQuestions[0].question}</p>
                  <p className="text-xs text-gray-500">
                    Date: {studentQuestions[0].date}
                  </p>
                </div>
              ) : (
                <p className="mt-2">No pending questions from this student.</p>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {studentQuestions.length > 0 && (
            <>
              <div className="my-4">
                <label className="block text-sm font-medium mb-2">
                  Your Response:
                </label>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full"
                  rows={5}
                />
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default"
                  onClick={handleSubmitAnswer}
                >
                  Submit Response
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <div className="bg-institute-blue text-white p-3 text-center text-sm">
        For assistance, contact: support@nitap.ac.in
      </div>
    </div>
  );
};

export default FacultyDashboard;
