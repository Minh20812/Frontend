import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/userApiSlice";
import { setCredentials } from "@/redux/feature/authSlice";

const LoginForm = ({ isLoading, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoginLoading }] = useLoginMutation();

  // const userInfo = useSelector((state) => state.auth.userInfo);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.error;
    }
  };
  return (
    <form
      className="space-y-3 md:space-y-4 p-4 md:p-6"
      onSubmit={submitHandler}
    >
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          className="w-full"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        variant="link"
        className="px-0 text-xs md:text-sm cursor-pointer"
        onClick={onForgotPassword}
      >
        Forgot password?
      </Button>
      <Button
        className="w-full mt-2 cursor-pointer"
        disabled={isLoginLoading}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
