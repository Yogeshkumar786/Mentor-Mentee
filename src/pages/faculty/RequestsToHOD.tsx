
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/Header";
import Navigation from "@/components/faculty/Navigation";
import { useFaculty } from "@/contexts/FacultyContext";

const RequestsToHOD = () => {
  const { students, requestHodSupport } = useFaculty();
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  
  // Filter students eligible for HOD support (not already requested)
  const eligibleStudents = students.filter(
    student => student.hodSupportStatus === "Not Required"
  );
  
  // Students with pending HOD support requests
  const pendingRequests = students.filter(
    student => student.hodSupportStatus === "Requested"
  );
  
  // Handle request dialog
  const handleOpenRequestDialog = (studentId: number) => {
    setSelectedStudent(studentId);
    setIsDialogOpen(true);
  };
  
  // Handle submit request
  const handleSubmitRequest = () => {
    if (!reason.trim() || !selectedStudent) {
      toast.error("Please provide a reason for the request");
      return;
    }
    
    requestHodSupport(selectedStudent, reason);
    setReason("");
    setIsDialogOpen(false);
    toast.success("Request submitted to HOD successfully");
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
                <th className="border px-4 py-2 text-left">Reason</th>
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
                    <td className="border px-4 py-2">Pending</td>
                    <td className="border px-4 py-2">{student.requestReason}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="border px-4 py-4 text-center">
                    No pending requests to HOD
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <h2 className="text-xl font-bold my-6">Request Additional Support:</h2>
        
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-2 text-left">S.NO.</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Branch</th>
                <th className="border px-4 py-2 text-left">Year</th>
                <th className="border px-4 py-2 text-left">Roll No.</th>
                <th className="border px-4 py-2 text-left">Request Support</th>
              </tr>
            </thead>
            <tbody>
              {eligibleStudents.length > 0 ? (
                eligibleStudents.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.branch}</td>
                    <td className="border px-4 py-2">{student.year}</td>
                    <td className="border px-4 py-2">{student.rollNo}</td>
                    <td className="border px-4 py-2">
                      <Button 
                        variant="default" 
                        className="bg-institute-blue hover:bg-blue-800"
                        onClick={() => handleOpenRequestDialog(student.id)}
                      >
                        Request Support
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="border px-4 py-4 text-center">
                    No students available to request support
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Request Support Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request HOD Support</DialogTitle>
            <DialogDescription>
              Provide a reason for requesting additional support from HOD.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <label className="block text-sm font-medium mb-2">
              Reason for Support:
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this student needs additional support..."
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
              onClick={handleSubmitRequest}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="bg-institute-blue text-white p-3 text-center text-sm">
        For assistance, contact: support@nitap.ac.in
      </div>
    </div>
  );
};

export default RequestsToHOD;
