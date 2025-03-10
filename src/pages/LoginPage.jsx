import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ClipboardListIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-[400px]">
        <Card className="w-full">
          <CardHeader className="space-y-4 text-center p-6 sm:p-8">
            <div className="flex justify-center">
              <ClipboardListIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold">
              KanbanTask
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Đăng nhập để quản lý công việc của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6 sm:px-8">
            <div className="space-y-2">
              <Label className="text-sm sm:text-base" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="example@gmail.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="h-9 sm:h-10"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm sm:text-base" htmlFor="password">
                  Mật khẩu
                </Label>
              </div>
              <Input id="password" type="password" className="h-9 sm:h-10" />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-xs sm:text-sm font-medium leading-none"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Button
                variant="link"
                className="px-0 text-xs sm:text-sm h-auto p-0"
              >
                Quên mật khẩu?
              </Button>
            </div>
            <Button className="w-full h-9 sm:h-10" type="submit">
              Đăng nhập
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full h-9 sm:h-10"
              type="button"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </CardContent>
          <CardFooter className="text-center px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="text-xs sm:text-sm w-full">
              Chưa có tài khoản?{" "}
              <Button variant="link" className="px-1 h-auto p-0">
                Đăng ký ngay
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
