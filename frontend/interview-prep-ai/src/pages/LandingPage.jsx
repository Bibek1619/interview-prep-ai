import React from 'react'
import HERO_IMG from '../assets/hero-img.png';
import {API_FEATURES}from "../utils/data"

const LandingPage = () => {
  const navigate=useNavigate();
  const[openAuthModal,setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState('login');

  const handleCTA =()=>{};
  return (
    <div className="">
      <div className="">

        <div className="">
          {/*header*/}
          <header className=''>
            <div className="">Interview Prep AI</div>

            <button className="" onClick={()=>setOpenAuthModel(true)}>
              Login/Sign Up
            </button>
          </header>
          ==========
        </div>
      </div>
    </div>
  )
}

export default LandingPage