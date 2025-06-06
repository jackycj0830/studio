
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Settings2 } from "lucide-react";

export default function PermissionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold font-headline">Permissions Management</h1>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Role-Based Access Control (RBAC)</CardTitle>
          </div>
          <CardDescription>
            This section will allow administrators to define roles and assign specific permissions to them. 
            Permissions can control access to different modules and actions within the ERP system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg min-h-[200px] bg-muted/30">
            <ShieldAlert className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold text-muted-foreground">Feature Under Development</p>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Detailed permission settings and role management are planned for a future update. 
              Currently, user roles are indicative and do not enforce access restrictions.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Future Enhancements</CardTitle>
             <CardDescription>
                Planned features for this module include:
             </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Granular permission assignment (e.g., create, read, update, delete per module).</li>
                <li>Ability to create custom roles.</li>
                <li>Audit logs for permission changes.</li>
                <li>Module-specific access controls.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
