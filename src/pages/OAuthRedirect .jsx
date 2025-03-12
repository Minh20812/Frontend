import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin từ URL callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Nếu có code, chuyển hướng đến trang xử lý callback
      // Thay vì dùng lại URL callback hiện tại (sẽ gây lỗi khi refresh)
      navigate("/auth/success", { replace: true });
    } else {
      // Không có code, chuyển về trang chính
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Đang chuyển hướng...</h2>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default OAuthRedirect;
