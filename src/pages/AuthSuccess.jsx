import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Nếu có thông tin trong URL params
        const params = new URLSearchParams(location.search);
        if (params.has("code")) {
          // Đây là callback từ Google
          console.log("Received callback from Google OAuth");
        }

        const response = await fetch(
          "https://kanbantask-fxzv.onrender.com/api/users/auth/login/success",
          { credentials: "include" }
        );
        const data = await response.json();
        console.log("Received user data:", data);

        if (data.userInfo) {
          dispatch(setCredentials({ userInfo: data.userInfo }));
          navigate("/"); // Chuyển hướng về trang chính sau khi lưu thông tin user
        } else {
          console.error("Google login failed:", data);
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, [dispatch, navigate, location]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default AuthSuccess;
