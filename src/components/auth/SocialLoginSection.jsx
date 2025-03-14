import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

export default function SocialLoginSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // Hàm xử lý đăng nhập Google
  // const signInWithGoogle = () => {
  //   // Lưu đường dẫn redirect vào localStorage để sử dụng sau khi Google callback
  //   localStorage.setItem("redirectPath", redirect);

  //   // Chuyển hướng đến endpoint auth Google của backend
  //   window.location.href = "http://localhost:5000/api/users/auth/google";
  // };

  // // Xử lý callback từ Google
  // useEffect(() => {
  //   // Kiểm tra nếu URL hiện tại chứa token hoặc thông tin user từ Google callback
  //   const params = new URLSearchParams(window.location.search);
  //   const token = params.get("token");
  //   const userData = params.get("userData");

  //   if (token && userData) {
  //     try {
  //       // Parse thông tin người dùng
  //       const userInfo = JSON.parse(decodeURIComponent(userData));

  //       // Lưu thông tin đăng nhập vào Redux store
  //       dispatch(setCredentials({ token, userInfo }));

  //       // Lấy đường dẫn redirect từ localStorage
  //       const savedRedirect = localStorage.getItem("redirectPath") || "/";
  //       localStorage.removeItem("redirectPath"); // Xóa sau khi sử dụng

  //       // Chuyển hướng người dùng
  //       navigate(savedRedirect);
  //     } catch (error) {
  //       console.error("Error processing Google login:", error);
  //     }
  //   }
  // }, [dispatch, navigate]);

  const signInWithGoogle = () => {
    // Không cần lưu redirect path nếu xử lý thông qua trang AuthSuccess
    window.location.href =
      "https://kanbantask-fxzv.onrender.com/api/users/auth/google";
    // window.location.href = "http://localhost:5000/api/users/auth/google";
  };

  return (
    <div className="flex flex-col justify-center space-y-3 md:space-y-4 p-4 md:p-6 md:h-full">
      <h3 className="text-center text-base md:text-lg font-medium">
        Or continue with
      </h3>
      <Button variant="outline" className="w-full cursor-pointer">
        <GithubIcon className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => signInWithGoogle()}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        By signing in, you agree to our{" "}
        <a href="/terms" className="underline hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
