
"use client"; // This form will likely need client-side interactivity

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import React, { useState } from 'react';

export default function AddAccountPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual account creation logic
    console.log("Submitting new account:", { username, password, role });
    // In a real app, you would call a server action or API here.
    alert("Account creation simulated. Check console for data. (No actual account created)");
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Add New User Account</h1>
        <Button variant="outline" asChild>
            <Link href="/admin/accounts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Accounts
            </Link>
          </Button>
      </div>
      
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">New Account Details</CardTitle>
          <CardDescription>Fill in the details to create a new user account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="e.g., john.doe" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
               {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={setRole} value={role} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="sales_user">Sales User</SelectItem>
                  <SelectItem value="inventory_user">Inventory User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={password !== confirmPassword || !password}>
              <UserPlus className="mr-2 h-4 w-4" /> Create Account
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
