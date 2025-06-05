
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
import { AlertTriangle, Loader2, Megaphone, FileText } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  icon?: React.ElementType;
}

// Mock data for announcements
const mockAnnouncements: Announcement[] = [
  { id: '1', title: '系統維護通知', content: '本週日凌晨 2:00 至 4:00 將進行系統維護，屆時系統將暫停服務。', date: '2024-07-28', icon: Megaphone },
  { id: '2', title: '新功能上線：智能報表產生器', content: '期待已久的智能報表產生器現已上線！歡迎各位同仁試用並提供反饋。', date: '2024-07-25', icon: FileText },
  { id: '3', title: '國定假日休假公告', content: '下週一為國定假日，公司將休假一天。祝大家假期愉快！', date: '2024-07-22', icon: Megaphone },
  { id: '4', title: '季度員工大會', content: '本季度員工大會將於下週五下午 3:00 在大會議室舉行，請準時參加。', date: '2024-07-20', icon: FileText },
];

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

  if (isAuthenticated) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-foreground">已登入，正在重新導向...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Bulletin Board Section - Target 65% width */}
      <div className="w-full md:w-2/3 bg-muted/30 p-6 md:p-8 lg:p-10 flex flex-col gap-6 border-r border-border">
        <div className="flex items-center gap-3 mb-4">
          <Megaphone className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold font-headline text-foreground">公司公告</h2>
        </div>
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {mockAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  {announcement.icon && <announcement.icon className="h-5 w-5 text-accent" />}
                  <CardTitle className="text-md font-semibold font-headline">{announcement.title}</CardTitle>
                </div>
                <CardDescription className="text-xs pt-1">{announcement.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-auto pt-4">
          © {new Date().getFullYear()} ERP Central Inc. All rights reserved.
        </p>
      </div>

      {/* Login Form Section - Target 35% width */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 md:p-8 lg:p-10">
        <Card className="w-full max-w-md shadow-xl">
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
    </div>
  );
}
