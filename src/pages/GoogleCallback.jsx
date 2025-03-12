import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Lấy dữ liệu từ query string hoặc response
    const handleCallback = async () => {
      try {
        // Nếu có response JSON trực tiếp, hãy xử lý nó
        const response = await fetch("/api/users/me", {
          credentials: "include",
        });
        const data = await response.json();

        console.log("Google callback data:", data);

        if (data.userInfo) {
          dispatch(setCredentials({ userInfo: data.userInfo }));
          navigate("/");
        } else {
          console.error("No user info in response");
          navigate("/");
        }
      } catch (error) {
        console.error("Error in Google callback:", error);
        navigate("/");
      }
    };

    handleCallback();
  }, [dispatch, navigate]);

  return <div>Đang xử lý đăng nhập Google...</div>;
};

export default GoogleCallback;
