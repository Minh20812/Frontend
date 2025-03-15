// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { setCredentials } from "@/redux/feature/authSlice";

// const AuthSuccess = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Nếu có thông tin trong URL params
//         const params = new URLSearchParams(location.search);
//         if (params.has("code")) {
//           // Đây là callback từ Google
//           console.log("Received callback from Google OAuth");
//         }

//         const response = await fetch(
//           "https://kanbantask-fxzv.onrender.com/api/users/auth/login/success",
//           { credentials: "include" }
//         );
//         console.log("Response status:", response.status);
//         const data = await response.json();
//         console.log("API Response data:", data);

//         if (data.userInfo) {
//           console.log("Dispatching user data to Redux:", data.userInfo);
//           dispatch(setCredentials(data.userInfo)); // Chỉ truyền data.userInfo, không lồng thêm
//           navigate("/");
//         } else {
//           console.error("Google login failed:", data);
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         navigate("/");
//       }
//     };

//     fetchUser();
//   }, [dispatch, navigate, location]);

//   return <div>Đang xử lý đăng nhập...</div>;
// };

// export default AuthSuccess;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/feature/authSlice";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the hash fragment or search params depending on your OAuth implementation
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment || window.location.search);

    // Extract auth data
    const token = params.get("token") || localStorage.getItem("authToken");
    const userDataString =
      params.get("userData") || localStorage.getItem("userData");

    if (token && userDataString) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataString));

        // Store authentication in Redux
        dispatch(
          setCredentials({
            token,
            userInfo: userData,
          })
        );

        // Clear any temporary storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");

        // Redirect to main app
        navigate("/");
      } catch (error) {
        console.error("Error processing authentication data:", error);
        navigate("/login?error=data_parse_error");
      }
    } else {
      console.error("Missing authentication data");
      navigate("/login?error=missing_data");
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Successful!</h2>
        <p>Redirecting you to the dashboard...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
