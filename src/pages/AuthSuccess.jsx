import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://kanbantask-fxzv.onrender.com/api/users/auth/login/success",
          { credentials: "include" }
        );
        const data = await response.json();

        if (data.userInfo) {
          dispatch(setCredentials({ userInfo: data.userInfo }));
          navigate("/"); // Chuyển hướng ngay khi có userInfo
        } else {
          console.error("Google login failed:", data);
          navigate("/"); // Dù thất bại vẫn quay về "/"
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/"); // Nếu lỗi cũng quay về "/"
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default AuthSuccess;
