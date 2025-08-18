import { useEffect,useState } from 'react'
import Navbar from './Templates/Navbar'
import Topnav from './Templates/Topnav'
import axios from '../utilis/Axios'
import Header from './Header'
import HorizontalCard from './HorizontalCard'
import Loader  from './Loader'

function Home() {
    document.title = "Film Orbit"
    const [bgc, setbgc] = useState(null)
    const [Trending, setTrending] = useState(null);
    const [Category, setCategory] = useState("all")

    const getsearchbgc= async ()=>{
      try{  
        const {data}=await axios.get(`/trending/all/day`);
        let randomdata=data.results[(Math.random() * data.results.length).toFixed()]
        setbgc(randomdata)
      }
      catch(err){
        console.log(err);
      }
    }

    const getTrending= async ()=>{
      try{
        const {data}=await axios.get(`/trending/${Category}/day`);
        setTrending(data.results)
      }
      catch(err){
        console.log(err);
      }
    }


    useEffect(()=>{
      !bgc && getsearchbgc();
       getTrending()
    },[Category])
  
  return Trending && bgc ? (
    <>
        <Navbar/>
        <div className='w-[80%] h-full overflow-hidden overflow-y-auto'>
          <Topnav/>
          <Header data={bgc}/>
          <HorizontalCard data={Trending} />
        </div>
    </>
  ):(<Loader/>)
}

export default Home