import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constent";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);

      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.response?.data || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId: email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.response?.data || "Signup failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex justify-center items-center px-4">
      <div className="bg-base-300 w-4/12 max-w-md rounded-xl shadow-2xl py-6 px-8">
        <h1 className="text-3xl font-bold text-center text-gray-400 mb-3">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-500 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full p-[10px] rounded-lg bg-gray-500 text-black outline-none border border-transparent focus:border-teal-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-500 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full p-[10px] rounded-lg bg-gray-500 text-black outline-none border border-transparent focus:border-teal-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-500 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-[10px] rounded-lg bg-gray-500 text-black outline-none border border-transparent focus:border-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-500 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full p-[10px] rounded-lg bg-gray-500 text-black outline-none border border-transparent focus:border-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-gray-600 mb-5 cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-700 hover:bg-gray-500 text-white py-2 rounded-lg text-lg font-semibold transition cursor-pointer"
          >
            {loading ? "Please Wait..." : isLogin ? "Login" : "Sign Up"}
          </button>

          {isLogin && (
            <p className="text-center mt-5 text-gray-500">
              Forgot{" "}
              <span className="text-teal-500 cursor-pointer">Password?</span>
            </p>
          )}

          <p className="text-center mt-4 text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              type="button"
              onClick={() => {
                setError("");
                setIsLogin(!isLogin);
              }}
              className="ml-2 text-teal-500 font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
