import { useState, useRef, useEffect } from "react";
import {
  AuthHeader,
  LoginForm,
  RegisterForm,
  SocialLoginSection,
  ForgotPasswordDialog,
} from "@/components/auth/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthRouter = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const modalRef = useRef(null);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleVerificationRequest = (email) => {
    console.log("Sending verification request for:", email);
    alert(`Mã xác nhận của bạn là: 123456`); // Hiển thị mã xác nhận
    setShowVerification(true);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {showForgotPassword ? (
        <div ref={modalRef}>
          <ForgotPasswordDialog onBack={() => setShowForgotPassword(false)} />
        </div>
      ) : (
        <div
          ref={modalRef}
          className="w-full max-w-3xl bg-background border shadow-lg rounded-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Left side with forms */}
            <div className="col-span-1 md:col-span-3 md:border-r">
              <AuthHeader />

              <Tabs defaultValue="login" className="w-full">
                {/* Tab navigation */}
                <div className="border-b px-4 md:px-6">
                  <TabsList className="grid w-full grid-cols-2 ">
                    <TabsTrigger value="login" className="cursor-pointer">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="cursor-pointer">
                      Register
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Container for content */}
                <div className="relative p-4 md:p-6 h-auto md:h-[400px]">
                  <TabsContent
                    value="login"
                    className="md:absolute inset-0 border-0 transition-opacity duration-300 overflow-y-auto"
                  >
                    <LoginForm
                      isLoading={isLoading}
                      onForgotPassword={() => setShowForgotPassword(true)}
                    />
                  </TabsContent>

                  <TabsContent
                    value="register"
                    className="md:absolute inset-0 border-0 transition-opacity duration-300 overflow-y-auto"
                  >
                    <RegisterForm
                      isLoading={isLoading}
                      showVerification={showVerification}
                      setShowVerification={setShowVerification}
                      onVerificationRequest={handleVerificationRequest}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Right side with third-party login */}
            <div className="col-span-1 md:col-span-2 border-t md:border-t-0">
              <SocialLoginSection />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthRouter;
