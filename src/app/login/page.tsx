
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logotype } from "@/components/logotype"; // Assuming Logotype can be used here

export default function LoginPage() {
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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">帳號 (Username)</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="例如：admin@example.com" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密碼 (Password)</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            登入 (Login)
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            忘記密碼了？ <a href="#" className="underline hover:text-primary">重設密碼</a>
          </p>
        </CardFooter>
      </Card>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        還沒有帳戶嗎？ <a href="#" className="underline hover:text-primary">註冊一個新帳戶</a>
      </p>
    </div>
  );
}
