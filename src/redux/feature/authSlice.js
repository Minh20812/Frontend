// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userInfo: (() => {
//     try {
//       const userInfo = localStorage.getItem("userInfo");
//       const expirationTime = localStorage.getItem("expirationTime");

//       if (userInfo && expirationTime) {
//         const now = new Date().getTime();
//         if (now > Number(expirationTime)) {
//           // Token hết hạn, xóa dữ liệu
//           localStorage.removeItem("userInfo");
//           localStorage.removeItem("expirationTime");
//           return null;
//         }
//         return JSON.parse(userInfo);
//       }
//       return null;
//     } catch (error) {
//       console.error("Error parsing userInfo from localStorage:", error);
//       localStorage.removeItem("userInfo");
//       localStorage.removeItem("expirationTime");
//       return null;
//     }
//   })(),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       console.log("User logged in:", action.payload);
//       state.userInfo = action.payload;
//       localStorage.setItem("userInfo", JSON.stringify(action.payload));

//       const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
//       localStorage.setItem("expirationTime", expirationTime);
//     },
//     logout: (state) => {
//       state.userInfo = null;
//       localStorage.removeItem("userInfo");
//       localStorage.removeItem("expirationTime");
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Make sure to handle various data structures that might come from different auth methods
      const { userInfo, token } = action.payload;

      // Store token
      state.token = token;
      localStorage.setItem("token", token);

      // Store user info, handling different possible structures
      const normalizedUserInfo = userInfo?.userInfo
        ? userInfo.userInfo
        : userInfo;
      state.userInfo = normalizedUserInfo;
      localStorage.setItem("userInfo", JSON.stringify(normalizedUserInfo));

      console.log("Credentials set in Redux:", {
        token,
        userInfo: normalizedUserInfo,
      });
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
