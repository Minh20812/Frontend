// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setCredentials } from "@/redux/feature/authSlice";

// const GoogleCallback = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleCallback = async () => {
//       try {
//         // Lấy dữ liệu người dùng từ API endpoint
//         const response = await fetch("/api/users/me", {
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error(`API error: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Google callback data:", data);

//         if (data && data.userInfo) {
//           // Lưu thông tin người dùng vào Redux store
//           dispatch(setCredentials(data));

//           // Chuyển hướng người dùng về trang chính
//           navigate("/", { replace: true });
//         } else {
//           console.error("No user info in response:", data);
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error in Google callback:", error);
//         navigate("/");
//       }
//     };

//     handleCallback();
//   }, [dispatch, navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold mb-4">
//           Đang xử lý đăng nhập Google...
//         </h2>
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
//       </div>
//     </div>
//   );
// };

// export default GoogleCallback;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract tokens and user data from URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userDataParam = params.get("userData");

    if (token && userDataParam) {
      try {
        // Parse the user data
        const userData = JSON.parse(decodeURIComponent(userDataParam));

        // Store in Redux
        dispatch(
          setCredentials({
            token,
            userInfo: userData,
          })
        );

        // Navigate to the main application route where KanbanBoard is rendered
        navigate("/");
      } catch (error) {
        console.error("Error processing Google authentication:", error);
        // Redirect to login with error param if needed
        navigate("/login?error=auth_failed");
      }
    } else {
      console.error("Missing authentication data in callback");
      navigate("/login?error=missing_data");
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Completing authentication...
        </h2>
        <p>Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
