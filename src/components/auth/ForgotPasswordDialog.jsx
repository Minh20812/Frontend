import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardListIcon } from "lucide-react";

export default function ForgotPasswordDialog({ onBack }) {
  return (
    <div className="w-full max-w-md px-4 animate-in fade-in-0 zoom-in-95 duration-300">
      <Card className="w-full">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <ClipboardListIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email and we'll send you a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button className="w-full">Send Reset Link</Button>
        </CardContent>
        <CardFooter className="text-center">
          <Button variant="link" className="w-full" onClick={onBack}>
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
