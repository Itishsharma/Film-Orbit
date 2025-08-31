import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utilis/firebase";

function Logout() {
  const [status, setStatus] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setStatus("✅ You are logged out. (Still on this page)");
    } catch (error) {
      console.error("Logout error:", error.message);
      setStatus("❌ Failed to logout. Try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-purple-700 via-purple-900 to-black text-white">
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Logout
      </button>
      {status && <p className="mt-4 text-sm text-gray-300">{status}</p>}
    </div>
  );
}

export default Logout;
