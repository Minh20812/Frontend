import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VerificationSection = ({
  isLoading,
  verificationCode,
  setVerificationCode,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onResend,
}) => {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="verification">Verification Code</Label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="verification"
            placeholder="Enter verification code"
            className="w-full"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <Button
            variant="outline"
            className="sm:w-auto w-full mt-1 sm:mt-0 cursor-pointer"
            type="button"
            onClick={onResend}
            disabled={isLoading}
          >
            Resend
          </Button>
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          type="password"
          className="w-full"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters long and contain number
        </p>
      </div>
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          className="w-full"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <Button
        className="w-full mt-2 cursor-pointer"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </div>
  );
};

export default VerificationSection;
