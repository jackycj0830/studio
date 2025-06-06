
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, ListChecks, BookOpen } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Administrator Dashboard</h1>
      <p className="text-muted-foreground">Manage and view project documentation.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">README.md</CardTitle>
            </div>
            <CardDescription>View or edit the main project README file.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/view-document/readme" passHref>
              <Button className="w-full">View README</Button>
            </Link>
            {/* Optional: Add Edit button later */}
            {/* <Link href="/admin/edit-document/readme" passHref>
              <Button variant="outline" className="w-full mt-2">Edit README</Button>
            </Link> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">spec.md</CardTitle>
            </div>
            <CardDescription>View or edit the project specification document.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/view-document/spec" passHref>
              <Button className="w-full">View Specification</Button>
            </Link>
            {/* <Link href="/admin/edit-document/spec" passHref>
              <Button variant="outline" className="w-full mt-2">Edit Specification</Button>
            </Link> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ListChecks className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">todolist.md</CardTitle>
            </div>
            <CardDescription>View or edit the project task list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/view-document/todolist" passHref>
              <Button className="w-full">View Todo List</Button>
            </Link>
            {/* <Link href="/admin/edit-document/todolist" passHref>
              <Button variant="outline" className="w-full mt-2">Edit Todo List</Button>
            </Link> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
