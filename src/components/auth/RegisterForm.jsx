import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VerificationSection from "./VerificationSection";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/api/userApiSlice";

const RegisterForm = ({
  isLoading,
  showVerification,
  setShowVerification,
  onVerificationRequest,
}) => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading: isRegistering }] = useRegisterMutation(); // Hook đăng ký

  const handleVerificationRequest = async (e) => {
    e.preventDefault();
    await onVerificationRequest(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!showVerification) return;

    console.log("Đang đăng ký:", username, email, password);
    try {
      const res = await register({
        username,
        email,
        password,
      }).unwrap();

      console.log("Đăng ký thành công:", res);
      // Có thể điều hướng user hoặc hiển thị thông báo thành công
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-3 md:space-y-4 p-4 md:p-6"
    >
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="register-name">Your Name</Label>
        <Input
          id="register-name"
          type="text"
          placeholder="Enter your name"
          className="w-full"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={showVerification}
        />

        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="Enter your email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={showVerification}
        />
      </div>

      {!showVerification ? (
        <Button
          type="button"
          onClick={handleVerificationRequest}
          disabled={isLoading || !email}
        >
          {isLoading ? "Sending..." : "Get Verification Code"}
        </Button>
      ) : (
        <VerificationSection
          isLoading={isRegistering}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onResend={() => onVerificationRequest(email)}
        />
      )}
    </form>
  );
};

export default RegisterForm;
