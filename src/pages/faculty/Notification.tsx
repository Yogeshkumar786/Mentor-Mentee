
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Navigation from "@/components/faculty/Navigation";
import { useFaculty } from "@/contexts/FacultyContext";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const { students, updateRequestStatus } = useFaculty();
  const navigate = useNavigate();
  
  // Filter students with pending requests
  const pendingRequests = students.filter(
    student => student.requestStatus === "Pending"
  );
  
  // Handle accept request
  const handleAccept = (studentId: number) => {
    updateRequestStatus(studentId, "Accepted");
    toast.success("Request accepted successfully");
  };
  
  // Handle reject request
  const handleReject = (studentId: number) => {
    updateRequestStatus(studentId, "Rejected");
    toast.success("Request rejected");
  };
  
  // Handle view student dashboard
  const handleViewStudentDashboard = (studentId: number) => {
    // Navigate to a simulated student view (in a real app, you'd have proper ID-based navigation)
    navigate(`/student`);
    const student = students.find(s => s.id === studentId);
    toast.info(`Viewing dashboard for student ${student?.name}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header subtitle="Faculty Dashboard" />
      <Navigation />
      
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Student Request:</h2>
        
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-2 text-left">S.NO.</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Branch</th>
                <th className="border px-4 py-2 text-left">Year</th>
                <th className="border px-4 py-2 text-left">Roll No.</th>
                <th className="border px-4 py-2 text-left">Request</th>
                <th className="border px-4 py-2 text-left">Student Detail</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.branch}</td>
                    <td className="border px-4 py-2">{student.year}</td>
                    <td className="border px-4 py-2">{student.rollNo}</td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2">
                        <Button 
                          variant="default" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleAccept(student.id)}
                        >
                          Accept
                        </Button>
                        <Button 
                          variant="default" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleReject(student.id)}
                        >
                          Reject
                        </Button>
                      </div>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="border px-4 py-4 text-center">
                    No pending requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-institute-blue text-white p-3 text-center text-sm">
        For assistance, contact: support@nitap.ac.in
      </div>
    </div>
  );
};

export default Notification;
