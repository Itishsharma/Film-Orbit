import { Link, useNavigate } from "react-router-dom";

function Notfound() {
  const navigate=useNavigate();
  return (
    <div className='bg-[#0e0d0dd8] opacity-[1] absolute top-0 z-[100] left-0  w-screen h-full flex items-center justify-center text-sky-50 text-[20vw] '>
      404😅
      <Link
        onClick={() => navigate(-1)}
        className=" text-[2vw] hover:text-[#6556CD] cursor-pointer absolute top-3 left-5 text-white ri-arrow-left-line"
      ></Link>
    </div>
    
  )
}

export default Notfound