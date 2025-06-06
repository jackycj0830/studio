
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const mockUsers = [
  { id: "1", username: "admin", role: "Administrator", lastLogin: "2024-08-15 10:30 AM" },
  { id: "2", username: "sales_manager", role: "Sales Manager", lastLogin: "2024-08-15 09:00 AM" },
  { id: "3", username: "accountant_01", role: "Accountant", lastLogin: "2024-08-14 02:45 PM" },
  { id: "4", username: "inventory_clerk", role: "Inventory Clerk", lastLogin: "2024-08-15 11:15 AM" },
];

export default function ViewAccountsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">User Accounts Management</h1>
        <Link href="/admin/add-account" passHref>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Add New Account
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Existing User Accounts</CardTitle>
          <CardDescription>View and manage user accounts. (Actions are placeholders)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2" disabled>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit User</span>
                    </Button>
                    <Button variant="ghost" size="icon" disabled>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete User</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
