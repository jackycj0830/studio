import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";

const employees = [
  { id: 1, name: "Alice Wonderland", role: "Software Engineer", avatar: "https://placehold.co/100x100.png?text=AW", initial: "AW", dataAiHint: "woman portrait" },
  { id: 2, name: "Bob The Builder", role: "Project Manager", avatar: "https://placehold.co/100x100.png?text=BB", initial: "BB", dataAiHint: "man portrait" },
  { id: 3, name: "Carol Danvers", role: "UX Designer", avatar: "https://placehold.co/100x100.png?text=CD", initial: "CD", dataAiHint: "woman face" },
  { id: 4, name: "David Copperfield", role: "QA Analyst", avatar: "https://placehold.co/100x100.png?text=DC", initial: "DC", dataAiHint: "man face" },
  { id: 5, name: "Eve Harrington", role: "Marketing Specialist", avatar: "https://placehold.co/100x100.png?text=EH", initial: "EH", dataAiHint: "woman professional" },
  { id: 6, name: "Frankenstein Monster", role: "DevOps Engineer", avatar: "https://placehold.co/100x100.png?text=FM", initial: "FM", dataAiHint: "man glasses" },
];

export default function HRPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Team Directory</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Find Team Members</CardTitle>
          <CardDescription>Search for employees within the organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-md items-center space-x-2 mb-6">
            <Input type="text" placeholder="Search by name or role..." />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {employees.map((employee) => (
              <Card key={employee.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint={employee.dataAiHint}/>
                    <AvatarFallback>{employee.initial}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-md font-semibold font-headline">{employee.name}</h3>
                  <p className="text-xs text-muted-foreground">{employee.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Payroll Management</CardTitle>
            <CardDescription>Access payroll processing and reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Placeholder for payroll features.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg md:text-xl">Attendance Tracking</CardTitle>
            <CardDescription>Manage employee attendance and leave requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Placeholder for attendance system.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
