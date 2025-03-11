import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userInfoParam = params.get("userInfo");

    if (userInfoParam) {
      try {
        const userInfo = JSON.parse(decodeURIComponent(userInfoParam));

        // Lưu thông tin người dùng vào Redux store
        dispatch(setCredentials({ userInfo }));

        // Chuyển hướng người dùng đến trang chính
        navigate("/");
      } catch (error) {
        console.error("Error processing authentication:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default AuthSuccess;
