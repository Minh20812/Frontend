import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const userInfoEncoded = query.get("userInfo");

    if (userInfoEncoded) {
      try {
        // Giải mã dữ liệu từ URL
        const userInfo = JSON.parse(decodeURIComponent(userInfoEncoded));

        dispatch(setCredentials({ userInfo }));
        navigate("/");
      } catch (error) {
        console.error("Lỗi giải mã userInfo:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default AuthSuccess;
