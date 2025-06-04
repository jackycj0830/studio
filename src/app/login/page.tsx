
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logotype } from "@/components/logotype";
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const success = await login(username, password);
      if (!success) {
        setError("帳號或密碼錯誤，請再試一次。");
      }
      // Successful login and redirection is handled within the login function in AuthContext
    } catch (e) {
      setError("登入時發生未預期的錯誤。");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-foreground">正在檢查驗證狀態...</p>
        </div>
    );
  }

  // If already authenticated (and not loading), useEffect will redirect. Show minimal content.
  if (isAuthenticated) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-foreground">已登入，正在重新導向...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logotype />
          </div>
          <CardTitle className="text-2xl font-bold font-headline">登入您的帳戶</CardTitle>
          <CardDescription>請輸入您的帳號和密碼以繼續</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>登入失敗</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">帳號 (Username)</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密碼 (Password)</Label>
              <Input
                id="password"
                type="password"
                placeholder="123456"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              登入 (Login)
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              忘記密碼了？ <a href="#" className="underline hover:text-primary">重設密碼</a>
            </p>
          </CardFooter>
        </form>
      </Card>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        還沒有帳戶嗎？ <a href="#" className="underline hover:text-primary">註冊一個新帳戶</a>
      </p>
    </div>
  );
}
