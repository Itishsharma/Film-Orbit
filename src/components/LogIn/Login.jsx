import { useState } from "react";
import { auth } from "../../utilis/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Login existing user
  const login = async (e) => {
    e.preventDefault();
    setError(""); 
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (err) {
      console.error("Login error:", err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email. Please sign up first.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        default:
          setError("Please check your credentials and try again.");
      }
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Unable to send reset email. Please check your email address.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-black via-purple-900 to-gray-900 p-4">
      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl w-[90%] sm:w-[400px] border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 
              focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/30"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/30 pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-300 hover:text-white focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {message && <p className="text-green-400 text-sm text-center">{message}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-md hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p
          onClick={handleForgotPassword}
          className="text-purple-300 hover:underline cursor-pointer text-sm text-center mt-4"
        >
          Forgot Password?
        </p>

        <p className="text-gray-300 mt-6 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-300 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
