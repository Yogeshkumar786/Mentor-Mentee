
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, UserCheck, Briefcase, Book, Award, MessageSquare } from "lucide-react";
import { toast } from "sonner";

// Mock data for student requests
interface StudentRequest {
  id: number;
  name: string;
  rollNo: string;
  branch: string;
  requestType: "internship" | "project" | "cocurricular";
  requestTitle: string;
  requestDescription: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Mock data for faculty support requests
interface FacultyRequest {
  id: number;
  facultyName: string;
  studentName: string;
  studentRollNo: string;
  studentBranch: string;
  reason: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const mockStudentRequests: StudentRequest[] = [
  {
    id: 1,
    name: "John Doe",
    rollNo: "BT20CSE001",
    branch: "CSE",
    requestType: "internship",
    requestTitle: "Summer Internship at Google",
    requestDescription: "3-month internship in software development",
    requestDate: "2025-04-01",
    status: "Pending"
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNo: "BT20CSE002",
    branch: "CSE",
    requestType: "project",
    requestTitle: "AI-based Attendance System",
    requestDescription: "Developing an AI system for automated attendance",
    requestDate: "2025-04-02",
    status: "Pending"
  },
  {
    id: 3,
    name: "Rahul Kumar",
    rollNo: "BT20ECE005",
    branch: "ECE",
    requestType: "cocurricular",
    requestTitle: "IEEE Conference Participation",
    requestDescription: "Presenting a paper at IEEE conference",
    requestDate: "2025-04-03",
    status: "Pending"
  },
  {
    id: 4,
    name: "Priya Sharma",
    rollNo: "BT20CSE010",
    branch: "CSE",
    requestType: "internship",
    requestTitle: "Research Internship at IISc",
    requestDescription: "6-month research internship in computer vision",
    requestDate: "2025-04-05",
    status: "Pending"
  },
  {
    id: 5,
    name: "Amit Patel",
    rollNo: "BT20ME015",
    branch: "MECH",
    requestType: "project",
    requestTitle: "Renewable Energy System Design",
    requestDescription: "Designing a hybrid solar-wind energy system",
    requestDate: "2025-04-08",
    status: "Pending"
  }
];

const mockFacultyRequests: FacultyRequest[] = [
  {
    id: 1,
    facultyName: "Dr. Ramesh Kumar",
    studentName: "Suresh Reddy",
    studentRollNo: "BT20CSE020",
    studentBranch: "CSE",
    reason: "Student needs additional guidance for research paper publication",
    requestDate: "2025-04-10",
    status: "Pending"
  },
  {
    id: 2,
    facultyName: "Prof. Sunita Mishra",
    studentName: "Ananya Gupta",
    studentRollNo: "BT20ECE025",
    studentBranch: "ECE",
    reason: "Student requires additional lab access for project completion",
    requestDate: "2025-04-12",
    status: "Pending"
  },
  {
    id: 3,
    facultyName: "Dr. Venkat Rao",
    studentName: "Karthik Rajan",
    studentRollNo: "BT20ME030",
    studentBranch: "MECH",
    reason: "Student needs support for industry collaboration",
    requestDate: "2025-04-14",
    status: "Pending"
  }
];

const HodDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [studentRequests, setStudentRequests] = useState<StudentRequest[]>(mockStudentRequests);
  const [facultyRequests, setFacultyRequests] = useState<FacultyRequest[]>(mockFacultyRequests);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleStudentRequestAction = (requestId: number, action: "approve" | "reject") => {
    setStudentRequests(
      studentRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: action === "approve" ? "Approved" : "Rejected"
            }
          : request
      )
    );
    
    const request = studentRequests.find(r => r.id === requestId);
    
    toast.success(
      `${action === "approve" ? "Approved" : "Rejected"} ${request?.requestType} request from ${request?.name}`
    );
  };

  const handleFacultyRequestAction = (requestId: number, action: "approve" | "reject") => {
    setFacultyRequests(
      facultyRequests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status: action === "approve" ? "Approved" : "Rejected"
            }
          : request
      )
    );
    
    const request = facultyRequests.find(r => r.id === requestId);
    
    toast.success(
      `${action === "approve" ? "Approved" : "Rejected"} faculty support request for ${request?.studentName}`
    );
  };

  const pendingStudentRequests = studentRequests.filter(
    (request) => request.status === "Pending"
  );
  
  const pendingFacultyRequests = facultyRequests.filter(
    (request) => request.status === "Pending"
  );

  const getRequestTypeIcon = (type: "internship" | "project" | "cocurricular") => {
    switch (type) {
      case "internship":
        return <Briefcase className="h-4 w-4 mr-1" />;
      case "project":
        return <Book className="h-4 w-4 mr-1" />;
      case "cocurricular":
        return <Award className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full bg-institute-blue text-white py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-xl md:text-2xl font-semibold">National Institute of Technology Andhra Pradesh</h1>
            <p className="text-sm md:text-base">HOD Dashboard</p>
          </div>
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-institute-blue"
            onClick={handleLogout}
          >
            LOG OUT
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome, HOD</h2>
          <p className="text-gray-600">Manage student requests and faculty support requests</p>
        </div>
        
        <Tabs defaultValue="student-requests" className="space-y-4">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="student-requests" className="flex-1">
              <UserCheck className="h-4 w-4 mr-2" />
              Student Requests
              {pendingStudentRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingStudentRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="faculty-requests" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Faculty Requests
              {pendingFacultyRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingFacultyRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="student-requests">
            <Card>
              <CardHeader>
                <CardTitle>Student Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingStudentRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Request</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingStudentRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="font-medium">{request.name}</div>
                            <div className="text-xs text-gray-500">{request.rollNo}</div>
                            <div className="text-xs text-gray-500">{request.branch}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className="flex items-center" variant={
                              request.requestType === "internship" ? "default" : 
                              request.requestType === "project" ? "secondary" : 
                              "outline"
                            }>
                              {getRequestTypeIcon(request.requestType)}
                              {request.requestType.charAt(0).toUpperCase() + request.requestType.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{request.requestTitle}</TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={request.requestDescription}>
                              {request.requestDescription}
                            </div>
                          </TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStudentRequestAction(request.id, "approve")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleStudentRequestAction(request.id, "reject")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No pending student requests</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faculty-requests">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Support Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingFacultyRequests.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingFacultyRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="font-medium">{request.facultyName}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{request.studentName}</div>
                            <div className="text-xs text-gray-500">{request.studentRollNo}</div>
                            <div className="text-xs text-gray-500">{request.studentBranch}</div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={request.reason}>
                              {request.reason}
                            </div>
                          </TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleFacultyRequestAction(request.id, "approve")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleFacultyRequestAction(request.id, "reject")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No pending faculty support requests</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-institute-blue text-white p-3 text-center text-sm">
        For assistance, contact: support@nitap.ac.in
      </div>
    </div>
  );
};

export default HodDashboard;
