// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const OAuthRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Lấy thông tin từ URL callback
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");

//     if (code) {
//       // Nếu có code, chuyển hướng đến trang xử lý callback
//       // Thay vì dùng lại URL callback hiện tại (sẽ gây lỗi khi refresh)
//       navigate("/auth/success", { replace: true });
//     } else {
//       // Không có code, chuyển về trang chính
//       navigate("/", { replace: true });
//     }
//   }, [navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold mb-4">Đang chuyển hướng...</h2>
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
//       </div>
//     </div>
//   );
// };

// export default OAuthRedirect;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const OAuthRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // This component handles when your backend redirects with auth data
    // instead of returning JSON response

    // Function to extract token from cookies if your backend sets them
    const getTokenFromCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const handleAuth = async () => {
      try {
        // Try to get token from URL or cookies depending on your backend implementation
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token") || getTokenFromCookie("authToken");

        // If token exists but no user data in URL, fetch user data from your API
        if (token) {
          // Option 1: User data is in URL
          const userDataParam = params.get("userData");
          if (userDataParam) {
            const userData = JSON.parse(decodeURIComponent(userDataParam));
            dispatch(setCredentials({ token, userInfo: userData }));
            navigate("/");
            return;
          }

          // Option 2: Need to fetch user data with token
          try {
            const response = await fetch(
              "https://kanbantask-fxzv.onrender.com/api/users/me",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.ok) {
              const userData = await response.json();
              dispatch(setCredentials({ token, userInfo: userData }));
              navigate("/");
            } else {
              throw new Error("Failed to fetch user data");
            }
          } catch (error) {
            console.error("API error:", error);
            navigate("/login?error=api_error");
          }
        } else {
          // No authentication data found
          navigate("/login?error=no_auth_data");
        }
      } catch (error) {
        console.error("Auth processing error:", error);
        navigate("/login?error=processing_error");
      }
    };

    handleAuth();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Processing authentication...
        </h2>
        <p>Please wait while we complete your login.</p>
      </div>
    </div>
  );
};

export default OAuthRedirect;
