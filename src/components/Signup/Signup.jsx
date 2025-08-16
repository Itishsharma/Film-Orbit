import { useState } from "react";
import { auth,googleprovider} from "../../utilis/firebase";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate=useNavigate()


  const loginwithgoogle = async () => {
    try{
      await signInWithPopup(auth,googleprovider);
      navigate("/")
    }
    catch(err){
      console.log("login",err);
    }
  };


  const [email,setemail]= useState("")
  const [password,setpassword]= useState("")

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  };


  return (
    <div className="w-full flex text-black  justify-center items-center">
    <div className=" p-10 rounded-lg shadow-lg   w-[50%] bg-white">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>
        <button  onClick={handleLogin}  type="submit" className="w-full bg-blue-500 text-white py-2 mb-2 px-4 rounded-lg hover:bg-blue-600">
         Sign Up
        </button>
        <button onClick={loginwithgoogle} type="submit" className=" w-full bg-gray-400 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-10">
          <FcGoogle/> login with google
        </button>
      </form>
      <p className="text-gray-600 mt-4 text-sm text-center flex justify-between">Don't have an account ? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
    </div>
  </div>
  )
}

export default Signup
