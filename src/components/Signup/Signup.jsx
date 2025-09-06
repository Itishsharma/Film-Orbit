import { useState } from "react";
import { auth } from "../../utilis/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // ✅ go to login page instead of home
    } catch (error) {
      console.error("Signup error:", error.code, error.message);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already registered. Please login instead.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-black via-purple-900 to-gray-900 p-4">
      {/* Card */}
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl w-[90%] sm:w-[400px] border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-5">
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
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 
              focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/30"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Show error if any */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-md hover:scale-105 transform transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-300 mt-6 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
