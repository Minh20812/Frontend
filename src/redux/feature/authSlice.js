import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: (() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      const expirationTime = localStorage.getItem("expirationTime");

      if (userInfo && expirationTime) {
        const now = new Date().getTime();
        if (now > Number(expirationTime)) {
          // Token hết hạn, xóa dữ liệu
          localStorage.removeItem("userInfo");
          localStorage.removeItem("expirationTime");
          return null;
        }
        return JSON.parse(userInfo);
      }
      return null;
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
