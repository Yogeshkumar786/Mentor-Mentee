
import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/student/Navigation";
import { useStudent } from "@/contexts/StudentContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Mentors = () => {
  const { basicInfo, mentorQuestions, addMentorQuestion } = useStudent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).split("/").join("/"),
    facultyName: "",
    branch: "",
    phoneNumber: "",
    question: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleSubmit = () => {
    if (!newQuestion.facultyName || !newQuestion.question) {
      toast.error("Please fill all required fields");
      return;
    }
    
    addMentorQuestion(newQuestion);
    toast.success("Question submitted to mentor");
    setIsDialogOpen(false);
    setNewQuestion({
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).split("/").join("/"),
      facultyName: "",
      branch: "",
      phoneNumber: "",
      question: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header subtitle="Student Dashboard" />
      <Navigation />
      
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mentors</h2>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-institute-blue hover:bg-blue-800"
          >
            Add New Question
          </Button>
        </div>
        
        <Card className="shadow">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-sm">
                <div className="font-semibold">Name:</div>
                <div>{basicInfo.name}</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold">Branch:</div>
                <div>{basicInfo.branch}</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold">Roll No:</div>
                <div>{basicInfo.rollNo}</div>
              </div>
              <div className="text-sm">
                <div className="font-semibold">Reg. No:</div>
                <div>{basicInfo.regNo}</div>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Faculty Name</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Remarks Given</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentorQuestions.length > 0 ? (
                  mentorQuestions.map((question, index) => (
                    <TableRow key={index}>
                      <TableCell>{question.date}</TableCell>
                      <TableCell>{question.facultyName}</TableCell>
                      <TableCell>{question.branch}</TableCell>
                      <TableCell>{question.phoneNumber}</TableCell>
                      <TableCell>{question.question}</TableCell>
                      <TableCell>{question.remarksGiven || "Pending"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No mentor interactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="facultyName">Faculty Name</Label>
              <Input
                id="facultyName"
                name="facultyName"
                value={newQuestion.facultyName}
                onChange={handleInputChange}
                placeholder="Enter faculty name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                name="branch"
                value={newQuestion.branch}
                onChange={handleInputChange}
                placeholder="Faculty's department"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={newQuestion.phoneNumber}
                onChange={handleInputChange}
                placeholder="Faculty's contact number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                value={newQuestion.date}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                name="question"
                value={newQuestion.question}
                onChange={handleInputChange}
                placeholder="Enter your question or concern"
                required
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-institute-blue hover:bg-blue-800">
              Submit Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="bg-institute-blue text-white p-3 text-center text-sm">
        For assistance, contact: {basicInfo.rollNo.toLowerCase()}@student.nitandhra.ac.in
      </div>
    </div>
  );
};

export default Mentors;
