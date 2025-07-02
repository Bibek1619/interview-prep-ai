import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import {CARD_BG} from "../../utils/data"
import toast from 'react-hot-toast'

import DashboardLayout from './../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const nagigate =useNavigate();
  const [opencreateModel ,setOpenCreateModel]=useState(false);
  const [session ,setSession]=useState([]);
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    open:false,
    data:null,
  });
  const fetchAllSessions = async () => {};
  const deleteSession = async (sessionData) => {}
  useEffect(()=>{
    fetchAllSessions();

  },[]);
  

  return (
    <DashboardLayout>Dashboard</DashboardLayout>
  )
}

export default Dashboard