
// Content from old /hr/page.tsx might be relevant here or adapted
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Calculator } from "lucide-react"; // Added Calculator

const employees = [
  { id: 1, name: "Alice Wonderland", role: "Software Engineer", avatar: "https://placehold.co/100x100.png?text=AW", initial: "AW", dataAiHint: "woman portrait" },
  { id: 2, name: "Bob The Builder", role: "Project Manager", avatar: "https://placehold.co/100x100.png?text=BB", initial: "BB", dataAiHint: "man portrait" },
  // ... more employees can be added if needed
];


export default function SalaryCalculationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">員工薪資計算 (Employee Salary Calculation)</h1>
        <Button>
          <Calculator className="mr-2 h-4 w-4" /> Calculate All Salaries
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Employee List for Payroll</CardTitle>
          <CardDescription>Select employees to calculate or review payroll.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-md items-center space-x-2 mb-6">
            <Input type="text" placeholder="Search by name or role..." />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
             <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" /> Add Employee
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {employees.map((employee) => (
              <Card key={employee.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint={employee.dataAiHint} />
                    <AvatarFallback>{employee.initial}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-md font-semibold font-headline">{employee.name}</h3>
                  <p className="text-xs text-muted-foreground">{employee.role}</p>
                  <Button variant="link" size="sm" className="mt-2">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg md:text-xl">Payroll Settings</CardTitle>
          <CardDescription>Configure payroll parameters, tax rates, deductions, etc.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for payroll settings and configuration options.</p>
        </CardContent>
      </Card>
    </div>
  );
}
